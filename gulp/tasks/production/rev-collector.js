var config  = require('../../config').collect;

var gulp    = require('gulp'),
    collect = require('gulp-rev-collector');

gulp.task('rev:collect', function() {
  return gulp.src(config.src)
    .pipe(collect())
    .pipe(gulp.dest(config.dest));
});
