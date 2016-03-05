'use strict'

var config = require('../../config').sass.development;

var gulp   = require('gulp'),
    sassLint = require('gulp-sass-lint');

gulp.task('sassLink', function() {
  return gulp.src(config.src)
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError());
});
