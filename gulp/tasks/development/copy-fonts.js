var config = require('../../config').fonts;

var gulp   = require('gulp');

gulp.task('copy:fonts', function() {
  return gulp.src(config.src)
    .pipe(gulp.dest(config.dest));
});
