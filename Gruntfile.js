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
				banner: '/*! Vincent Orback <%= grunt.template.today("yyyy-mm-dd") %> */\n',
				mangle: true
			},
			my_target: {
				options: {
					sourceMap: 'js/main-min.map.js'
				},
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