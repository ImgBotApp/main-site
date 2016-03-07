var config      = require('../../config').browserSync.development;

var gulp        = require('gulp'),
    browserSync = require('browser-sync').create();

gulp.task('browserSync', ['build'], function() {
  browserSync.init(config);
});
