/* Variables */
var srcDir = 'public/src',
    bowerDir = srcDir + '/bower_components',
    sassDir = srcDir + '/scss/**/*.+(scss|sass)',
    fontAwesomeDir = bowerDir + '/font-awesome',
    jsDir = srcDir + '/js/**/*.js',
    cssDir = srcDir + '/css',
    fontsDir = srcDir + '/fonts/**/*',
    imgDir = srcDir + '/images/**/*.+(png|jpg|gif|svg)',
    distDir = 'public/dist';


/* Options */
var sassOptions = {
      errLogToConsole: true,
      outputStyle: 'expanded'
    },

    autoprefixerOptions = {
        browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
    };



/* Requirements */
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    useref = require('gulp-useref'),
    uglify = require('gulp-uglify'),
    gulpIf = require('gulp-if'),
    cssnano = require('gulp-cssnano'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    del = require('del'),
    runSequence = require('run-sequence'),
    htmlmin = require('gulp-htmlmin');


gulp.task('build-css', function() {
  return gulp.src(sassDir)
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(cssDir));
});

gulp.task('images', function() {
  return gulp.src(imgDir)
    .pipe(cache(imagemin({
      interlaced: true  
    })))
    .pipe(gulp.dest(distDir + '/images'));
});

gulp.task('useref', function() {
  return gulp.src(srcDir + '/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest(distDir));
});

// gulp.task('minify-html', function() {
//   return gulp.src(srcDir + '/*.html')
//     .pipe(htmlmin({collapseWhitespace: true}))
//     .pipe(gulp.dest(distDir));
// });

gulp.task('fonts', function() {
  return gulp.src([fontsDir,fontAwesomeDir+'/fonts/**/*'])
    .pipe(gulp.dest(distDir + '/fonts'));
});

gulp.task('clean:dist', function() {
  return del.sync(distDir);
});

gulp.task('watch', function() {
  gulp.watch(sassDir, ['build-css']);
});

gulp.task('default', function(callback) {
  runSequence(['watch'], 
    callback
  );
});

gulp.task('build', function(callback) {
  runSequence(
    'clean:dist',
    'build-css', 
    ['useref', 'images', 'fonts'],
    callback
  );
});
