var _ = require('lodash');

exports.camelCase = exports.camel = _.camelCase;
exports.dash = exports.kebab = exports.kebabCase = _.kebabCase;
exports.underscore = exports.snake = exports.snakeCase = _.snakeCase;
exports.title = exports.startCase = exports.bookCase = _.startCase;
exports.human = exports.capitalize = function(word) {
  return _.capitalize(word.replace(/\//g, ' '));
};
exports.pipe = function(word) {
  return word.split('/').join('|');
};
exports['class'] = function(word) {
  return word.split('/').map(_.capitalize).join('');
};
exports.lower = function(word) {
  return word.split('/').join('').toLowerCase();
};
exports.upper = function(word) {
  return word.split('/').join('').toUpperCase();
};
