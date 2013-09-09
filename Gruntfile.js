module.exports = function(grunt) {
	
	// Configuration of the project and plugins
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		sass: {
			// This will be executed when we run the 'development' task below
			development: {
				options: {
					style: 'expanded'
				},
				files: {
					'css/style.css': 'css/style.sass'
				}
			},
			// This will be executed when we run the 'deploy' task below
			deploy: {
				options: {
					style: 'compressed'
				},
				files: {
					'css/style.css': 'css/style.sass'
				}
			}
		},
	});

	// Load the plugin that provides the "sass" task.
	grunt.loadNpmTasks('grunt-contrib-sass');

	// Our tasks
	grunt.registerTask('development', ['sass:development']);
	grunt.registerTask('deploy', ['sass:deploy']);

};