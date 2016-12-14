module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        
        clean: {
            css: 'public/css/release/angular-bootstrap-web.min.css',
            vendorcss: 'public/css/release/vendor-all.min.css',
            vendorjs: ['public/js/release/vendor-all.js','public/js/release/vendor-all.min.js'],
            js: ['public/js/release/angular-bootstrap-web.js','public/js/release/angular-bootstrap-web.min.js']
        },
        
        less: {
            compile: {
                options: {
                  strictMath: true,
                  sourceMap: true,
                  outputSourceFiles: true,
                  sourceMapURL: 'app.css.map',
                  sourceMapFilename: 'public/css/app.css.map'
                },
                src: 'public/less/app.less',
                dest: 'public/css/app.css'
            }
        },
        
        bowercopy: {
            libs: {
                options: {
                    destPrefix: 'public/js/vendor'
                },
                files: {
                    'moment.js': 'moment/moment.js',
                    'jquery.js': 'jquery/dist/jquery.js',
                    'angular.js': 'angular/angular.js',
                    'angular-ui-router.js': 'angular-ui-router/release/angular-ui-router.js',
                    'ui-router-metatags.js': 'ui-router-metatags/dist/ui-router-metatags.js',
                    'angular-animate.js': 'angular-animate/angular-animate.js',
                    'ui-bootstrap-tpls.js': 'angular-bootstrap/ui-bootstrap-tpls.js',
                    'lightgallery.js': 'lightgallery/dist/js/lightgallery.js',
                    'video.js': 'video.js/dist/video.js',
                    'Youtube.js': 'videojs-youtube/dist/Youtube.js',
                    'please-wait.js': 'please-wait/build/please-wait.js'
                }
            },
            css: {
                options: {
                    destPrefix: 'public/css/vendor'
                },
                files: {
                    'font-awesome.css': 'font-awesome/css/font-awesome.css',
                    'animate.css': 'animate.css/animate.css',
                    'lg-fb-comment-box.css': 'lightgallery/dist/css/lg-fb-comment-box.css',
                    'lg-transitions.css': 'lightgallery/dist/css/lg-transitions.css',
                    'lightgallery.css': 'lightgallery/dist/css/lightgallery.css',
                    'video-js.css': 'video.js/dist/video-js.css',
                    'please-wait.css': 'please-wait/build/please-wait.css',
                    'bootstrap.css': 'bootstrap/dist/css/bootstrap.css'
                }
            }
        },
        
        copy: {
            vendorfonts: {
                files: [
                    { 
                        cwd: 'bower_components/',
                        src: ['font-awesome/fonts/*',  
                            'bootstrap/dist/fonts/*',  
                            'source-sans-pro/EOT/*',
                            'source-sans-pro/OTF/*',
                            'source-sans-pro/TTF/*',
                            'source-sans-pro/WOFF/OTF/*',
                            'source-sans-pro/WOFF/TTF/*',
                            'source-sans-pro/WOFF2/OTF/*',
                            'source-sans-pro/WOFF2/TTF/*'
                        ], 
                        dest: 'public/css/fonts/',
                        expand: true,
                        flatten: true
                    }
                ]
            }
        },
        
        cssmin: {
            target: {
                files: [{
                        expand: true,
                        cwd: 'public/css/vendor',
                        src:['*.css', '!*.min.css'],
                        dest: 'public/css/vendor',
                        ext: '.min.css'
                },
                {
                        expand: true,
                        cwd: 'public/css',
                        src:['*.css', '!*.min.css'],
                        dest: 'public/css',
                        ext: '.min.css'
                }]
            }
        },
    
        concat: {
            options: {
              banner: '',
              stripBanners: false
            },
            
            vendorcss: {
              src: [
                'public/css/vendor/*.min.css'
              ],
              dest: 'public/css/release/vendor-all.min.css'
            },
            
            css: {
              src: [
                'public/css/*.min.css'
              ],
              dest: 'public/css/release/angular-bootstrap-web.min.css'
            },
            
            vendorjs: {
                src: ['public/js/vendor/moment.js', 
                    'public/js/vendor/moment-timezone-with-data.js', 
                    'public/js/vendor/jquery.js', 
                    'public/js/vendor/angular.js',
                    'public/js/vendor/video.js',
                    'public/js/vendor/Youtube.js',  
                    'public/js/vendor/**/*.js'],
                dest: 'public/js/release/vendor-all.js'
            },
            
            js: {
                src: ['public/js/app.js', 'public/js/**/*.js', '!public/js/vendor/**/*.js', '!public/js/release/**/*.js'],
                dest: 'public/js/release/angular-bootstrap-web.js'
            }
        },
        
        uglify: {
            options: {
              compress: {
                warnings: false
              },
              mangle: true,
              preserveComments: 'some'
            },
            
            vendor: {
              src: 'public/js/release/vendor-all.js',
              dest: 'public/js/release/vendor-all.min.js'
            },
            
            source: {
              src: 'public/js/release/angular-bootstrap-web.js',
              dest: 'public/js/release/angular-bootstrap-web.min.js'
            }
        },
        
        watch: {
            less: {
              files: 'public/less/**/*.less',
              tasks: 'build-css'
            },
            
            js: {
              files: ['public/js/**/*.js', '!public/js/vendor/**/*.js', '!public/js/release/**/*.js'],
              tasks: 'build-js'
            }
        }
    });
        
    require('load-grunt-tasks')(grunt, { scope: 'devDependencies' });

    grunt.registerTask('compile-less', ['less:compile']);
    grunt.registerTask('concat-css', ['concat:vendorcss', 'concat:css']);
    grunt.registerTask('copy-vendor-assets', ['bowercopy:libs', 'bowercopy:css', 'copy:vendorfonts']);
    grunt.registerTask('build-css', ['clean:css', 'less:compile', 'cssmin', 'concat:css']);
    grunt.registerTask('build-js', ['clean:js', 'concat:js', 'uglify:source']);
    grunt.registerTask('release', ['clean', 'less:compile', 'copy-vendor-assets', 'cssmin', 'concat', 'uglify']);
};
