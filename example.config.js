var src = "public/src";
var dist = "public/dist";

module.exports = {
  rsync: {
    src: dist + '/**',
    options: {
      destination: '/path/to/destination',
      root: dist,
      hostname: 'your_hostname.com',
      username: 'username',
      incremental: true,
      progress: true,
      emptyDirectories: true,
      recursive: true,
      clean: true,
      exclude: ['.DS_Store'],
      include: []
    }
  }
};
