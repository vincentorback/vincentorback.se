module.exports = function(grunt) {

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		watch: {
			js: {
				files: ['js/*.js'],
				tasks: 'uglify'
			}
		},
		uglify: {
			options: {
				banner: '/*!\n* Vincent Orback <%= grunt.template.today("yyyy-mm-dd") %>\n* See the not so ugly version at https://github.com/vincentorback/Vincent-Orback \n*/\n',
				mangle: true
			},
			my_target: {
				files: {
					'js/main-min.js': ['js/vendor/jquery-1.9.1.min.js', 'js/vendor/modernizr.js', 'js/vendor/resize.js', 'js/main.js']
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('default', ['uglify', 'watch']);
};