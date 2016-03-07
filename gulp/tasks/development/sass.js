var config       = require('../../config');

var gulp         = require('gulp'),
    plumber      = require('gulp-plumber'),
    browserSync  = require('browser-sync'),
    sass         = require('gulp-sass'),
    filter       = require('gulp-filter'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps   = require('gulp-sourcemaps'),
    util         = require('gulp-util');


function onError(err) {
  util.beep();
  console.log(err);
  this.emit('end');
}

gulp.task('sass', function() {
  var sassConfig = config.sass.options;
  sassConfig.onError = browserSync.notify;

  var sassFilter = filter(['*.css', '!*.map'], { restore: true });

  browserSync.notify('Compiling Sass');

  return gulp.src(config.sass.src)
    .pipe(plumber({
      errorHandler: onError 
    }))
    .pipe(sourcemaps.init())
    .pipe(sass(config.sass.options).on('error', sass.logError))
    .pipe(autoprefixer(config.autoprefixer))
    .pipe(sourcemaps.write('.', config.sourcemaps.options))
    .pipe(gulp.dest(config.sass.dest));

});

