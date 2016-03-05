var config  = require('../../config').optimize.images;

var gulp    = require('gulp'),
    tinypng = require('gulp-tinypng-compress'),
    size    = require('gulp-size');

gulp.task('optimize:images', function() {
  return gulp.src(config.src)
    .pipe(tinypng(config.options))
    .pipe(gulp.dest(config.dest))
    .pipe(size());
});

