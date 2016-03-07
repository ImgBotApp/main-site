var config      = require('../../config');

var gulp        = require('gulp'),
    realFavicon = require('gulp-real-favicon'),
    fs          = require('fs');

// Generate the icons. This task takes a few seconds to complete.
// You should run it at least once to create the icons. Then,
// you should run it whenever RealFaviconGenerator updates its
// package (see the check-for-favicon-update task below).
gulp.task('generateFavicon', function(done) {
  realFavicon.generateFavicon(config.favicon.options, function() {
    done();
  });
});

// Inject the favicon markups in your HTML pages. You should run
// this task whenever you modify a page. You can keep this task
// as is or refactor your existing HTML pipeline.
gulp.task('injectFaviconMarkups', function() {
  gulp.src([ config.html.development.dest + './**/*.html' ])
    .pipe(realFavicon.injectFaviconMarkups(JSON.parse(fs.readFileSync(config.favicon.options.markupFile)).favicon.html_code))
    .pipe(gulp.dest(config.html.development.dest));
});

// Check for updates on RealFaviconGenerator (think: Apple has just
// released a new Touch icon along with the latest version of iOS).
// Run this task from time to time. Ideally, make it part of your
// continuous integration system.
gulp.task('checkFaviconUpdate', function(done) {
  var currentVersion = JSON.parse(fs.readFileSync(config.favicon.options.markupFile)).version;
  realFavicon.checkForUpdates(currentVersion, function(err) {
    if (err) {
      throw err;
    }
  });
});

