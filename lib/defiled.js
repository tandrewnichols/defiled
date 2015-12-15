var path = require('path');
var _ = require('lodash');
var transformers = require('./transformers');

var File = function File(file, dir) {
  this._file = file;
  this._dir = dir || process.cwd();
  this.transformers = transformers;
};

File.prototype.filename = function() {
  return path.basename(this._file);
};

File.prototype.name = function() {
  return this.filename().replace(this.ext(), '');
};

File.prototype.ext = File.prototype.extension = function() {
  return path.extname(this._file);
};

File.prototype.path = function() {
  return this._file.replace('/' + this.filename(), '');
};

File.prototype._relative = function(opts) {
  if (opts.ext === false) {
    return this._file.replace(this.ext(), '');
  } else if (opts.name === false) {
    return this._file.replace(path.sep + this.filename(), '');
  } else {
    return this._file;
  }
};

File.prototype.stripLeading = function(file) {
  return file.replace(/^\//, '');
};

File.prototype.transform = function(file, opts) {
  if (opts.array) {
    return this.stripLeading(file).split('/');
  } else if (opts.transform) {
    return this.transformers[opts.transform](this.stripLeading(file));
  } else {
    return file;
  }
};

File.prototype.relative = File.prototype.rel = function(opts) {
  opts = opts || {};
  if (opts.transform) {
    opts.ext = false;
  }

  var file = this._relative(opts);
  return this.transform(file, opts);
};

File.prototype.absolute = File.prototype.abs = function(opts) {
  opts = opts || {};
  var file = this._dir + path.sep + this._relative(opts);
  return this.transform(file, opts);
};

File.prototype.parent = File.prototype.dir = function() {
  return this._dir;
};

File.prototype.register = function(name, func) {
  this.transformers[name] = func;
};

File.prototype.mixin = function(obj) {
  _.forOwn(obj, _.rearg(this.register.bind(this), [1, 0]));
};

module.exports = File;
