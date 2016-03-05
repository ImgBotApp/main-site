var gulp        = require('gulp'),
    runSequence = require('run-sequence');

gulp.task('build', function(callback) {
  runSequence(
    'bower',
    'delete',
    [
      'jade',
      'sass',
      // 'scripts',
      'images',
      'copy:fonts'
    ],
    callback
  );
});
