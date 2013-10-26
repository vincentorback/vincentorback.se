module.exports = function(grunt) {

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		jshint: {
      options: {
        ignores: [
          'js/vendor/*.js',
          'js/*-min.js',
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
        globals: {
          jQuery: true,
          $: true
        }
      }
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
		uglify: {
			options: {
				banner: '/*!\n* Vincent Orback <%= grunt.template.today("yyyy-mm-dd") %>\n* See the not so ugly version at https://github.com/vincentorback/Vincent-Orback \n*/\n',
				mangle: true
			},
			my_target: {
				files: {
					'js/main-min.js': ['js/vendor/jquery-1.9.1.min.js', 'js/vendor/modernizr.js', 'js/vendor/jquery.lazyload.js', 'js/vendor/resize.js', 'js/main.js']
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');

	grunt.registerTask('default', ['jshint', 'uglify']);
};