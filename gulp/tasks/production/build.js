var gulp        = require('gulp'),
    runSequence = require('run-sequence');


gulp.task('build:production', function(callback) {
  runSequence(
    'delete',
    'html',
    [
      'sass',
      // 'scripts',
      'images',
      'copy:fonts'
    ],
    [
      'optimize:css',
      'optimize:js',
      'optimize:images',
      'optimize:html',
      'copy:fonts:production'
    ],
    'revision',
    'rev:collect',
    callback
  );
});
