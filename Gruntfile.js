module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    handlebars: {
	    all: {
	        files: {
	            "app/templates/templates.js": ["app/templates/**/*.hbs"]
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
                    },
                    'drmonty-leaflet-awesome-markers': {
                        main: [
                            './js/leaflet.awesome-markers.min.js',
                            './css/leaflet.awesome-markers.css',
                            './css/images/*.*'
                        ]
                    },
                    fontawesome: {
                        main: [
                            './css/font-awesome.min.css',
                            './fonts/*.*'
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
    clean: {
        start: ["app/models/models.min.js", "app/views/views.min.js", "app/templates/templates.min.js"],
        end: ["app/models/models.js", "app/views/views.js", "app/templates/templates.js"]
    },
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
                    src: 'app/templates/templates.js',
                    dest: '.',
                    ext: '.min.js'
                },
                {
                    expand: true,
                    src: 'app/models/models.js',
                    dest: '.',
                    ext: '.min.js'
                },{
                    expand: true,
                    src: 'app/views/views.js',
                    dest: '.',
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
  
  grunt.registerTask('init', ['clean:start', 'bower', 'handlebars', 'concat', 'uglify', 'clean:end']);
  grunt.registerTask('default', ['clean:start','handlebars', 'concat', 'uglify', 'clean:end']);
  grunt.registerTask('debug', ['clean','handlebars', 'concat', 'uglify']);
};
