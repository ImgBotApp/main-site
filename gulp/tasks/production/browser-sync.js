var config      = require('../../config').browserSync.production;

var gulp        = require('gulp'),
    browserSync = require('browser-sync');

gulp.task('browserSync:production', ['build:production'], function() {
  browserSync(config);
});
