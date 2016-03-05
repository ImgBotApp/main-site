var gulp   = require('gulp'),
    del    = require('del'),
    config = require('../../config').delete;

gulp.task('delete', function() {
  del(config.src).then(paths => {
    console.log('Deleted files and folders:\n', paths.join('\n'));
  });
});
