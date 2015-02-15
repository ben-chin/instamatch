var config = {
	lib: {
		js: 'frontend/js/lib',
		css: 'frontend/css/lib'
	},
	app: {
		js: 'frontend/js/app',
		css: 'frontend/css'
	},
	node: 'node_modules',
	tests: 'tests',
	dist: 'app/static'
};

module.exports = function (grunt) {

	grunt.initConfig({
		config: config,
		pkg: grunt.file.readJSON('package.json'),

		copy: {
			dist: {
				files: []
			}
		},

		concat: {
			dist: {
				files: {
					'<%= config.dist %>/js/lib.min.js':
						[
							'<%= config.lib.js %>/jquery.min.js',
							'<%= config.lib.js %>/jquery-ui.min.js',
							'<%= config.lib.js %>/underscore.min.js',
							'<%= config.lib.js %>/backbone.min.js',
						],
					'<%= config.dist %>/css/lib.min.css':
						[
							'<%= config.lib.css %>/bootstrap.min.css',
						]
				}
			}
		},

		cssmin: {
			dist: {
				files: {
					'<%= config.dist %>/css/style.min.css':
						[
							'<%= config.app.css %>/animations.css',
							'<%= config.app.css %>/style.css',
							'<%= config.app.css %>/responsive.css',
						]
				}
			}
		},

		uglify: {
			dist: {
				files: {
					'<%= config.dist %>/js/app.min.js':
						[
							'<%= config.app.js %>/models/*.js',
							'<%= config.app.js %>/collections/*.js',
							'<%= config.app.js %>/views/*.js',
							'<%= config.app.js %>/app.js',
						]
				}
			}
		},

		watch: {
            app: {
                files: [
                    '<%= config.app.js %>/**/*.js'
                ],
                tasks: ['uglify'],
                options: {
                    spawn: false
                }
            },
            css: {
            	files: [
                    '<%= config.app.css %>/*.css'
                ],
                tasks: ['cssmin'],
                options: {
                    spawn: false
                }
            }
        },

        jshint: {
        	all: [
        		'Gruntfile.js',
        		'<%= config.app.js %>/**/*.js'
        	],
        	options: {
        		camelcase: true,
        		curly: true,
        		immed: true,
        		multistr: true,
        		indent: 4,
        		maxlen: 80,
        		nonbsp: true,
        		quotmark: 'single',
        		undef: true,
        		unused: true,
        		globals: {
        			'_': false,
        			'module': false,
        			'Backbone': false
        		},
        		browser: true,
        		jquery: true
        	}
        },

        jasmine: {
		    src: [
				'<%= config.app.js %>/models/*.js',
				'<%= config.app.js %>/collections/*.js',
			],
		    options: {
		    	keepRunner: true,
		    	host: 'http://localhost:8080',
		    	specs: '<%= config.tests %>/specs/**/*spec.js',
		    	vendor: '<%= config.dist %>/js/lib.min.js',
		    	helpers: [
		    		'<%= config.node %>/jasmine-jquery/lib/jasmine-jquery.js',
		    		'<%= config.node %>/jasmine-ajax/lib/mock-ajax.js',
		    	]
		    }
	    },

	    connect: {
	    	server: {
	    		options: {
	    			host: 'localhost',
	    			port: 8080,
	    		}
	    	}
	    }

	});


	grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-jasmine');
	grunt.loadNpmTasks('grunt-contrib-connect');

	grunt.registerTask('default', [
        'concat',
        'copy',
		'uglify',
		'cssmin',
	]);

	grunt.registerTask('test', [
		'jshint',
		'connect',
		'jasmine',
	]);

};