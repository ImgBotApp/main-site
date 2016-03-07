var config = require('../../config').delete;

var gulp   = require('gulp'),
    del    = require('del'),
    util   = require('gulp-util');

gulp.task('delete', function() {
  del(config.src).then(paths => {
    util.log('Deleted files and folders:\n\t', util.colors.yellow(paths.join('\n\t')));
  });
});
