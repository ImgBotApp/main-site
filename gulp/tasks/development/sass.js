var config       = require('../../config');

var gulp         = require('gulp'),
    plumber      = require('gulp-plumber'),
    browserSync  = require('browser-sync'),
    sass         = require('gulp-sass'),
    filter       = require('gulp-filter'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps   = require('gulp-sourcemaps');

gulp.task('sass', function() {
  // var sassConfig = config.sass.options;
  // sassConfig.onError = browserSync.notify;

  // var sassFilter = filter(['*.css', '!*.map'], { restore: true });

  // browserSync.notify('Compiling Sass');

  // return sass(config.sass.src, sassConfig)
    // .pipe(plumber())
    // .pipe(sourcemaps.init())
    // .pipe(autoprefixer(config.autoprefixer))
    // .pipe(sassFilter)
    // .pipe(sourcemaps.write('.', { 
    //   includeContent: false, 
    //   sourceRoot: 'src/_assets/scss' 
    // }))
    // .pipe(filter.restore)
    // .pipe(gulp.dest(config.sass.dest));

  return gulp.src(config.sass.src)
    .pipe(sass(config.sass.options))
    .pipe(gulp.dest(config.sass.dest));

});

