const gulp = require('gulp');
const config = require('./config');
const mocha = require('gulp-mocha');
const istanbul = require('gulp-istanbul');

gulp.task('cover', ['instrument'], () => {
  return gulp.src(config.tests, { read: false })
    .pipe(mocha({
      reporter: 'dot',
      ui: 'mocha-given',
      require: ['coffee-script/register', 'should', 'should-sinon']
    }))
    .pipe(istanbul.writeReports());
});

