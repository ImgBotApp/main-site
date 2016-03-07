var config = require('../../config').sass;

var gulp   = require('gulp'),
    sassLint = require('gulp-sass-lint');

gulp.task('sassLint', function() {
  return gulp.src(config.src)
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError());
});
