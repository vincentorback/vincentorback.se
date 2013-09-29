module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! Vincent Orback <%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %> */\n',
        mangle: true
      },
      my_target: {
      	files: {
	      	'js/main-min.js': ['js/jquery-1.9.1.min.js', 'js/modernizr.js', 'js/resize.js', 'js/main.js']
      	}
      }
    },
    imagemin: {
	  png: {
	    options: {
	      optimizationLevel: 7 //Compression level
	    },
	    files: [{
	      expand: true,
	      cwd: 'images',
	      src: ['images/**/*.png'],
	      dest: 'images',
	      ext: '.png'
	    }]
	  },
	  jpg: {
	    options: {
	      progressive: true
	    },
	    files: [{
	      expand: true,
	      cwd: 'images',
	      src: ['images/**/*.jpg'],
	      dest: 'images',
	      ext: '.jpg'
	    }]
	  }
    },
    sass: {
	    options: {
		    style: 'compressed'
	    },
	    files: {
		    'style.css': 'sass/*.scss'
	    }
    },
    watch: {
	  options: {
	    livereload: true
	  },
	  js: {
	    files: ["js/*.js"],
	    tasks: "uglify",
	  },
	  sass: {
	    files: ["sass/*.scss"],
	    tasks: "sass",
	  },
	  imagemin: {
		  files: ["images/*.jpg", "images/*.png"],
		  taskes: "imagemin"
	  }
	}
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['sass','uglify','imagemin','watch']);

};