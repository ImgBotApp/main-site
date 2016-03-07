var config = require('../../config').fonts.development;

var gulp   = require('gulp'),
    util   = require('gulp-util');

gulp.task('copy:fonts', function() {
  return gulp.src(config.src)
    .pipe(gulp.dest(config.dest));
});
