module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    handlebars: {
	    all: {
	        files: {
	            "app/templates.js": ["app/templates/**/*.hbs"]
	        }
	    }
	},
	bower: {
        dev: {
            base: 'bower_components', 
            dest: 'app/assets/libs',
            options: {
                checkExistence: true,
                debugging: true,
                paths: {
                    bowerDirectory: 'bower_components',
                    bowerrc: '.bowerrc',
                    bowerJson: 'bower.json'
                }
            }
        },
        /* flat folder/file structure */
        /*
        flat: { 
            dest: 'app/assets/libs',
            options: {
                debugging: true
            }
        }*/
    }
  });

  grunt.loadNpmTasks('grunt-contrib-handlebars');
  grunt.loadNpmTasks('main-bower-files');
  
  grunt.registerTask('init', ['bower', 'handlebars']);
  grunt.registerTask('default', ['handlebars']);

};
