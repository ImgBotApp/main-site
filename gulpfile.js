/* Requirements */
var gulp = require('gulp'),
    fs = require('fs'),
    bower = require('gulp-bower'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    data = require('gulp-data'),
    jade = require('gulp-jade'),
    useref = require('gulp-useref'),
    gulpIf = require('gulp-if'),
    uglify = require('gulp-uglify'),
    jsonlint = require('gulp-jsonlint'),
    jsonminify = require('gulp-jsonminify'),
    cssnano = require('gulp-cssnano'),
    cache = require('gulp-cache'),
    tinypng = require('gulp-tinypng'),
    imagemin = require('gulp-imagemin'),
    del = require('del'),
    runSequence = require('run-sequence'),
    realFavicon = require ('gulp-real-favicon'),
    spellcheck = require('gulp-spellcheck'),
    markdown = require('gulp-markdown'),
    rsync = require('gulp-rsync');

/* Config */
var config = require('./config.json');

/* Environment vars */

var env = process.env.NODE_ENV;

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
};

var images = {
  in: source + 'images/**/*.+(png|jpg|gif|svg)',
  out: dest + 'images'
}

var json = {
  in: [ source + 'js/**/*.json' ],
  out: dest + 'js'
}

var fonts = {
  in: [
    bowerPath + 'font-awesome/fonts/*.*',
    source + 'fonts/*.*'
  ],
  out: dest + 'fonts'
};

var content = {
  in: source + 'content/*.md',
  tmpOut: dest + 'content/.tmp',
  out: source + 'content/.spellchecked/'
}


var styles = {
  in: source + 'scss/main.scss',
  srcOut: source + 'css',
  destOut: dest + 'css',
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

// File where the favicon markups are stored
var favicon = {
  iconOpts: {
    masterPicture: config.faviconData.icon,
    dest: dest,
    iconsPath: '/',
    design: {
      ios: {
        pictureAspect: 'noChange'
      },
      desktopBrowser: {},
      windows: {
        pictureAspect: 'noChange',
        backgroundColor: '#2b5797',
        onConflict: 'override'
      },
      androidChrome: {
        pictureAspect: 'noChange',
        themeColor: '#ffffff',
        manifest: {
          name: 'John Ritterbush',
          display: 'browser',
          orientation: 'notSet',
          onConflict: 'override',
          declared: true
        }
      },
      safariPinnedTab: {
        pictureAspect: 'blackAndWhite',
        threshold: 75,
        themeColor: '#5bbad5'
      }
    },
    settings: {
      compression: 5,
      scalingAlgorithm: 'Mitchell',
      errorOnImageTooSmall: false
    },
    markupFile: config.faviconData.file
  }
}


var options = {
  autoprefixerOptions: {
    browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
  }
}

gulp.task('jade', function() {
  return gulp.src('src/templates/**/!(_)*.jade')
    .pipe(data(function(file) {
      return require('./src/data/site.json');
    }))
    .pipe(jade({
      pretty: true  
    }))
    .pipe(gulp.dest('builds/development/'));
});


gulp.task('bower', function() {
  return bower();
});

gulp.task('content', function() {
  return gulp.src(content.in)
    .pipe(markdown())
    .pipe(gulp.dest(content.tmpOut));
});

gulp.task('spellcheck', function() {
  gulp.src(content.in)
    .pipe(spellcheck())
    .pipe(gulp.dest(content.out));
})


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


// Generate the icons. This task takes a few seconds to complete.
// You should run it at least once to create the icons. Then,
// you should run it whenever RealFaviconGenerator updates its
// package (see the check-for-favicon-update task below).
gulp.task('generate-favicon', function(done) {
  realFavicon.generateFavicon(favicon.iconOpts, function() {
    done();
  });
});

// Inject the favicon markups in your HTML pages. You should run
// this task whenever you modify a page. You can keep this task
// as is or refactor your existing HTML pipeline.
gulp.task('inject-favicon-markups', function() {
  gulp.src([ dest + '/*.html' ])
    .pipe(realFavicon.injectFaviconMarkups(JSON.parse(fs.readFileSync(config.faviconData.file)).favicon.html_code))
    .pipe(gulp.dest(dest));
});

// Check for updates on RealFaviconGenerator (think: Apple has just
// released a new Touch icon along with the latest version of iOS).
// Run this task from time to time. Ideally, make it part of your
// continuous integration system.
gulp.task('check-for-favicon-update', function(done) {
  var currentVersion = JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).version;
  realFavicon.checkForUpdates(currentVersion, function(err) {
    if (err) {
      throw err;
    }
  });
});


gulp.task('useref', function() {
  return gulp.src(source + '*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest(dest));
});


gulp.task('fonts', function() {
  return gulp.src(fonts.in)
    .pipe(gulp.dest(fonts.out));
});


gulp.task('json', function() {
  return gulp.src(json.in)
    .pipe(jsonlint())
    .pipe(jsonlint.reporter())
    .pipe(jsonminify())
    .pipe(gulp.dest(json.out))
});


gulp.task('clean:dist', function() {
  return del.sync(dest);
});


gulp.task('clear', function(done) {
  return cache.clearAll(done);
});

var conf = require('./config').rsync;
gulp.task('rsync', function() {
  return gulp.src(conf.src)
    .pipe(rsync(conf.options));
});


gulp.task('watch', function() {
  gulp.watch(styles.watch, ['css']);
  gulp.watch(json.in, ['json']);
  gulp.watch(source + 'js/**/*.js', ['useref']);
  gulp.watch(source + '*.html', ['useref'])
});


gulp.task('default', function(callback) {
  runSequence(
    'clean:dist',
    ['css', 'jquery', 'json'],
    ['useref', 'images', 'fonts'],
    ['generate-favicon', 'inject-favicon-markups'],
    'watch',
    callback
  );
});

gulp.task('deploy', ['rsync']);
