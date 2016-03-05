var config = require('../../config').optimize.css;

var gulp   = require('gulp'),
    nano   = require('gulp-cssnano'),
    size   = require('gulp-size');

gulp.task('optimize:css', function() {
  return gulp.src(config.src)
    .pipe(nano(config.options))
    .pipe(gulp.dest(config.dest))
    .pipe(size());
});
