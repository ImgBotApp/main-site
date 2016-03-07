var gulp        = require('gulp'),
    runSequence = require('run-sequence');


gulp.task('build:production', function(callback) {
  runSequence(
    'delete',
    'jade',
    'sass',
    'scripts',
    [ 
      'images',
      'copy:fonts' 
    ],
    [ 
      'generateFavicon',
      'injectFaviconMarkups'
    ],
    [
      'optimize:css',
      'optimize:js',
      'optimize:images',
      'optimize:html',
      'copy:fonts:production',
      'copy:favicons:production'
    ],
    // 'revision',
    // 'rev:collect',
    callback
  );
});
