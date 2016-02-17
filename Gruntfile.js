module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    handlebars: {
	    all: {
	        files: {
	            "js/templates.js": ["templates/**/*.hbs"]
	        }
	    }
	},
	bower: {
      dev: {
        dest: 'libs'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-handlebars');
  grunt.loadNpmTasks('grunt-bower');
  
  grunt.registerTask('init', ['bower', 'handlebars']);
  grunt.registerTask('default', ['handlebars']);

};
