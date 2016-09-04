module.exports = function (grunt) {

  function htmlBanner() {
    return ('<!-- \n' +
    'Wow this markup is really mashed up! \n' +
    'You can see all the clean code on GitHub: https://github.com/vincentorback/vincent-orback \n' +
    '-->');
  }

  function cssJsBanner() {
    var d = new Date(),
      local = d.toLocaleDateString();

    return ('/* \n' +
        ' * Vincent Orback \n' +
        ' * http://vincentorback.se \n' +
        ' * https://github.com/vincentorback \n' +
        ' * \n' +
        ' * Latest build: ' + local + '\n' +
        '*/ ');
  }

  var vincentConfig = {
    imageQuality: 90
  };

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    usebanner: {
      jscss: {
        options: {
          position: 'top',
          banner: cssJsBanner(),
          linebreak: true
        },
        files: {
          src: ['css/style.css', 'js/main-min.js']
        }
      }
    },

    replace: {
      dist: {
        options: {
          usePrefix: false,
          patterns: [
            {
              match: /<!doctype html>/g,
              replacement: function () {
                return '<!doctype html>\n' + htmlBanner() + '\n';
              }
            }
          ]
        },
        files: [
          {
            expand: true,
            src: ['build/**/*.html']
          }
        ]
      }
    },

    sass: {
      dist: {
        options: {
          style: 'compressed',
          sourcemap: 'none'
        },
        files: {
          'css/style.css' : 'sass/style.scss'
        }
      }
    },

    autoprefixer: {
      options: {
        browsers: ['last 3 versions']
      },
      target: {
        src: 'css/*.css',
      },
    },

    uglify: {
      options: {
        screwIE8: true,
        report: 'min'
      },
      main: {
        files: {
          'js/main-min.js': [
            'js/vendor/modernizr-custom.js',
            'js/vendor/jquery-3.1.0.js',
            'js/vendor/jquery.imageScroll.js',
            'js/vendor/jquery.smartness.js',
            'js/vendor/jquery.velocity.js',
            'js/main.js'
          ]
        }
      },
      error: {
        files: {
          'js/500-min.js': [
            'js/vendor/svg.js',
            'js/500.js'
          ],
          'js/404-min.js': [
            'js/vendor/paper-full.js',
            'js/404.js'
          ]
        }
      }
    },

    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true
        },
        files: [{
          expand: true,
          src: ['*.html', 'work/*.html', 'blog/*.html', 'easter/*.html'],
          dest: 'build/'
        }]
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
        binpath: require('webp-bin').path,
        quality: vincentConfig.imageQuality,
        alphaQuality: vincentConfig.imageQuality
      }
    },

    imageoptim: {
      png: {
        options: {
          jpegMini: false,
          imageAlpha: true,
          quitAfter: true
        },
        src: ['images/**/*.png']
      },
      jpg: {
        options: {
          jpegMini: false,
          imageAlpha: false,
          quitAfter: true
        },
        src: ['images']
      }
    },

    responsive_images: {
      options: {
        sizes: [{
          name: 'small',
          width: 600,
          quality: vincentConfig.imageQuality
        },{
          name: 'medium',
          width: 1200,
          quality: vincentConfig.imageQuality
        },{
          name: 'large',
          width: 1920,
          quality: vincentConfig.imageQuality
        },{
          name: 'huge',
          width: 2560,
          quality: vincentConfig.imageQuality
        }]
      },
      test: {
        files: [{
          expand: true,
          src: [
            'images/**/header.{jpg,gif,png}',
            'images/**/*-thumb.{jpg,gif,png}'
          ]
        }]
      }
    },

    watch: {
      scripts: {
        files: 'js/main.js',
        tasks: ['uglify:main']
      },
      styles: {
        files: 'sass/**/*.scss',
        tasks: ['css']
      }
    }
  });

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('default', ['css', 'uglify:main', 'watch']);

  grunt.registerTask('css', ['sass', 'autoprefixer']);

  grunt.registerTask('images', ['responsive_images:test', 'webp']);

  grunt.registerTask('deploy', ['htmlmin', 'css', 'uglify', 'usebanner', 'replace']);
};
