var config = require('../../config').scripts;

var gulp   = require('gulp');

gulp.task('scripts', ['copy:bowerComponents'], function() {
  return gulp.src(config.src)
    .pipe(gulp.dest(config.dest));
});

gulp.task('copy:bowerComponents', function() {
  return gulp.src(config.bowerScripts.src)
    .pipe(gulp.dest(config.bowerScripts.dest));
});
