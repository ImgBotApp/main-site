var config      = require('../../config').browserSync.development;

var gulp        = require('gulp'),
    browserSync = require('browser-sync');

gulp.task('browserSync', ['build'], function() {
  browserSync(config);
});
