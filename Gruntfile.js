var path = require('path');


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
          src: ['build/css/style.css', 'build/js/main-min.js']
        }
      },
      html: {
        options: {
          position: 'top',
          banner: htmlBanner(),
          linebreak: true
        },
        files: {
          src: ['build/**/*.html']
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
    responsive_images: {
      test: {
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
          }]
        },
        files: [{
          expand: true,
          src: [
            'images/**/header.{jpg,gif,png}',
            'images/**/*-thumb.{jpg,gif,png}'
          ]
        }]
      }
    },
    }
  });

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('default', ['htmlmin', 'usebanner']);

};