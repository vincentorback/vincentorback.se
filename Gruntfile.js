var path = require( 'path' );

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
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true,
          minifyJS: true,
          minifyCSS: true
        },
        files: [{
          expand: true,
          src: ['*.html', 'work/*.html', 'posts/*.html'],
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
        quality: 90,
        alphaQuality: 90
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
    criticalcss: {
      custom_options: {
        options: {
          url: '/index.php',
          width: 1200,
          height: 900,
          outputfile: "critical.css"
        }
      }
    },
    imageoptim: {
      myPngs: {
        options: {
          jpegMini: false,
          imageAlpha: true,
          quitAfter: true
        },
        src: ['images/**/*.png']
      },
      myJpgs: {
        options: {
          jpegMini: false,
          imageAlpha: false,
          quitAfter: true
        },
        src: ['images']
      }
    }
  });

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('default', ['htmlmin', 'svgmin', 'webp']);

};