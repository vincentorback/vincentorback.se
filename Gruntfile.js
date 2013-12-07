module.exports = function(grunt) {

  function renderBanner() {
    return ('/*                 \n' +
        ' *  ___    ___  __   ____   __    _____   _____   ___    __   _________   \n' +
        ' *  \  \  /  / |  | |    \ |  |  /   __| |  ___| |    \ |  | |         |  \n' +
        ' *   \  \/  /  |  | |     \|  | |   /    |  |__  |     \|  | |___   ___|  \n' +
        ' *    \    /   |  | |  |\  \  | |  |     |   __| |  |\  \  |    |   |     \n' +
        ' *     \  /    |  | |  | \  \ | |   \__  |  |___ |  | \  \ |    |   |     \n' +
        ' *      \/     |__| |__|  \___|  \_____| |_____| |__|  \___|    |___|     \n' +  
        ' * \n' +
        ' * ' + new Date() + ' */');
  }

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),
    
    compass: {
      dist: {
        options: {
          config: 'config.rb',
          specify: 'sass/style.scss',
          banner: renderBanner()
        }
      },
    },
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
				banner: '/*!\n* Vincent Orback <%= grunt.template.today("yyyy-mm-dd") %>\n*/\n',
				mangle: false,
        report: 'gzip'
			},
			my_target: {
				files: {
          'js/main-min.js': ['js/vendor/modernizr.js', 'js/vendor/lazyload.js', 'js/main2.js']
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
        tasks: ['compass']
      },
      html: {
        files: ['*.html']
      }
    }
	});
  
  grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['compass', 'jshint', 'uglify']);
};