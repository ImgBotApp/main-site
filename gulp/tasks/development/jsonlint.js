var config   = require('../../config').json;

var gulp     = require('gulp'),
    jsonlint = require('gulp-jsonlint');

gulp.task('jsonlint', function() {
  gulp.src(config.src)
    .pipe(jsonlint())
    .pipe(jsonlint.reporter());
});
