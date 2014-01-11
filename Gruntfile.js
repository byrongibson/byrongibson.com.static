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
      ,testBrowserify: ['build/test']
      ,distBrowserify: ['build/dist']
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
          'bower_components/js/transition.js'
          ,'bower_components/js/alert.js'
          ,'bower_components/js/button.js'
          ,'bower_components/js/carousel.js'
          ,'bower_components/js/collapse.js'
          ,'bower_components/js/dropdown.js'
          ,'bower_components/js/modal.js'
          ,'bower_components/js/tooltip.js'
          ,'bower_components/js/popover.js'
          ,'bower_components/js/scrollspy.js'
          ,'bower_components/js/tab.js'
          ,'bower_components/js/affix.js'
        ],
        dest: 'src/scripts/lib/bootstrap.js'
      },
      html_index: {
        src: [
          'src/html/_head.html'
          ,'src/html/_header.html'
          ,'src/html/_index.html'
          ,'src/html/_footer.html'
          ,'src/html/_foot.html'
        ],
        dest: 'src/index.html'
      },
      html_error: {
        src: [
          'src/html/_head.html'
          ,'src/html/_header.html'
          ,'src/html/_error.html'
          ,'src/html/_footer.html'
          ,'src/html/_foot.html'
        ],
        dest: 'src/error.html'
      }
    },

    
    htmlmin: { 
      testDefault: { 
        options: { // Target options: https://github.com/gruntjs/grunt-contrib-htmlmin
          removeComments: false
          ,collapseWhitespace: false
          ,removeCommentsFromCDATA: false
          ,removeCDATASectionsFromCDATA: false
          ,collapseBooleanAttributes: false
          ,removeAttributeQuotes: false
          ,removeRedundantAttributes: false
          ,useShortDoctype: false
          ,removeEmptyAttributes: true
          ,removeOptionalTags: false
          ,removeEmptyElements: false
        },
        files: { 
          'test/index.html': 'src/index.html'
          ,'test/error.html': 'src/error.html'
        }
      },
      distDefault: { 
        options: { // Target options: https://github.com/gruntjs/grunt-contrib-htmlmin
          removeComments: true
          ,collapseWhitespace: true
          ,removeCommentsFromCDATA: true
          ,removeCDATASectionsFromCDATA: false
          ,collapseBooleanAttributes: false
          ,removeAttributeQuotes: false
          ,removeRedundantAttributes: false
          ,useShortDoctype: false
          ,removeEmptyAttributes: true
          ,removeOptionalTags: false
          ,removeEmptyElements: false
        },
        files: { 
          'dist/index.html': 'src/index.html' 
          ,'dist/error.html': 'src/error.html'
        }
      },
      testBrowserifyDefault: {
        options: { // Target options: https://github.com/gruntjs/grunt-contrib-htmlmin
          removeComments: false
          ,collapseWhitespace: false
          ,removeCommentsFromCDATA: false
          ,removeCDATASectionsFromCDATA: false
          ,collapseBooleanAttributes: false
          ,removeAttributeQuotes: false
          ,removeRedundantAttributes: false
          ,useShortDoctype: false
          ,removeEmptyAttributes: true
          ,removeOptionalTags: false
          ,removeEmptyElements: false
        },
        files: { 
          'build/test/index.html': 'src/index.html'        
          ,'build/test/error.html': 'src/error.html'
        }
      },
      distBrowserifyDefault: { 
        options: { // Target options: https://github.com/gruntjs/grunt-contrib-htmlmin
          removeComments: true
          ,collapseWhitespace: true
          ,removeCommentsFromCDATA: true
          ,removeCDATASectionsFromCDATA: false
          ,collapseBooleanAttributes: false
          ,removeAttributeQuotes: false
          ,removeRedundantAttributes: false
          ,useShortDoctype: false
          ,removeEmptyAttributes: true
          ,removeOptionalTags: false
          ,removeEmptyElements: false
        },
        files: {  
          'build/dist/index.html': 'src/index.html'        
          ,'build/dist/error.html': 'src/error.html'
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
          'test/styles/lib/bootstrap.css':'src/styles/less/bootstrap.less'
          ,'test/styles/lib/bootstrap-theme.css':'src/styles/less/theme.less'
          ,'test/styles/main.css':'src/styles/less/main.less'
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
          'dist/styles/lib/bootstrap.css':'src/styles/less/bootstrap.less'
          ,'dist/styles/lib/bootstrap-theme.css':'src/styles/less/theme.less'
          ,'dist/styles/lib/normalize.css':'bower_components/html5-boilerplate/css/normalize.css'
          ,'dist/styles/main.css':'src/styles/less/main.less'
        }
      },
      testBrowserifyDefault: {
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
          'build/test/styles/lib/bootstrap.css':'src/styles/less/bootstrap.less'
          ,'build/test/styles/lib/bootstrap-theme.css':'src/styles/less/theme.less'
          ,'build/test/styles/main.css':'src/styles/less/main.less'
        }              
      },
      distBrowserifyDefault: {  
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
          'build/dist/styles/lib/bootstrap.css':'src/styles/less/bootstrap.less'
          ,'build/dist/styles/lib/bootstrap-theme.css':'src/styles/less/theme.less'
          ,'build/dist/styles/lib/normalize.css':'bower_components/html5-boilerplate/css/normalize.css'
          ,'build/dist/styles/main.css':'src/styles/less/main.less'
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
          'test/scripts/lib/jquery.js':'bower_components/jquery/jquery.js'
          ,'test/scripts/lib/bootstrap.js':'<%= concat.bootstrap.dest %>'
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
          'dist/scripts/lib/jquery.js':'bower_components/jquery/jquery.js'
          ,'dist/scripts/lib/bootstrap.js':'<%= concat.bootstrap.dest %>'
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
          'dist/scripts/lib/jquery.js':'bower_components/jquery/jquery.js'
          ,'dist/scripts/lib/bootstrap.js':'<%= concat.bootstrap.dest %>'
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
      testBrowserifyDefault: {
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
          'build/test/scripts/lib/jquery.js':'bower_components/jquery/jquery.js'
          ,'build/test/scripts/lib/bootstrap.js':'<%= concat.bootstrap.dest %>'
          ,'build/test/scripts/lib/modernizr.js':'bower_components/modernizr/modernizr.js'
          ,'build/test/scripts/lib/html5shiv.js':'bower_components/html5shiv/dist/html5shiv.js'
          ,'build/test/scripts/lib/html5shiv-printshiv.js':'bower_components/html5shiv/dist/html5shiv-printshiv.js'
          ,'build/test/scripts/lib/JSXTransformer.js':'bower_components/react/JSXTransformer.js'
          ,'build/test/scripts/lib/react.js':'bower_components/react/react.js'
          ,'build/test/scripts/lib/d3.js':'bower_components/d3/d3.js'
          ,'build/test/scripts/main.js':'src/scripts/main.js'
          ,'build/test/scripts/plugins.js':'src/scripts/plugins.js'
        }
      },
      distBrowserifyDefault: {
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
          'build/dist/scripts/lib/jquery.js':'bower_components/jquery/jquery.js'
          ,'build/dist/scripts/lib/bootstrap.js':'<%= concat.bootstrap.dest %>'
          ,'build/dist/scripts/lib/modernizr.js':'bower_components/modernizr/modernizr.js'
          ,'build/dist/scripts/lib/html5shiv.js':'bower_components/html5shiv/dist/html5shiv.js'
          ,'build/dist/scripts/lib/html5shiv-printshiv.js':'bower_components/html5shiv/dist/html5shiv-printshiv.js'
          ,'build/dist/scripts/lib/JSXTransformer.js':'bower_components/react/JSXTransformer.js'
          ,'build/dist/scripts/lib/react.js':'bower_components/react/react.js'
          ,'build/dist/scripts/lib/d3.js':'bower_components/d3/d3.js'
          ,'build/dist/scripts/main.js':'src/scripts/main.js'
          ,'build/dist/scripts/plugins.js':'src/scripts/plugins.js'
        }
      },
      gzipBrowserifyDefault: {
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
          'build/dist/scripts/lib/jquery.js':'bower_components/jquery/jquery.js'
          ,'build/dist/scripts/lib/bootstrap.js':'<%= concat.bootstrap.dest %>'
          ,'build/dist/scripts/lib/modernizr.js':'bower_components/modernizr/modernizr.js'
          ,'build/dist/scripts/lib/html5shiv.js':'bower_components/html5shiv/dist/html5shiv.js'
          ,'build/dist/scripts/lib/html5shiv-printshiv.js':'bower_components/html5shiv/dist/html5shiv-printshiv.js'
          ,'build/dist/scripts/lib/JSXTransformer.js':'bower_components/react/JSXTransformer.js'
          ,'build/dist/scripts/lib/react.js':'bower_components/react/react.js'
          ,'build/dist/scripts/lib/d3.js':'bower_components/d3/d3.js'
          ,'build/dist/scripts/main.js':'src/scripts/main.js'
          ,'build/dist/scripts/plugins.js':'src/scripts/plugins.js'
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
      test: {
        options: {
          /*ignore: modernizr.js,html5shiv.js,html5printshiv.js,JSXTransformer.js
          noParse: []  // better to shim libraries that don't need to be parsed for require() statement than to use noParse
          ,alias: [] 
          ,aliasMappings: []
          ,external: []
          ,transform: []
          debug: true // enable source map support
          ,shim: 
          ,postBundleCB: */
        },
        files: {
          'build/test/scripts/module.js': [
            'bower_components/jquery/jquery.js'
            ,'<%= concat.bootstrap.dest %>'
            /*,'bower_components/d3/d3.js'*/
            /*,'bower_components/html5shiv/dist/html5shiv.js'
            ,'bower_components/html5shiv/dist/html5shiv-printshiv.js'*/
            ,'bower_components/react/react.js'
            ,'bower_components/react/JSXTransformer.js'
            ,'src/scripts/main.js'
            /*,'src/scripts/plugins.js'*/
          ]
        }
      },
      dist: {
        options: {
          /*ignore:
          noParse: []  // better to shim libraries that don't need to be parsed for require() statement than to use noParse
          ,alias: [] 
          ,aliasMappings: []
          ,external: []
          ,transform: []
          debug: false // enable source map support
          ,shim: 
          ,postBundleCB: */
        },
        files: {
          'build/dist/scripts/module.js': ['src/scripts/**/*.js']
        }
      }
    },


    copy: {
      common: {
        files: [
          {expand: true, flatten: true, src: ["bower_components/html5-boilerplate/crossdomain.xml"], dest: 'src/misc'}
          ,{expand: true, flatten: true, src: ["bower_components/html5-boilerplate/humans.txt"], dest: 'src/misc'}
          ,{expand: true, flatten: true, src: ["bower_components/html5-boilerplate/robots.txt"], dest: 'src/misc'}
          ,{expand: true, flatten: true, src: ["bower_components/html5-boilerplate/apple-touch-icon-precomposed.png"], dest: 'src/images/ico/h5bp/'}
          ,{expand: true, flatten: true, src: ["bower_components/html5-boilerplate/favicon.ico"], dest: 'src/images/ico/h5bp/'}
          ,{expand: true, flatten: true, src: ["bower_components/bootstrap/docs-assets/ico/*"], dest: 'src/images/ico/bootstrap/'}
        ]
      },
      test: {
        files: [
          {expand: true, flatten: true, src: ["src/images/ico/bootstrap/*"], dest: 'test/images/ico/bootstrap/'}
          ,{expand: true, flatten: true, src: ["src/images/ico/h5bp/*"], dest: 'test/images/ico/h5bp/'}
          ,{expand: true, flatten: true, src: ["src/images/*"], dest: 'test/images/'}
          ,{expand: true, flatten: true, src: ["src/fonts/*"], dest: 'test/fonts/'}
          ,{expand: true, flatten: true, src: ["src/crossdomain.xml"], dest: 'test/'}
          ,{expand: true, flatten: true, src: ["src/sitemap.xml"], dest: 'test/'}
          ,{expand: true, flatten: true, src: ["src/humans.txt"], dest: 'test/'}
          ,{expand: true, flatten: true, src: ["src/robots.txt"], dest: 'test/'}
        ]
      },
      dist: {
        files: [
          {expand: true, flatten: true, src: ["src/images/ico/bootstrap/*"], dest: 'dist/images/ico/bootstrap/'}
          ,{expand: true, flatten: true, src: ["src/images/ico/h5bp/*"], dest: 'dist/images/ico/h5bp/'}
          ,{expand: true, flatten: true, src: ["src/images/*"], dest: 'dist/images/'}
          ,{expand: true, flatten: true, src: ["src/crossdomain.xml"], dest: 'dist/'}
          ,{expand: true, flatten: true, src: ["src/sitemap.xml"], dest: 'dist/'}
          ,{expand: true, flatten: true, src: ["src/humans.txt"], dest: 'dist/'}
          ,{expand: true, flatten: true, src: ["src/robots.txt"], dest: 'dist/'}
          ,{expand: true, flatten: true, src: ["src/fonts/*"], dest: 'dist/fonts/'}
        ]
      },
      testBrowserify: {
        files: [
          {expand: true, flatten: true, src: ["src/images/ico/bootstrap/*"], dest: 'build/test/images/ico/bootstrap/'}
          ,{expand: true, flatten: true, src: ["src/images/ico/h5bp/*"], dest: 'build/test/images/ico/h5bp/'}
          ,{expand: true, flatten: true, src: ["src/images/*"], dest: 'build/test/images/'}
          ,{expand: true, flatten: true, src: ["src/fonts/*"], dest: 'build/test/fonts/'}
          ,{expand: true, flatten: true, src: ["src/crossdomain.xml"], dest: 'build/test/'}
          ,{expand: true, flatten: true, src: ["src/sitemap.xml"], dest: 'build/test/'}
          ,{expand: true, flatten: true, src: ["src/humans.txt"], dest: 'build/test/'}
          ,{expand: true, flatten: true, src: ["src/robots.txt"], dest: 'build/test/'}
        ]
      },
      distBrowserify: {
        files: [
          {expand: true, flatten: true, src: ["src/images/ico/bootstrap/*"], dest: 'build/dist/images/ico/bootstrap/'}
          ,{expand: true, flatten: true, src: ["src/images/ico/h5bp/*"], dest: 'build/dist/images/ico/h5bp/'}
          ,{expand: true, flatten: true, src: ["src/images/*"], dest: 'build/dist/images/'}
          ,{expand: true, flatten: true, src: ["src/fonts/*"], dest: 'build/dist/fonts/'}
          ,{expand: true, flatten: true, src: ["src/crossdomain.xml"], dest: 'build/dist/'}
          ,{expand: true, flatten: true, src: ["src/sitemap.xml"], dest: 'build/dist/'}
          ,{expand: true, flatten: true, src: ["src/humans.txt"], dest: 'build/dist/'}
          ,{expand: true, flatten: true, src: ["src/robots.txt"], dest: 'build/dist/'}
        ]
      }
    },


    /* TODO: Convert from bootstrap blog validation to byrongibson.com page validation */
    validation: {
      options: {
        reset: true
      },
      files: {
        src: ["_gh_pages/**/*.html"]
      }
    },

    
    /* TODO: Convert to byrongibson.com custom js tests */
    qunit: {
      options: {
        inject: 'src/scripts/tests/unit/phantom.js'
      },
      files: ['src/scripts/tests/*.html']
    },

    
    connect: {
      test: {
        options: {
          port: 3001
          ,base: './test/default/'
          ,keepalive: true
        }
      },
      dist: {
        options: {
          port: 3000
          ,base: './dist/default/'
          ,keepalive: true
        }
      },
      testBrowserify: {
        options: {
          port: 3001
          ,base: './build/test/'
          ,keepalive: true
        }
      },
      distBrowserify: {
        options: {
          port: 3000
          ,base: '.build/dist/'
          ,keepalive: true
        }
      }
    },


    /* TODO: Obsolete, update to work with new build process, integrate with browser plugins */
    watch: {
      src: {
        files: '<%= jshint.src.src %>'
        ,tasks: ['jshint:src', 'qunit']
      },
      test: {
        files: '<%= jshint.test.src %>'
        ,tasks: ['jshint:test', 'qunit']
      },
      recess: {
        files: 'src/styles/less/*.less'
        ,tasks: ['recess', 'copy']
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
  grunt.registerTask('concat-bootstrap', ['concat:bootstrap']);

  // Concat but don't minify html and JS files.
  grunt.registerTask('concat-html', ['concat:html_index','concat:html_error']);

  // Concat but don't minify html and JS files.
  grunt.registerTask('concat-all', ['concat']);

  /***** Compile HTML *****/

  // Compile but don't minify html, distribute to ./test only
  grunt.registerTask('test-html', ['concat-html','htmlmin:testDefault']);
  // compile and minify html, distribute to both ./test and ./dist
  grunt.registerTask('dist-html', ['concat-html','htmlmin:distDefault']);
  
  // Compile but don't minify html, distribute to ./test only
  grunt.registerTask('test-html-browserify', ['concat-html','htmlmin:testBrowserifyDefault']);
  // compile and minify html, distribute to both ./test and ./dist
  grunt.registerTask('dist-html-browserify', ['concat-html','htmlmin:distBrowserifyDefault']);

  /***** Compile CSS *****/

  // Compile less & css into single css file, distribute to ./test only
  grunt.registerTask('test-styles', ['recess:testDefault']);
  // compile and minify less & css, distribute to both ./test and ./dist
  grunt.registerTask('dist-styles', ['recess:distDefault']);
 
  // Compile less & css into single css file, distribute to ./test only
  grunt.registerTask('test-styles-browserify', ['recess:testBrowserifyDefault']);
  // compile and minify less & css, distribute to both ./test and ./dist
  grunt.registerTask('dist-styles-browserify', ['recess:distBrowserifyDefault']);
 
  /***** Uglify Scripts *****/

  // don't compile or minify, just beautify and copy to ./test
  grunt.registerTask('test-scripts', ['concat:bootstrap','uglify:testDefault']);
  // compile and minify js, distribute to both ./test and ./dist
  grunt.registerTask('dist-scripts', ['concat:bootstrap','uglify:distDefault']);
  // compile and minify js, distribute to both ./test and ./dist
  grunt.registerTask('gzip-scripts', ['concat:bootstrap','uglify:gzipDefault']);

  /***** Browserify Scripts *****/
  
  // don't compile or minify, just beautify and copy to ./test
  grunt.registerTask('test-scripts-browserify', ['concat:bootstrap','browserify:test']);
  // compile and minify js, distribute to both ./test and ./dist
  grunt.registerTask('dist-scripts-browserify', ['concat:bootstrap','browserify:dist']);
  // compile and minify js, distribute to both ./test and ./dist
  /*grunt.registerTask('gzip-scripts-browserify', ['concat:bootstrap','uglify:gzipBrowserifyDefault']);*/

  /***** Copy Other Assets *****/

  // Copy html/fonts/images from src to ./test
  grunt.registerTask('test-copy', ['copy:common','copy:test']);
  // Copy html/fonts/images from src to ./dist
  grunt.registerTask('dist-copy', ['copy:common','copy:dist']);

  /***** Build Default *****/

  // Test build; builds ./test 
  grunt.registerTask('test-default', ['clean:test', 'test-styles', 'test-scripts', 'test-html', 'test-copy']);
  // Full build: builds both ./test and ./dist
  grunt.registerTask('dist-default', ['clean:dist', 'dist-styles', 'dist-scripts', 'dist-html', 'dist-copy']);
  // Optimized build: build ./test and ./dist, gzip ./dist js.
  grunt.registerTask('gzip-default', ['clean:dist', 'dist-styles', 'gzip-scripts', 'dist-html', 'dist-copy']);

  /***** Build Browserify *****/

  // Test build; builds ./test 
  grunt.registerTask('test-browserify', ['clean:testBrowserify', 'test-styles-browserify', 'test-scripts-browserify', 'test-html-browserify', 'copy:common', 'copy:testBrowserify']);
  // Full build: builds both ./test and ./dist
  grunt.registerTask('dist-browserify', ['clean:distBrowserify', 'dist-styles-browserify', 'dist-scripts-browserify', 'dist-html-browserify', 'copy:common', 'copy:distBrowserify']);
  // Optimized build: build ./test and ./dist, gzip ./dist js.
  grunt.registerTask('gzip-browserify', ['clean:distBrowserify', 'dist-styles-browserify', 'gzip-scripts-browserify', 'dist-html-browserify', 'copy:src', 'copy:distBrowserify']);

};
