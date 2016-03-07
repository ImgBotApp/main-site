var safeWords = require('./safe-words.json'); 

var src = 'src',
    build = 'build',
    development = build + '/development',
    production = build + '/production',
    srcAssets = src + '/_assets',
    developmentAssets = development + '/assets',
    productionAssets = production + '/assets',
    bowerPath = src + '/_bower_components';

module.exports = {
  browserSync: {
    development: {
      server: {
        baseDir: [development, build, src]
      },
      port: 9999,
      files: [
        developmentAssets + '/css/*.css',
        developmentAssets + '/js/*.js',
        developmentAssets + '/images/**',
        developmentAssets + '/fonts/*'
      ]
    },
    production: {
      server: {
        baseDir: [production]
      },
      port: 9998
    }
  },
  delete: {
    src: [ 
      development + '/**',
      '!' + development
    ]
  },
  html: {
    development: { 
      src:  src + '/_templates/**/!(_)*.jade',
      dest: development,
      dataFile: srcAssets + '/data/site.json',
      options: {
        pretty: true
      }
    },
    production: {
      src:  src + '/**/!(_)*.jade',
      dest: production,
      dataFile: src + '/data/site.json'
    }
  },
  sass: {
    src:  srcAssets + '/scss/**/main.scss',
    dest: developmentAssets + '/css',
    options: {
      outputStyle: 'expanded',
      errLogToConsole: true,
      includePaths: [
        bowerPath + '/bootstrap-sass/assets/stylesheets',
        bowerPath + '/font-awesome/scss'
      ]
    }
  },
  sourcemaps: {
    options: {
      includeContent: false,
      sourceRoot: srcAssets + '/scss'
    }
  },
  autoprefixer: {
    browsers: [
      'last 2 versions', 
      '> 5%', 
      'Firefox ESR'
    ]
  },
  js: {
    src: src + '/js/**/*.js'
  },
  images: {
    src: srcAssets + '/images/**/*',
    dest: developmentAssets + '/images'
  },
  favicon: {
    src: src + '/favicon/*-favicon.png',
    file: src + '/favicon/.faviconData.json'
  },
  fonts: {
    src: [ 
      bowerPath + '/font-awesome/fonts/*',
      srcAssets + '/fonts/*'
    ],
    dest: developmentAssets + '/fonts'
  },
  watch: {
    html: [ 
      src + '/_templates/**/*.jade',
      srcAssets + '/data/**/*.json'
    ],
    sass: srcAssets + '/scss/**/*.{sass,scss}',
    scripts: srcAssets + '/js/**/*.js',
    images: srcAssets + '/images/**/*',
    fonts: srcAssets + '/fonts/*'
  },
  optimize: {
    css: {
      src: developmentAssets + '/css/*.css',
      dest: productionAssets + '/css',
      options: {}
    },
    js: {
      src: developmentAssets + '/js/*.js',
      dest: productionAssets + '/js',
      options: {}
    },
    images: {
      src: developmentAssets + '/images/**/*.{jpg,jpeg,png}',
      dest: productionAssets + '/images',
      options: {
        key: safeWords.tinypng.key,
        sigFile: src + '/images/.tinypng-sigs',
        log: true
      }
    },
    html: {
      src: development + '/**/*.html',
      dest: production,
      options: {
        collapseWhitespace: true
      }
    }
  },
  revision: {
    src: {
      assets: [
        productionAssets + '/css/*.css',
        productionAssets + '/js/*.js',
        productionAssets + '/images/**/*'
      ],
      base: production
     },
     dest: {
       assets: production,
       manifest: {
         name: 'manifest.json',
         path: productionAssets
      }
    }
  },
  collect: {
    src: [
      productionAssets + '/manifest.json',
      production + '/**/*.{html,xml,txt,json,css,js}',
      '!' + production + '/feed.xml'
    ],
    dest: production
  }

};
