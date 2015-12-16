var gulp = require('gulp');
var sequence = require('gulp-sequence');
require('file-manifest').generate('./gulp', ['*.js', '!config.js']);
gulp.task('travis', sequence(['default'], 'codeclimate'));
gulp.task('test', sequence(['clean'], ['cover']));
gulp.task('default', sequence(['lint', 'clean'], ['cover']));

