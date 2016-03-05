var requireDir = require('require-dir');

// Require all tasks in gulp/tasks dir all the way down
requireDir('./gulp/tasks', { recurse: true });
