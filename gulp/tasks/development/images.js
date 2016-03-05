var config  = require('../../config').images;

var gulp    = require('gulp'),
    changed = require('gulp-changed');

gulp.task('images', function() {
  return gulp.src(config.src)
    .pipe(changed(config.dest))
    .pipe(gulp.dest(config.dest));
});
