var gulp        = require('gulp'),
    runSequence = require('run-sequence');

gulp.task('build', function(callback) {
  runSequence(
    'delete',
    'jade',
    [ 
      'sass',
      'sassLint'
    ],
    'jshint',
    'scripts',
    [
      'images',
      'copy:fonts'
    ],
    [
      'generateFavicon',
      'injectFaviconMarkups'
    ],
    callback
  );
});
