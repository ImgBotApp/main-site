var config = require('../../config').fonts.production;

var gulp   = require('gulp');

gulp.task('copy:fonts:production', function() {
  return gulp.src(config.src)
    .pipe(gulp.dest(config.dest));
});
