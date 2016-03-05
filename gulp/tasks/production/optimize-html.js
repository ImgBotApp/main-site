var config  = require('../../config').optimize.html;

var gulp    = require('gulp'),
    htmlmin = require('gulp-htmlmin'),
    size    = require('gulp-size');

gulp.task('optimize:html', function() {
  return gulp.src(config.src)
    .pipe(htmlmin(config.options))
    .pipe(gulp.dest(config.dest))
    .pipe(size());
});

