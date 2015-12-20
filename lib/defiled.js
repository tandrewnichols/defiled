var path = require('path');
var _ = require('lodash');
var transformers = require('./transformers');
var overlap = require('file-overlap');

var File = function File(file, dir) {
  this._dir = dir || process.cwd();
  this._file = overlap.difference(file, this._dir);
  this.transformers = _.clone(transformers);
};

File.transformers = transformers;

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

File.prototype.relative = File.prototype.rel = function(opts) {
  opts = opts || {};
  if (opts.transform) {
    opts.ext = false;
  }
  var file = this._relative(opts);
  return this._transform(file, opts);
};

File.prototype.absolute = File.prototype.abs = function(opts) {
  opts = opts || {};
  var file = this._dir + path.sep + this._relative(opts);
  return this._transform(file, opts);
};

File.prototype.parent = File.prototype.dir = function(opts) {
  opts = opts || {};
  return this._transform(this._dir, opts);
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

File.prototype._stripLeading = function(file) {
  return file.replace(/^\//, '');
};

File.prototype._transform = function(file, opts) {
  if (opts.array) {
    return this._stripLeading(file).split('/');
  } else if (opts.transform) {
    return this.transformers[opts.transform](this._stripLeading(file));
  } else {
    return file;
  }
};

File.prototype.register = function(name, func) {
  this.transformers[name] = func;
};

File.register = function(name, func) {
  File.transformers[name] = func;
};

File.prototype.mixin = function(obj) {
  _.forOwn(obj, _.rearg(this.register.bind(this), [1, 0]));
};

File.mixin = function(obj) {
  _.forOwn(obj, _.rearg(File.register, [1, 0]));
};

module.exports = File;
