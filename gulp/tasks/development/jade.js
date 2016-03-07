var config      = require('../../config').html.development;

var gulp        = require('gulp'),
    data        = require('gulp-data'),
    jade        = require('gulp-jade'),
    browserSync = require('browser-sync'),
    plumber     = require('gulp-plumber');

gulp.task('jade', ['jsonlint'], function() {
  browserSync.notify('Compiling Jade');

  return gulp.src(config.src)
    .pipe(plumber())
    .pipe(data(function(file) {
      return require('../../../' + config.dataFile);
    }))
    .pipe(jade(config.options))
    .pipe(gulp.dest(config.dest))
    .pipe(browserSync.stream());
});
