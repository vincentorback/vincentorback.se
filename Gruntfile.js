module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    watch: {
	  options: {
	    livereload: true
	  },
	  js: {
	    files: ["js/*.js"],
	    tasks: "uglify"
	  },
	  sass: {
		  files: ["sass/**/*.scss"],
		  tasks: ["compass"]
	  },
	  css: {
	    files: ["*.css"]
	  },
	  imageoptim: {
		  files: ["images/**/*.jpg", "images/**/*.png"],
		  taskes: "imageoptim"
	  },
	  livereload: {
		  files: ["*.css"],
		  options: {
			  livereload: true
		  }
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
    },
    imageoptim: {
	  files: ["images"]
    },
    compass: {
    	default: {
	    	options: {
			    sassDir: 'sass',
			    config: 'config.rb'
		    }
	    }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-imageoptim');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['compass','uglify','imageoptim','watch']);

};