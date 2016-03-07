var config = require('../../config').watch;

var gulp   = require('gulp'),
    util   = require('gulp-util');

util.log(config);

gulp.task('watch', ['browserSync'], function() {
  gulp.watch(config.html, ['jade']);
  gulp.watch(config.sass, ['sass', 'sassLint']);
  // gulp.watch(config.scripts, ['scripts', 'jshint']);
  gulp.watch(config.images, ['images']);
  gulp.watch(config.fonts, ['copy:fonts']);
});

