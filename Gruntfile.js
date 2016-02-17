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
                },
                overrides: {
                    bootstrap: {
                        main: [
                            './dist/js/bootstrap.min.js',
                            './dist/css/bootstrap.min.css',
                            './dist/fonts/*.*'
                        ]
                    }
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
    },
    clean: ["app/models/models.js", "app/views/views.js"],
    concat: {
        options: {
            separator: '\n',
        },
        models: {
            src: ['app/models/**/*.js'],
            dest: 'app/models/models.js'
        },
        views: {
            src: ['app/views/**/*.js'],
            dest: 'app/views/views.js'
        },
    },
    uglify: {
        target: {
            files:[{
                    expand: true,
                    src: 'app/models/models.js',
                    dest: 'app',
                    ext: '.min.js'
                },{
                    expand: true,
                    src: 'app/views/views.js',
                    dest: 'app',
                    ext: '.min.js'
                }
            ]
        }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-handlebars');
  grunt.loadNpmTasks('main-bower-files');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  
  grunt.registerTask('init', ['bower', 'handlebars', 'concat', 'uglify']);
  grunt.registerTask('default', ['clean', 'handlebars', 'concat', 'uglify']);

};
