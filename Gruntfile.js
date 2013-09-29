module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    watch: {
	  js: {
	    files: ["js/*.js"],
	    tasks: "uglify"
	  }
	},
    uglify: {
      options: {
        banner: '/*! Vincent Orback <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        mangle: true
      },
      my_target: {
      	files: {
	      	'js/main-min.js': ['js/jquery-1.9.1.min.js', 'js/modernizr.js', 'js/resize.js', 'js/main.js']
      	}
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['uglify','watch']);

};