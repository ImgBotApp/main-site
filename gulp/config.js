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
  json: {
    src: [ srcAssets + '/data/**/*.json' ]
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
  scripts: {
    src: srcAssets + '/js/*.js',
    dest: developmentAssets + '/js',
    bowerScripts: {
      src: [
        bowerPath + '/**/*.js',
        '!' + bowerPath + '/**/gulpfile.js'
      ],
      dest: developmentAssets + '/bower_components'
    }  
  },
  images: {
    src: srcAssets + '/images/**/*',
    dest: developmentAssets + '/images'
  },
  favicon: {
    options: {
      masterPicture: srcAssets + '/favicon/JohnRitterbush-favicon.png',
      dest: development,
      iconsPath: '/',
      design: {
        ios: {
          pictureAspect: 'noChange'
        },
        desktopBrowser: {},
        windows: {
          pictureAspect: 'noChange',
          backgroundColor: '#da532c',
          onConflict: 'override'
        },
        androidChrome: {
          pictureAspect: 'noChange',
          themeColor: '#ff670f',
          manifest: {
            name: 'John Ritterbush',
            display: 'browser',
            orientation: 'notSet',
            onConflict: 'override',
            declared: true
          }
        },
        safariPinnedTab: {
          pictureAspect: 'blackAndWhite',
          threshold: 75,
          themeColor: '#ff670f'
        }
      },
      settings: {
        compression: 5,
        scalingAlgorithm: 'Mitchell',
        errorOnImageTooSmall: false
      },
      markupFile: srcAssets + '/favicon/.faviconData.json'
    }
  },
  fonts: {
    development: {
      src: [ 
        bowerPath + '/font-awesome/fonts/*',
        srcAssets + '/fonts/*'
      ],
      dest: developmentAssets + '/fonts'
    },
    production: {
      src: developmentAssets + '/fonts',
      dest: productionAssets + '/fonts'
    }
  },
  watch: {
    html: [ 
      src + '/_templates/**/*.jade',
      srcAssets + '/data/**/*.json'
    ],
    sass: srcAssets + '/scss/**/*.{sass,scss}',
    scripts: srcAssets + '/js/**/*.js',
    images: srcAssets + '/images/**/*',
    fonts: srcAssets + '/fonts/*',
    favicon: srcAssets + '/favicon/JohnRitterbush-favicon.png'
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
      src: development + '/*.html',
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
