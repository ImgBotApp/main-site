/* Requirements */
var gulp = require('gulp'),
    bower = require('gulp-bower'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    useref = require('gulp-useref'),
    gulpIf = require('gulp-if'),
    uglify = require('gulp-uglify'),
    cssnano = require('gulp-cssnano'),
    cache = require('gulp-cache'),
    tinypng = require('gulp-tinypng'),
    imagemin = require('gulp-imagemin'),
    del = require('del'),
    runSequence = require('run-sequence'),
    config = require('./config.json');

/* Directories */
var source = config.paths.source,
    dest = config.paths.destination,
    bowerPath = source + 'bower_components/';

var bootstrapSass = {
  in: bowerPath + 'bootstrap-sass/assets/stylesheets'
};

var jquery = {
  in: [ 
    bowerPath + 'jquery/dist/jquery.min.js', 
    bowerPath + 'jquery/dist/jquery.min.map' 
  ],
  out: dest + 'js/vendor/jquery'
}

var images = {
  in: source + '/images/**/*.+(png|jpg|gif|svg)',
  out: dest + 'images'
}

var fonts = {
  in: [
    bowerPath + 'font-awesome/fonts/*.*', 
    source + 'fonts/*.*'
  ],
  out: dest + 'fonts'
};


var styles = {
  in: source + '/scss/main.scss',
  srcOut: source + '/css',
  destOut: dest + '/css',
  watch: source + 'scss/**/*',
  sassOpts: {
    errLogToConsole: true,
    outputStyle: 'expanded',
    includePaths: [
      bootstrapSass.in,
      bowerPath + 'font-awesome/scss'
    ]
  }
}

var options = {
  autoprefixerOptions: {
    browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
  }
}



gulp.task('bower', function() {
  return bower();
});

gulp.task('css', function() {
  return gulp.src(styles.in)
    .pipe(sourcemaps.init())
    .pipe(sass(styles.sassOpts).on('error', sass.logError))
    .pipe(autoprefixer(options.autoprefixer))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(styles.srcOut));
});

/* copy jquery fallback file */
gulp.task('jquery', function() {
  return gulp.src(jquery.in)
    .pipe(gulp.dest(jquery.out));
});

gulp.task('images', function() {
  return gulp.src(images.in)
    .pipe(cache(gulpIf('*.+(jpg|png)', tinypng(config.tinypng.key), imagemin())))
    .pipe(gulp.dest(images.out));
});


gulp.task('useref', function() {
  return gulp.src(source + '/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest(dest));
});

gulp.task('fonts', function() {
  return gulp.src(fonts.in)
    .pipe(gulp.dest(fonts.out));
});

gulp.task('clean:dist', function() {
  return del.sync(dest);
});

gulp.task('watch', function() {
  gulp.watch(styles.watch, ['css']);
});

gulp.task('clear', function(done) {
  return cache.clearAll(done);
});

gulp.task('default', function(callback) {
  gulp.watch(styles.watch, ['css']);
});

gulp.task('build', function(callback) {
  runSequence(
    'clean:dist',
    ['css', 'jquery'],
    ['useref', 'images', 'fonts'],
    callback
  );
});
