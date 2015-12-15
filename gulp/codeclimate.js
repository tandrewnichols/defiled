var gulp = require('gulp');
var codeclimate = require('gulp-codeclimate-reporter');

gulp.task('codeclimate', function() {
  if (process.version.indexOf('v4') > -1) {
    gulp.src('coverage/lcov.info', { read: false })
      .pipe(codeclimate({
        token: '6577b4e54888eea2441510616e4d54dd0d65919890ffe18401342e2ecbe012ff'
      }));
  }
});

