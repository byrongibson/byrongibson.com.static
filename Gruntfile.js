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
        dest: 'src/scripts/lib/bootstrap.js'
      },
      html_index: {
        src: [
            'src/html/_head.html',
            'src/html/_header.html',
            'src/html/_index.html',
            'src/html/_footer.html',
            'src/html/_foot.html'
        ],
        dest: 'src/index.html'
      },
      html_error: {
        src: [
            'src/html/_head.html',
            'src/html/_header.html',
            'src/html/_error.html',
            'src/html/_footer.html',
            'src/html/_foot.html'
        ],
        dest: 'src/error.html'
      }
    },

    
    htmlmin: { 
        testDefault: { 
            options: { // Target options: https://github.com/gruntjs/grunt-contrib-htmlmin
                removeComments: false,
                collapseWhitespace: false,
                removeCommentsFromCDATA: false,
                removeCDATASectionsFromCDATA: false,
                collapseBooleanAttributes: false,
                removeAttributeQuotes: false,
                removeRedundantAttributes: false,
                useShortDoctype: false,
                removeEmptyAttributes: true,
                removeOptionalTags: false,
                removeEmptyElements: false
            },
            files: { 
                'test/default/index.html': 'src/index.html'
                ,'test/default/error.html': 'src/error.html'
            }
        },
        distDefault: { 
            options: { // Target options: https://github.com/gruntjs/grunt-contrib-htmlmin
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
            files: { 
                'dist/default/index.html': 'src/index.html' 
                ,'dist/default/error.html': 'src/error.html'
            }
        },
        testBrowserify: {
            options: { // Target options: https://github.com/gruntjs/grunt-contrib-htmlmin
                removeComments: false,
                collapseWhitespace: false,
                removeCommentsFromCDATA: false,
                removeCDATASectionsFromCDATA: false,
                collapseBooleanAttributes: false,
                removeAttributeQuotes: false,
                removeRedundantAttributes: false,
                useShortDoctype: false,
                removeEmptyAttributes: true,
                removeOptionalTags: false,
                removeEmptyElements: false
            },
            files: { 
                'test/browserify/index.html': 'src/index.html'        
                ,'test/browserify/error.html': 'src/error.html'
            }
        },
        distBrowserify: { 
            options: { // Target options: https://github.com/gruntjs/grunt-contrib-htmlmin
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
            files: {  
                'dist/browserify/index.html': 'src/index.html'        
                ,'dist/browserify/error.html': 'src/error.html'
            }
        }
    },


    recess: {
        testDefault: {
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
                'test/default/styles/lib/bootstrap.css':'src/styles/less/bootstrap.less'
                ,'test/default/styles/lib/bootstrap-theme.css':'src/styles/less/theme.less'
                ,'test/default/styles/main.css':'src/styles/less/main.less'
                ,'test/default/styles/pure.css':'src/styles/css/pure.css'
                ,'test/browserify/styles/lib/bootstrap.css':'src/styles/less/bootstrap.less'
                ,'test/browserify/styles/lib/bootstrap-theme.css':'src/styles/less/theme.less'
                ,'test/browserify/styles/main.css':'src/styles/less/main.less'
                ,'test/browserify/styles/pure.css':'src/styles/css/pure.css'
            }              
        },
        distDefault: {  
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
                'dist/default/styles/lib/bootstrap.css':'src/styles/less/bootstrap.less'
                ,'dist/default/styles/lib/bootstrap-theme.css':'src/styles/less/theme.less'
                ,'dist/default/styles/lib/normalize.css':'bower_components/html5-boilerplate/css/normalize.css'
                ,'dist/default/styles/main.css':'src/styles/less/main.less'
                ,'dist/default/styles/pure.css':'src/styles/css/pure.css'
            }
        },
        testBrowserify: {
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
                'test/browserify/styles/lib/bootstrap.css':'src/styles/less/bootstrap.less'
                ,'test/browserify/styles/lib/bootstrap-theme.css':'src/styles/less/theme.less'
                ,'test/browserify/styles/main.css':'src/styles/less/main.less'
                ,'test/browserify/styles/pure.css':'src/styles/css/pure.css'
            }              
        },
        distBrowserify: {  
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
                'dist/browserify/styles/lib/bootstrap.css':'src/styles/less/bootstrap.less'
                ,'dist/browserify/styles/lib/bootstrap-theme.css':'src/styles/less/theme.less'
                ,'dist/browserify/styles/lib/normalize.css':'bower_components/html5-boilerplate/css/normalize.css'
                ,'dist/browserify/styles/main.css':'src/styles/less/main.less'
                ,'dist/browserify/styles/pure.css':'src/styles/css/pure.css'
            }
        }

    },

    
    uglify: {
        testDefault: {
            options: {
                mangle: false
                , compress: false
                , beautify: true
                , report: false
                , sourceMap: 'test/default/scripts/source-map.js'
                , sourceMapRoot: 'src/scripts/'
                , preserveComments: true
            },
            files: {
                'test/default/scripts/lib/jquery.js':'bower_components/jquery/jquery.js'
                ,'test/default/scripts/lib/bootstrap.js':'<%= concat.bootstrap.dest %>'
                ,'test/default/scripts/lib/modernizr.js':'bower_components/modernizr/modernizr.js'
                ,'test/default/scripts/lib/html5shiv.js':'bower_components/html5shiv/dist/html5shiv.js'
                ,'test/default/scripts/lib/html5shiv-printshiv.js':'bower_components/html5shiv/dist/html5shiv-printshiv.js'
                ,'test/default/scripts/lib/JSXTransformer.js':'bower_components/react/JSXTransformer.js'
                ,'test/default/scripts/lib/react.js':'bower_components/react/react.js'
                ,'test/default/scripts/lib/d3.js':'bower_components/d3/d3.js'
                ,'test/default/scripts/require.js':'bower_components/requirejs/require.js'
                ,'test/default/scripts/main.js':'src/scripts/main.js'
                ,'test/default/scripts/plugins.js':'src/scripts/plugins.js'
            }
        },
        distDefault: {
            options: {
                mangle: false //(only main.js, plugins.js)
                , compress: true
                , beautify: false
                , report: 'min'
                , sourceMap: 'dist/default/scripts/source-map.js'
                , sourceMapRoot: 'src/scripts/'
                , preserveComments: false
            },
            files: {
                'dist/default/scripts/lib/jquery.js':'bower_components/jquery/jquery.js'
                ,'dist/default/scripts/lib/bootstrap.js':'<%= concat.bootstrap.dest %>'
                ,'dist/default/scripts/lib/modernizr.js':'bower_components/modernizr/modernizr.js'
                ,'dist/default/scripts/lib/html5shiv.js':'bower_components/html5shiv/dist/html5shiv.js'
                ,'dist/default/scripts/lib/html5shiv-printshiv.js':'bower_components/html5shiv/dist/html5shiv-printshiv.js'
                ,'dist/default/scripts/lib/JSXTransformer.js':'bower_components/react/JSXTransformer.js'
                ,'dist/default/scripts/lib/react.js':'bower_components/react/react.js'
                ,'dist/default/scripts/lib/d3.js':'bower_components/d3/d3.js'
                ,'dist/default/scripts/require.js':'bower_components/requirejs/require.js'
                ,'dist/default/scripts/main.js':'src/scripts/main.js'
                ,'dist/default/scripts/plugins.js':'src/scripts/plugins.js'
            }
        },
        gzipDefault: {
            options: {
                mangle: false //(only main.js, plugins.js)
                , compress: true
                , beautify: true
                , report: 'gzip'
                , sourceMap: 'dist/default/scripts/source-map.js'
                , sourceMapRoot: 'src/scripts/'
                , preserveComments: false
            },
            files: {
                'dist/default/scripts/lib/jquery.js':'bower_components/jquery/jquery.js'
                ,'dist/default/scripts/lib/bootstrap.js':'<%= concat.bootstrap.dest %>'
                ,'dist/default/scripts/lib/modernizr.js':'bower_components/modernizr/modernizr.js'
                ,'dist/default/scripts/lib/html5shiv.js':'bower_components/html5shiv/dist/html5shiv.js'
                ,'dist/default/scripts/lib/html5shiv-printshiv.js':'bower_components/html5shiv/dist/html5shiv-printshiv.js'
                ,'dist/default/scripts/lib/JSXTransformer.js':'bower_components/react/JSXTransformer.js'
                ,'dist/default/scripts/lib/react.js':'bower_components/react/react.js'
                ,'dist/default/scripts/lib/d3.js':'bower_components/d3/d3.js'
                ,'dist/default/scripts/require.js':'bower_components/requirejs/require.js'
                ,'dist/default/scripts/main.js':'src/scripts/main.js'
                ,'dist/default/scripts/plugins.js':'src/scripts/plugins.js'
            }
        }
    },

    
    jsx: {
        client: {
            src: 'src/scripts/main.jsx',
            dest: 'src/scripts/main.js'
        }
    }, 

    browserify: {
      dist: {
        files: {
          'build/module.js': ['src/scripts/**/*.js']
        }
      }
    },

    copy: {
      test: {
        files: [
          {expand: true, flatten: true, src: ["bower_components/html5-boilerplate/crossdomain.xml"], dest: 'test/default/'},
          {expand: true, flatten: true, src: ["bower_components/html5-boilerplate/apple-touch-icon-precomposed.png"], dest: 'src/images/ico/h5bp/'},
          {expand: true, flatten: true, src: ["bower_components/html5-boilerplate/favicon.ico"], dest: 'src/images/ico/h5bp/'},
          {expand: true, flatten: true, src: ["bower_components/bootstrap/docs-assets/ico/*"], dest: 'src/images/ico/bootstrap/'},
          {expand: true, flatten: true, src: ["bower_components/pure/pure-min.css"], dest: 'test/default/styles/lib/'},
          {expand: true, flatten: true, src: ["src/styles/css/pure-landingpage.css"], dest: 'test/default/styles'},
          {expand: true, flatten: true, src: ["src/styles/css/pure-email.css"], dest: 'test/default/styles'},
          {expand: true, flatten: true, src: ["src/styles/css/pure-blog.css"], dest: 'test/default/styles'},
          {expand: true, flatten: true, src: ["src/styles/css/pure.css"], dest: 'test/default/styles'},
          /*{expand: true, flatten: true, src: ["src/scripts/main.js"], dest: 'test/default/scripts'},
          {expand: true, flatten: true, src: ["src/scripts/plugins.js"], dest: 'test/default/scripts'},*/
          {expand: true, flatten: true, src: ["src/html/pure-landingpage.html"], dest: 'test/default/'},
          {expand: true, flatten: true, src: ["src/html/pure-email.html"], dest: 'test/default/'},
          {expand: true, flatten: true, src: ["src/html/pure-blog.html"], dest: 'test/default/'},
          {expand: true, flatten: true, src: ["src/html/pure.html"], dest: 'test/default/'},
          {expand: true, flatten: true, src: ["src/html/humans.txt"], dest: 'test/default/'},
          {expand: true, flatten: true, src: ["src/html/robots.txt"], dest: 'test/default/'},
          {expand: true, flatten: true, src: ["src/images/ico/bootstrap/*"], dest: 'test/default/images/ico/bootstrap'},
          {expand: true, flatten: true, src: ["src/images/ico/h5bp/*"], dest: 'test/default/images/ico/h5bp'},
          {expand: true, flatten: true, src: ["src/images/*"], dest: 'test/default/images/'},
          {expand: true, flatten: true, src: ["src/fonts/*"], dest: 'test/default/fonts/'}
        ]
      },
      dist: {
        files: [
          /*{expand: true, flatten: true, src: ["test/default/scripts/lib/modernizr.js"], dest: 'dist/default/scripts/lib/'},
          {expand: true, flatten: true, src: ["test/default/scripts/lib/jquery.js"], dest: 'dist/default/scripts/lib/'},
          {expand: true, flatten: true, src: ["test/default/scripts/lib/html5shiv.js"], dest: 'dist/default/scripts/lib/'},
          {expand: true, flatten: true, src: ["test/default/scripts/lib/html5shiv-printshiv.js"], dest: 'dist/default/scripts/lib/'},
          {expand: true, flatten: true, src: ["test/default/scripts/lib/react.js"], dest: 'dist/default/scripts/lib/'},
          {expand: true, flatten: true, src: ["test/default/scripts/lib/JSXTransformer.js"], dest: 'dist/default/scripts/lib/'},
          {expand: true, flatten: true, src: ["test/default/scripts/lib/d3.js"], dest: 'dist/default/scripts/lib/'},
          {expand: true, flatten: true, src: ["test/default/scripts/lib/respond.js"], dest: 'dist/default/scripts/lib/'},
          {expand: true, flatten: true, src: ["test/default/scripts/lib/bootstrap.js"], dest: 'dist/default/scripts/lib/'},
          {expand: true, flatten: true, src: ["test/default/scripts/require.js"], dest: 'dist/default/scripts/'},
          {expand: true, flatten: true, src: ["test/default/styles/lib/bootstrap-theme.css"], dest: 'dist/default/styles/lib/'},
          {expand: true, flatten: true, src: ["test/default/styles/lib/bootstrap.css"], dest: 'dist/default/styles/lib/'},
          {expand: true, flatten: true, src: ["test/default/styles/lib/normalize.css"], dest: 'dist/default/styles/lib/'},
          {expand: true, flatten: true, src: ["test/default/styles/lib/pure-min.css"], dest: 'dist/default/styles/lib/'},
          {expand: true, flatten: true, src: ["test/default/styles/pure-landingpage.css"], dest: 'dist/default/styles/'},
          {expand: true, flatten: true, src: ["test/default/styles/pure-email.css"], dest: 'dist/default/styles/'},
          {expand: true, flatten: true, src: ["test/default/styles/pure-blog.css"], dest: 'dist/default/styles/'},
          {expand: true, flatten: true, src: ["test/default/styles/pure.css"], dest: 'dist/default/styles/'},
          {expand: true, flatten: true, src: ["test/default/styles/main.css"], dest: 'dist/default/styles/'},
          {expand: true, flatten: true, src: ["test/default/pure-landingpage.html"], dest: 'dist/default/'},
          {expand: true, flatten: true, src: ["test/default/pure-email.html"], dest: 'dist/default/'},
          {expand: true, flatten: true, src: ["test/default/pure-blog.html"], dest: 'dist/default/'},
          {expand: true, flatten: true, src: ["test/default/pure.html"], dest: 'dist/default/'},*/
          {expand: true, flatten: true, src: ["test/default/crossdomain.xml"], dest: 'dist/default/'},
          {expand: true, flatten: true, src: ["test/default/humans.txt"], dest: 'dist/default/'},
          {expand: true, flatten: true, src: ["test/default/robots.txt"], dest: 'dist/default/'},
          {expand: true, flatten: true, src: ["test/default/images/ico/bootstrap/*"], dest: 'dist/default/images/ico/bootstrap/'},
          {expand: true, flatten: true, src: ["test/default/images/ico/h5bp/*"], dest: 'dist/default/images/ico/h5bp/'},
          {expand: true, flatten: true, src: ["test/default/images/ico/h5bp/apple-touch-icon-precomposed.png"], dest: 'dist/default/images/ico/h5bp'},
          {expand: true, flatten: true, src: ["test/default/images/ico/h5bp/favicon.ico"], dest: 'dist/default/images/ico/h5bp'},
          {expand: true, flatten: true, src: ["test/default/images/*"], dest: 'dist/default/images/'},
          {expand: true, flatten: true, src: ["test/default/fonts/*"], dest: 'dist/default/fonts/'}
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
                port: 3001,
                base: './test/default/',
                keepalive: true
            }
        },
        dist: {
            options: {
                port: 3000,
                base: './dist/default/',
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
  /*grunt.loadNpmTasks('grunt-contrib-mincss');*/ /* https://npmjs.org/package/grunt-contrib-mincss */
  /*grunt.loadNpmTasks('grunt-contrib-compress'); */ /* https://npmjs.org/package/grunt-contrib-compress */
  /*grunt.loadNpmTasks('grunt-contrib-imagemin'); */ /* https://npmjs.org/package/grunt-contrib-imagemin */
  /*grunt.loadNpmTasks('grunt-contrib-requirejs'); */ /* https://npmjs.org/package/grunt-contrib-requirejs */ /* https://github.com/jrburke/r.js/blob/master/build/example.build.js */
  /*grunt.loadNpmTasks('grunt-usemin');*/ /* https://npmjs.org/package/grunt-usemin */
  grunt.loadNpmTasks('grunt-html-validation');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-recess');
  grunt.loadNpmTasks('grunt-react'); /* https://npmjs.org/package/grunt-react */
  grunt.loadNpmTasks('grunt-jsx'); /* https://npmjs.org/package/grunt-jsx */

  // Docs HTML validation task
  grunt.registerTask('validate-html', ['validation']);

  // Test task.
  var testSubtasks = ['dist-styles', 'jshint', 'qunit', 'validate-html'];
  // Only run BrowserStack tests under Travis
  if (process.env.TRAVIS) {
    // Only run BrowserStack tests if this is a mainline commit in twbs/bootstrap, or you have your own BrowserStack key
    if ((process.env.TRAVIS_REPO_SLUG === 'twbs/bootstrap' && process.env.TRAVIS_PULL_REQUEST === 'false') || process.env.TWBS_HAVE_OWN_BROWSERSTACK_KEY) {
      testSubtasks.push('browserstack_runner');
    }
  }
  grunt.registerTask('test', testSubtasks);

  // Concat but don't minify html and JS files.
  grunt.registerTask('concat-scripts', ['concat:bootstrap']);

  // Concat but don't minify html and JS files.
  grunt.registerTask('concat-html', ['concat:html_index','concat:html_error']);

  // Concat but don't minify html and JS files.
  grunt.registerTask('concat-all', ['concat']);

  /***** Compile HTML *****/

  // Compile but don't minify html, distribute to ./test only
  grunt.registerTask('test-html', ['concat-html','htmlmin:testDefault']);

  // compile and minify html, distribute to both ./test and ./dist
  grunt.registerTask('dist-html', ['concat-html','htmlmin:testDefault', 'htmlmin:distDefault']);

  /***** Compile CSS *****/

  // Compile less & css into single css file, distribute to ./test only
  grunt.registerTask('test-styles', ['recess:testDefault']);
  
  // compile and minify less & css, distribute to both ./test and ./dist
  grunt.registerTask('dist-styles', ['recess:testDefault', 'recess:distDefault']);
 
  /***** Compile Scripts *****/

  // don't compile or minify, just beautify and copy to ./test
  grunt.registerTask('test-scripts', ['concat-scripts','uglify:testDefault']);

  // compile and minify js, distribute to both ./test and ./dist
  grunt.registerTask('dist-scripts', ['concat-scripts','uglify:testDefault','uglify:distDefault']);

  // compile and minify js, distribute to both ./test and ./dist
  grunt.registerTask('gzip-scripts', ['concat-scripts','uglify:testDefault','uglify:gzipDefault']);

  /***** Browserify Scripts *****/

  // alternative to Compiling Scripts with uglify
  
  grunt.registerTask('test-browserify', []);
  grunt.registerTask('dist-browserify', []);
  grunt.registerTask('gzip-browserify', []);

  /***** Copy Assets Default *****/

  // Copy fonts from src to ./test
  grunt.registerTask('test-copy', ['copy:test']);
  
  // Copy Fonts to both ./test and ./dist
  grunt.registerTask('dist-copy', ['copy']);

  /***** Copy Assets Default *****/

  // Copy fonts from src to ./test
  grunt.registerTask('test-copy', ['copy:test']);
  
  // Copy Fonts to both ./test and ./dist
  grunt.registerTask('dist-copy', ['copy']);

  /***** Build Default *****/

  // Test build; builds ./test 
  grunt.registerTask('test-default', ['concat-all', 'test-styles', 'test-scripts', 'test-html', 'test-copy']);

  // Full build: builds both ./test and ./dist
  grunt.registerTask('dist-default', ['clean', 'concat-all', 'dist-styles', 'dist-scripts', 'dist-html', 'dist-copy']);

  // Optimized build: build ./test and ./dist, gzip ./dist js.
  grunt.registerTask('gzip-default', ['clean', 'concat-all', 'dist-styles', 'gzip-scripts', 'dist-html', 'dist-copy']);

  // Default task. fixme: fix tests for new workflow, eg no jekyll _gh-pages
  grunt.registerTask('default', ['test', 'dist']);

  /***** Build Browserify *****/

  // Test build; builds ./test 
  grunt.registerTask('test-browserify', ['concat-all', 'test-styles', 'test-scripts', 'test-html', 'test-copy']);

  // Full build: builds both ./test and ./dist
  grunt.registerTask('dist-browserify', ['clean', 'concat-all', 'dist-styles', 'dist-scripts', 'dist-html', 'dist-copy']);

  // Optimized build: build ./test and ./dist, gzip ./dist js.
  grunt.registerTask('gzip-browserify', ['clean', 'concat-all', 'dist-styles', 'gzip-scripts', 'dist-html', 'dist-copy']);

  // Default task. fixme: fix tests for new workflow, eg no jekyll _gh-pages
  grunt.registerTask('default', ['test', 'dist']);

};
