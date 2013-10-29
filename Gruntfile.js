/styles* jshint node: true */

module.exports = function(grunt) {
  "use strict";

  var btoa = require('btoa')
  // Project configuration.
  grunt.initConfig({

    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*!\n' +
              ' * Bootstrap v<%= pkg.version %> by @fat and @mdo\n' +
              ' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
              ' * Licensed under <%= _.pluck(pkg.licenses, "url").join(", ") %>\n' +
              ' *\n' +
              ' * Bootstrap designed and built with all the love in the world by @mdo and @fat.\n' +
              ' *\n' +
              ' * Custom code by Byron Gibson:\n' +
              ' * Namely main.less, main.js, main.min.css, main.min.js, and a few tweaks to Variables.less.\n' +
              ' */\n',
    jqueryCheck: 'if (typeof jQuery === "undefined") { throw new Error("Bootstrap requires jQuery") }\n\n',
   

    // Task configuration.
    clean: {
        test: ['test']
        ,dist: ['dist']
    },


    jshint: {
      options: {
        jshintrc: 'src/scripts/.jshintrc'
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      src: {
        src: ['src/scripts/*.js']
      },
      test: {
        src: ['src/scripts/tests/unit/*.js']
      }
    },


    concat: {
      options: {
        stripBanners: true
      },
      bootstrap: {
        src: [
          'src/scripts/transition.js',
          'src/scripts/alert.js',
          'src/scripts/button.js',
          'src/scripts/carousel.js',
          'src/scripts/collapse.js',
          'src/scripts/dropdown.js',
          'src/scripts/modal.js',
          'src/scripts/tooltip.js',
          'src/scripts/popover.js',
          'src/scripts/scrollspy.js',
          'src/scripts/tab.js',
          'src/scripts/affix.js'
        ],
        dest: 'src/scripts/lib/<%= pkg.name %>.js'
      },
      html_index: {
        src: [
            'src/html/_head.html',
            'src/html/_header.html',
            'src/html/_index.html',
            'src/html/_foot.html'
        ],
        dest: 'src/index.html'
      },
      html_error: {
        src: [
            'src/html/_head.html',
            'src/html/_header.html',
            'src/html/_error.html',
            'src/html/_foot.html'
        ],
        dest: 'src/error.html'
      }
    },

    
    htmlmin: {                                      // Task
        test: {                                     // Target
            options: {                              // Target options: https://github.com/gruntjs/grunt-contrib-htmlmin
                removeComments: false,
                collapseWhitespace: false,
                removeCommentsFromCDATA: false,
                removeCDATASectionsFromCDATA: false,
                collapseBooleanAttributes: false,
                removeAttributeQuotes: false,
                removeRedundantAttributes: false,
                useShortDoctype: false,
                removeEmptyAttributes: false,
                removeOptionalTags: false,
                removeEmptyElements: false
            },
            files: {                                        // Dictionary of files
                'test/index.html': 'src/index.html',        // 'destination': 'source'
                'test/error.html': 'src/error.html'
            }
        },
        dist: {                                     // Target
            options: {                              // Target options: https://github.com/gruntjs/grunt-contrib-htmlmin
                removeComments: true,
                collapseWhitespace: true,
                removeCommentsFromCDATA: true,
                removeCDATASectionsFromCDATA: false,
                collapseBooleanAttributes: false,
                removeAttributeQuotes: false,
                removeRedundantAttributes: false,
                useShortDoctype: false,
                removeEmptyAttributes: true,
                removeOptionalTags: false,
                removeEmptyElements: false
            },
            files: {                                        // Dictionary of files
                'dist/index.html': 'src/index.html',        // 'destination': 'source'
                'dist/error.html': 'src/error.html'
            }
        }
    },


    recess: {
        test: {
            options: {
                compile: true                 // Compiles CSS or LESS. Fixes white space and sort order.
                , compress: false                // Compress your compiled code
                , noIDs: true                    // Doesn't complain about using IDs in your stylesheets
                , noJSPrefix: true            // Doesn't complain about styling .js- prefixed classnames
                , noOverqualifying: true        // Doesn't complain about overqualified selectors (ie: div#foo.bar)
                , noUnderscores: true            // Doesn't complain about using underscores in your class names
                , noUniversalSelectors: false    // Doesn't complain about using the universal * selector
                , prefixWhitespace: true        // Adds whitespace prefix to line up vender prefixed properties
                , strictPropertyOrder: true    // Complains if not strict property order
                , zeroUnits: true                // Doesn't complain if you add units to values of 0
            },
            files: {
                'test/styles/lib/bootstrap.css':'src/styles/less/bootstrap.less'
                ,'test/styles/lib/bootstrap-theme.css':'src/styles/less/theme.less'
                ,'test/styles/main.css':'src/styles/less/main.less'
                ,'test/styles/pure.css':'src/styles/css/pure.css'
            }              
        },
        dist: {  
            options: {
                compile: true                 // Compiles CSS or LESS. Fixes white space and sort order.
                , compress: true                // Compress your compiled code
                , noIDs: true                    // Doesn't complain about using IDs in your stylesheets
                , noJSPrefix: true            // Doesn't complain about styling .js- prefixed classnames
                , noOverqualifying: true        // Doesn't complain about overqualified selectors (ie: div#foo.bar)
                , noUnderscores: true            // Doesn't complain about using underscores in your class names
                , noUniversalSelectors: false    // Doesn't complain about using the universal * selector
                , prefixWhitespace: false        // Adds whitespace prefix to line up vender prefixed properties
                , strictPropertyOrder: true    // Complains if not strict property order
                , zeroUnits: true                // Doesn't complain if you add units to values of 0
            },
            files: {
                'dist/styles/lib/bootstrap.css':'src/styles/less/bootstrap.less'
                ,'dist/styles/lib/bootstrap-theme.css':'src/styles/less/theme.less'
                ,'dist/styles/lib/normalize.css':'bower_components/html5-boilerplate/css/normalize.css'
                ,'dist/styles/main.css':'src/styles/less/main.less'
                ,'dist/styles/pure.css':'src/styles/css/pure.css'
            }
        }
    },

    
    uglify: {
        test: {
            options: {
                mangle: false
                , compress: true
                , beautify: true
                , report: false
                , sourceMap: 'test/scripts/source-map.js'
                , sourceMapRoot: 'src/scripts/'
                , preserveComments: true
            },
            files: {
                'test/scripts/lib/jquery.js':'bower_components/jquery/jquery.js'
                ,'test/scripts/lib/<%= pkg.name %>.js':'<%= concat.bootstrap.dest %>'
                ,'test/scripts/lib/modernizr.js':'bower_components/modernizr/modernizr.js'
                ,'test/scripts/lib/html5shiv.js':'bower_components/html5shiv/dist/html5shiv.js'
                ,'test/scripts/lib/html5shiv-printshiv.js':'bower_components/html5shiv/dist/html5shiv-printshiv.js'
                ,'test/scripts/lib/JSXTransformer.js':'bower_components/react/JSXTransformer.js'
                ,'test/scripts/lib/react.js':'bower_components/react/react.js'
                ,'test/scripts/lib/d3.js':'bower_components/d3/d3.js'
                ,'test/scripts/require.js':'bower_components/requirejs/require.js'
                ,'test/scripts/main.js':'src/scripts/main.js'
                ,'test/scripts/plugins.js':'src/scripts/plugins.js'
            }
        },
        dist: {
            options: {
                mangle: false //(only main.js, plugins.js)
                , compress: true
                , beautify: true
                , report: 'min'
                , sourceMap: 'dist/scripts/source-map.js'
                , sourceMapRoot: 'src/scripts/'
                , preserveComments: false
            },
            files: {
                'dist/scripts/lib/jquery.js':'bower_components/jquery/jquery.js'
                ,'dist/scripts/lib/<%= pkg.name %>.js':'<%= concat.bootstrap.dest %>'
                ,'dist/scripts/lib/modernizr.js':'bower_components/modernizr/modernizr.js'
                ,'dist/scripts/lib/html5shiv.js':'bower_components/html5shiv/dist/html5shiv.js'
                ,'dist/scripts/lib/html5shiv-printshiv.js':'bower_components/html5shiv/dist/html5shiv-printshiv.js'
                ,'dist/scripts/lib/JSXTransformer.js':'bower_components/react/JSXTransformer.js'
                ,'dist/scripts/lib/react.js':'bower_components/react/react.js'
                ,'dist/scripts/lib/d3.js':'bower_components/d3/d3.js'
                ,'dist/scripts/require.js':'bower_components/requirejs/require.js'
                ,'dist/scripts/main.js':'src/scripts/main.js'
                ,'dist/scripts/plugins.js':'src/scripts/plugins.js'
            }
        },
        gzip: {
            options: {
                mangle: false //(only main.js, plugins.js)
                , compress: true
                , beautify: true
                , report: 'gzip'
                , sourceMap: 'dist/scripts/source-map.js'
                , sourceMapRoot: 'src/scripts/'
                , preserveComments: false
            },
            files: {
                'dist/scripts/lib/jquery.js':'bower_components/jquery/jquery.js'
                ,'dist/scripts/lib/<%= pkg.name %>.js':'<%= concat.bootstrap.dest %>'
                ,'dist/scripts/lib/modernizr.js':'bower_components/modernizr/modernizr.js'
                ,'dist/scripts/lib/html5shiv.js':'bower_components/html5shiv/dist/html5shiv.js'
                ,'dist/scripts/lib/html5shiv-printshiv.js':'bower_components/html5shiv/dist/html5shiv-printshiv.js'
                ,'dist/scripts/lib/JSXTransformer.js':'bower_components/react/JSXTransformer.js'
                ,'dist/scripts/lib/react.js':'bower_components/react/react.js'
                ,'dist/scripts/lib/d3.js':'bower_components/d3/d3.js'
                ,'dist/scripts/require.js':'bower_components/requirejs/require.js'
                ,'dist/scripts/main.js':'src/scripts/main.js'
                ,'dist/scripts/plugins.js':'src/scripts/plugins.js'
            }
        }
    },

    
    jsx: {
        client: {
            src: 'src/scripts/main.jsx',
            dest: 'src/scripts/main.js'
        }
    }, 


    copy: {
      test: {
        files: [
          {expand: true, flatten: true, src: ["bower_components/html5-boilerplate/crossdomain.xml"], dest: 'test/'},
          {expand: true, flatten: true, src: ["bower_components/html5-boilerplate/apple-touch-icon-precomposed.png"], dest: 'src/images/ico/h5bp/'},
          {expand: true, flatten: true, src: ["bower_components/html5-boilerplate/favicon.ico"], dest: 'src/images/ico/h5bp/'},
          {expand: true, flatten: true, src: ["bower_components/bootstrap/docs-assets/ico/*"], dest: 'src/images/ico/bootstrap/'},
          {expand: true, flatten: true, src: ["bower_components/pure/pure-min.css"], dest: 'test/styles/lib/'},
          {expand: true, flatten: true, src: ["src/styles/css/pure-landingpage.css"], dest: 'test/styles'},
          {expand: true, flatten: true, src: ["src/styles/css/pure-email.css"], dest: 'test/styles'},
          {expand: true, flatten: true, src: ["src/styles/css/pure-blog.css"], dest: 'test/styles'},
          {expand: true, flatten: true, src: ["src/styles/css/pure.css"], dest: 'test/styles'},
          /*{expand: true, flatten: true, src: ["src/scripts/main.js"], dest: 'test/scripts'},
          {expand: true, flatten: true, src: ["src/scripts/plugins.js"], dest: 'test/scripts'},*/
          {expand: true, flatten: true, src: ["src/html/pure-landingpage.html"], dest: 'test/'},
          {expand: true, flatten: true, src: ["src/html/pure-email.html"], dest: 'test/'},
          {expand: true, flatten: true, src: ["src/html/pure-blog.html"], dest: 'test/'},
          {expand: true, flatten: true, src: ["src/html/pure.html"], dest: 'test/'},
          {expand: true, flatten: true, src: ["src/html/humans.txt"], dest: 'test/'},
          {expand: true, flatten: true, src: ["src/html/robots.txt"], dest: 'test/'},
          {expand: true, flatten: true, src: ["src/images/ico/bootstrap/*"], dest: 'test/images/ico/bootstrap'},
          {expand: true, flatten: true, src: ["src/images/ico/h5bp/*"], dest: 'test/images/ico/h5bp'},
          {expand: true, flatten: true, src: ["src/images/*"], dest: 'test/images/'},
          {expand: true, flatten: true, src: ["src/fonts/*"], dest: 'test/fonts/'}
        ]
      },
      dist: {
        files: [
          /*{expand: true, flatten: true, src: ["test/scripts/lib/modernizr.js"], dest: 'dist/scripts/lib/'},
          {expand: true, flatten: true, src: ["test/scripts/lib/jquery.js"], dest: 'dist/scripts/lib/'},
          {expand: true, flatten: true, src: ["test/scripts/lib/html5shiv.js"], dest: 'dist/scripts/lib/'},
          {expand: true, flatten: true, src: ["test/scripts/lib/html5shiv-printshiv.js"], dest: 'dist/scripts/lib/'},
          {expand: true, flatten: true, src: ["test/scripts/lib/react.js"], dest: 'dist/scripts/lib/'},
          {expand: true, flatten: true, src: ["test/scripts/lib/JSXTransformer.js"], dest: 'dist/scripts/lib/'},
          {expand: true, flatten: true, src: ["test/scripts/lib/d3.js"], dest: 'dist/scripts/lib/'},
          {expand: true, flatten: true, src: ["test/scripts/lib/respond.js"], dest: 'dist/scripts/lib/'},
          {expand: true, flatten: true, src: ["test/scripts/lib/bootstrap.js"], dest: 'dist/scripts/lib/'},
          {expand: true, flatten: true, src: ["test/scripts/require.js"], dest: 'dist/scripts/'},
          {expand: true, flatten: true, src: ["test/styles/lib/bootstrap-theme.css"], dest: 'dist/styles/lib/'},
          {expand: true, flatten: true, src: ["test/styles/lib/bootstrap.css"], dest: 'dist/styles/lib/'},
          {expand: true, flatten: true, src: ["test/styles/lib/normalize.css"], dest: 'dist/styles/lib/'},
          {expand: true, flatten: true, src: ["test/styles/lib/pure-min.css"], dest: 'dist/styles/lib/'},
          {expand: true, flatten: true, src: ["test/styles/pure-landingpage.css"], dest: 'dist/styles/'},
          {expand: true, flatten: true, src: ["test/styles/pure-email.css"], dest: 'dist/styles/'},
          {expand: true, flatten: true, src: ["test/styles/pure-blog.css"], dest: 'dist/styles/'},
          {expand: true, flatten: true, src: ["test/styles/pure.css"], dest: 'dist/styles/'},
          {expand: true, flatten: true, src: ["test/styles/main.css"], dest: 'dist/styles/'},
          {expand: true, flatten: true, src: ["test/pure-landingpage.html"], dest: 'dist/'},
          {expand: true, flatten: true, src: ["test/pure-email.html"], dest: 'dist/'},
          {expand: true, flatten: true, src: ["test/pure-blog.html"], dest: 'dist/'},
          {expand: true, flatten: true, src: ["test/pure.html"], dest: 'dist/'},*/
          {expand: true, flatten: true, src: ["test/crossdomain.xml"], dest: 'dist/'},
          {expand: true, flatten: true, src: ["test/humans.txt"], dest: 'dist/'},
          {expand: true, flatten: true, src: ["test/robots.txt"], dest: 'dist/'},
          {expand: true, flatten: true, src: ["test/images/ico/bootstrap/*"], dest: 'dist/images/ico/bootstrap/'},
          {expand: true, flatten: true, src: ["test/images/ico/h5bp/*"], dest: 'dist/images/ico/h5bp/'},
          {expand: true, flatten: true, src: ["test/images/ico/h5bp/apple-touch-icon-precomposed.png"], dest: 'dist/images/ico/h5bp'},
          {expand: true, flatten: true, src: ["test/images/ico/h5bp/favicon.ico"], dest: 'dist/images/ico/h5bp'},
          {expand: true, flatten: true, src: ["test/images/*"], dest: 'dist/images/'},
          {expand: true, flatten: true, src: ["test/fonts/*"], dest: 'dist/fonts/'}
        ]
      }
    },


    validation: {
        options: {
            reset: true
        },
        files: {
            src: ["_gh_pages/**/*.html"]
        }
    },


    qunit: {
      options: {
        inject: 'src/scripts/tests/unit/phantom.js'
      },
      files: ['src/scripts/tests/*.html']
    },

    
    connect: {
        test: {
            options: {
                port: 3000,
                base: './test/',
                keepalive: true
            }
        },
        dist: {
            options: {
                port: 3000,
                base: './dist/',
                keepalive: true
            }
        }
    },


    watch: {
        src: {
            files: '<%= jshint.src.src %>',
            tasks: ['jshint:src', 'qunit']
        },
        test: {
            files: '<%= jshint.test.src %>',
            tasks: ['jshint:test', 'qunit']
        },
        recess: {
            files: 'src/styles/less/*.less',
            tasks: ['recess', 'copy']
        }
    }

  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('browserstack-runner');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-html-validation');
  grunt.loadNpmTasks('grunt-recess');
  /*grunt.loadNpmTasks('grunt-contrib-requirejs'); */ /* https://npmjs.org/package/grunt-contrib-requirejs */ /* https://github.com/jrburke/r.js/blob/master/build/example.build.js */
  grunt.loadNpmTasks('grunt-jsx'); /* https://npmjs.org/package/grunt-jsx */
  /*grunt.loadNpmTasks('grunt-react');*/ /* https://npmjs.org/package/grunt-react */
  /*grunt.loadNpmTasks('grunt-usemin');*/ /* https://npmjs.org/package/grunt-usemin */
  /*grunt.loadNpmTasks('grunt-contrib-compress'); */ /* https://npmjs.org/package/grunt-contrib-compress */
  /*grunt.loadNpmTasks('grunt-contrib-imagemin'); */ /* https://npmjs.org/package/grunt-contrib-imagemin */
  /*grunt.loadNpmTasks('grunt-rename');*/  


  // Docs HTML validation task
  grunt.registerTask('validate-html', ['validation']);

  // Test task.
  var testSubtasks = ['dist-css', 'jshint', 'qunit', 'validate-html'];
  // Only run BrowserStack tests under Travis
  if (process.env.TRAVIS) {
    // Only run BrowserStack tests if this is a mainline commit in twbs/bootstrap, or you have your own BrowserStack key
    if ((process.env.TRAVIS_REPO_SLUG === 'twbs/bootstrap' && process.env.TRAVIS_PULL_REQUEST === 'false') || process.env.TWBS_HAVE_OWN_BROWSERSTACK_KEY) {
      testSubtasks.push('browserstack_runner');
    }
  }
  grunt.registerTask('test', testSubtasks);

  // Concat but don't minify html and JS files.
  grunt.registerTask('concat-all', ['concat']);

  //grunt.registerTask('dist-js', ['jsx', 'uglify']);
  grunt.registerTask('test-js', ['uglify:test']);

  // Compile less & css into single css file, distribute to ./test only
  grunt.registerTask('test-css', ['recess:test']);
  
  // Compile but don't minify html, distribute to ./test only
  grunt.registerTask('test-html', ['htmlmin:test']);

  // Copy fonts from src to ./test
  grunt.registerTask('test-copy', ['copy:test']);
  
  // Build ./test
  //grunt.registerTask('dist-test', ['clean:test', 'concat-all', 'test-css', 'test-js', 'test-html', 'test-copy']);
  grunt.registerTask('dist-test', ['concat-all', 'test-css', 'test-js', 'test-html', 'test-copy']);

  // compile and minify js, distribute to both ./test and ./dist
  //grunt.registerTask('dist-js', ['jsx', 'uglify']);
  grunt.registerTask('dist-js', ['uglify']);

  // compile and minify less & css, distribute to both ./test and ./dist
  grunt.registerTask('dist-css', ['recess']);
  
  // compile and minify html, distribute to both ./test and ./dist
  grunt.registerTask('dist-html', ['htmlmin']);

  // Copy Fonts to both ./test and ./dist
  grunt.registerTask('dist-copy', ['copy']);

  // Full distribution task, build both ./test and ./dist
  grunt.registerTask('dist', ['clean', 'concat-all', 'dist-css', 'dist-js', 'dist-html', 'dist-copy']);

  // Default task. fixme: fix tests for new workflow, eg no jekyll _gh-pages
  grunt.registerTask('default', ['test', 'dist']);

};
