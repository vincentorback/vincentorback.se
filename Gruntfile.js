module.exports = function(grunt) {

  function creditsBanner() {
    var d = new Date(),
      local = d.toLocaleDateString();

    return ('/* \n' +
        ' * Vincent Orback \n' +
        ' * \n' +
        ' * http://vincentorback.se/ \n' +
        ' * https://github.com/vincentorback/Vincent-Orback \n' +
        ' * \n' +
        ' * Latest build: ' + local + '\n' +
        '*/ ');
  }

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    sass: {
      dist: {
        options: {
          style: 'compressed',
          compass: 'true',
          noCache: true,
          banner: creditsBanner()
        },
        files: {
          'style.css': 'sass/style.scss'
        }
      }
    },
    jshint: {
      options: {
        ignores: [
          'js/vendor/prism.js',
          'js/vendor/svg.min.js',
          'js/vendor/modernizr-custom.js',
          'js/vendor/lazyload.js',
          'js/*-min.js'
        ],
        browser: true,
        strict: false,
        eqeqeq: true,
        indent: 2,
        newcap: true,
        plusplus: true,
        unused: true,
        trailing: true,
        loopfunc: false,
        nomen: true,
        onevar: true,
        white: true,
        undef: true,
        latedef: true,
        "-W002": false, // Value of 'event' may be overwritten in IE 8 and earlier.
        globals: {
          jQuery: true,
          $: true,
          console: true,
          alert: true
        }
      },
      files: ['js/**/*.js']
    },
    imagemin: {
      png: {
        options: {
          optimizationLevel: 7
        },
        files: [
          {
            expand: true,
            cwd: 'images/',
            src: ['**/*.png'],
            dest: 'images/',
            ext: '.png'
          }
        ]
      },
      jpg: {
        options: {
            progressive: true
        },
        files: [
            {
              expand: true,
              cwd: 'images/',
              src: ['**/*.jpg'],
              dest: 'images/',
              ext: '.jpg'
            }
        ]
      }
    },
    svgmin: {
      options: {
        plugins: [{
          removeViewBox: false
        }]
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'images/',
          src: ['**/*.svg'],
          dest: 'images/'
        }]
      }
    },
    webp: {
      files: {
        expand: true,
        cwd: 'images/',
        src: ['**/*.png', '**/*.jpg'],
        dest: 'webp/'
      },
      options: {
        binpath: require('webp-bin').path
      }
    },
    uglify: {
      dist: {
        options: {
          banner: creditsBanner(),
          report: 'gzip'
        },
        files: {
          'js/main-min.js': ['js/vendor/modernizr-custom.js', 'js/vendor/lazyload.js', 'js/main.js']
        }
      }
    },
    uncss: {
      dist: {
        files: {
          'style.css': '*.html'
        }
      }
    },
    devUpdate: {
      main: {
        options: {
          reportUpdated: true,
          updateType: "prompt",
        }
      }
    },
    watch: {
      scripts: {
        files: ['js/**/*.js'],
        tasks: ['jshint', 'uglify']
      },
      css: {
        files: ['sass/**/*.scss'],
        tasks: ['sass']
      }
    }
  });

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('default', ['sass', 'jshint', 'uglify']);

  grunt.registerTask('deploy', ['devUpdate', 'imagemin', 'svgmin', 'sass', 'jshint', 'uglify']);

};