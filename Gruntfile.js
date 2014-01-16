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
      build: ['build']
      ,test: ['test']
      ,dist: ['dist']
    }

    ,jshint: {
      options: {
        jshintrc: 'src/scripts/.jshintrc'
      }
      ,gruntfile: {
        src: 'Gruntfile.js'
      }
      ,src: {
        src: ['src/scripts/*.js']
      }
      ,test: {
        src: ['src/scripts/tests/unit/*.js']
      }
    ,


    ,concat: {
      options: {
        stripBanners: true
      }
      ,bootstrap: {
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
        ]
        ,dest: 'build/scripts/lib/bootstrap.js'
      }
      ,html_index: {
        src: [
          'src/html/partials/_head.html'
          ,'src/html/partials/_header.html'
          ,'src/html/partials/_index.html'
          ,'src/html/partials/_footer.html'
          ,'src/html/partials/_foot.html'
        ]
        ,dest: 'build/index.html'
      }
      ,html_error: {
        src: [
          'src/html/partials/_head.html'
          ,'src/html/partials/_header.html'
          ,'src/html/partials/_error.html'
          ,'src/html/partials/_footer.html'
          ,'src/html/partials/_foot.html'
        ]
        ,dest: 'build/error.html'
      }
      ,lab_index: {
        src: [
          'src/html/partials/_head.html'
          ,'src/html/partials/_header.html'
          ,'src/html/partials/lab/_index.html'
          ,'src/html/partials/_footer.html'
          ,'src/html/partials/_foot.html'
        ]
        ,dest: 'build/lab/index.html'
      }
      ,blog_index: {
        src: [
          'src/html/partials/_head.html'
          ,'src/html/partials/_header.html'
          ,'src/html/partials/blog/_index.html'
          ,'src/html/partials/_footer.html'
          ,'src/html/partials/_foot.html'
        ]
        ,dest: 'build/blog/index.html'
      }
      ,work_index: {
        src: [
          'src/html/partials/_head.html'
          ,'src/html/partials/_header.html'
          ,'src/html/partials/work/_index.html'
          ,'src/html/partials/_footer.html'
          ,'src/html/partials/_foot.html'
        ]
        ,dest: 'build/work/index.html'
      }
      ,contact_index: {
        src: [
          'src/html/partials/_head.html'
          ,'src/html/partials/_header.html'
          ,'src/html/partials/contact/_index.html'
          ,'src/html/partials/_footer.html'
          ,'src/html/partials/_foot.html'
        ]
        ,dest: 'build/contact/index.html'
      }
    }

    
    ,htmlmin: { 
      test: { 
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
        }
        ,files: { 
          'test/index.html': 'build/index.html'
          ,'test/error.html': 'build/error.html'
          ,'test/lab/index.html': 'build/lab/index.html'
          ,'test/blog/index.html': 'build/blog/index.html'
          ,'test/work/index.html': 'build/work/index.html'
          ,'test/contact/index.html': 'build/contact/index.html'
        }
      }
      ,dist: { 
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
        }
        ,files: { 
          'dist/index.html': 'build/index.html' 
          ,'dist/error.html': 'build/error.html'
          ,'dist/lab/index.html': 'build/lab/index.html' 
          ,'dist/blog/index.html': 'build/blog/index.html' 
          ,'dist/work/index.html': 'build/work/index.html' 
          ,'dist/contact/index.html': 'build/contact/index.html' 
        }
      }
    }


    ,recess: {
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
        }
        ,files: {
          'build/styles/lib/bootstrap.css':'src/styles/less/bootstrap.less'
          ,'build/styles/lib/bootstrap-theme.css':'src/styles/less/theme.less'
          ,'build/styles/main.css':'src/styles/less/main.less'
        }              
      }
      ,dist: {  
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
        }
        ,files: {
          'build/styles/lib/bootstrap.css':'src/styles/less/bootstrap.css'
          ,'build/styles/lib/bootstrap-theme.css':'src/styles/less/theme.css'
          ,'build/styles/main.css':'src/styles/less/main.css'
        }
      }
    }

    
    ,uglify: {
      testDefault: {
        options: {
          mangle: false
          , compress: false
          , beautify: true
          , report: false
          , sourceMap: 'test/scripts/source-map.js'
          , sourceMapRoot: 'src/scripts/'
          , preserveComments: true
        }
        ,files: {
          'build/scripts/lib/jquery.js':'bower_components/jquery/jquery.js'
          ,'build/scripts/lib/bootstrap.js':'<%= concat.bootstrap.dest %>'
          ,'build/scripts/lib/modernizr.js':'bower_components/modernizr/modernizr.js'
          ,'build/scripts/lib/html5shiv.js':'bower_components/html5shiv/dist/html5shiv.js'
          ,'build/scripts/lib/html5shiv-printshiv.js':'bower_components/html5shiv/dist/html5shiv-printshiv.js'
          ,'build/scripts/lib/JSXTransformer.js':'bower_components/react/JSXTransformer.js'
          ,'build/scripts/lib/react.js':'bower_components/react/react.js'
          ,'build/scripts/lib/d3.js':'bower_components/d3/d3.js'
          ,'build/scripts/main.js':'src/scripts/main.js'
          ,'build/scripts/plugins.js':'src/scripts/plugins.js'
        }
      }
      ,distDefault: {
        options: {
          mangle: false //(only main.js, plugins.js)
          , compress: true
          , beautify: false
          , report: 'min'
          , sourceMap: 'dist/scripts/source-map.js'
          , sourceMapRoot: 'src/scripts/'
          , preserveComments: false
        }
        ,files: {
          'build/scripts/lib/jquery.js':'bower_components/jquery/jquery.js'
          ,'build/scripts/lib/bootstrap.js':'<%= concat.bootstrap.dest %>'
          ,'build/scripts/lib/modernizr.js':'bower_components/modernizr/modernizr.js'
          ,'build/scripts/lib/html5shiv.js':'bower_components/html5shiv/dist/html5shiv.js'
          ,'build/scripts/lib/html5shiv-printshiv.js':'bower_components/html5shiv/dist/html5shiv-printshiv.js'
          ,'build/scripts/lib/JSXTransformer.js':'bower_components/react/JSXTransformer.js'
          ,'build/scripts/lib/react.js':'bower_components/react/react.js'
          ,'build/scripts/lib/d3.js':'bower_components/d3/d3.js'
          ,'build/scripts/main.js':'src/scripts/main.js'
          ,'build/scripts/plugins.js':'src/scripts/plugins.js'
        }
      }
      ,gzipDefault: {
        options: {
          mangle: false //(only main.js, plugins.js)
          , compress: true
          , beautify: true
          , report: 'gzip'
          , sourceMap: 'dist/scripts/source-map.js'
          , sourceMapRoot: 'src/scripts/'
          , preserveComments: false
        }
        ,files: {
          'build/scripts/lib/jquery.js':'bower_components/jquery/jquery.js'
          ,'build/scripts/lib/bootstrap.js':'<%= concat.bootstrap.dest %>'
          ,'build/scripts/lib/modernizr.js':'bower_components/modernizr/modernizr.js'
          ,'build/scripts/lib/html5shiv.js':'bower_components/html5shiv/dist/html5shiv.js'
          ,'build/scripts/lib/html5shiv-printshiv.js':'bower_components/html5shiv/dist/html5shiv-printshiv.js'
          ,'build/scripts/lib/JSXTransformer.js':'bower_components/react/JSXTransformer.js'
          ,'build/scripts/lib/react.js':'bower_components/react/react.js'
          ,'build/scripts/lib/d3.js':'bower_components/d3/d3.js'
          ,'build/scripts/main.js':'src/scripts/main.js'
          ,'build/scripts/plugins.js':'src/scripts/plugins.js'
        }
      }
      ,testBrowserify: {
        options: {
          mangle: false
          , compress: false
          , beautify: true
          , report: false
          , sourceMap: 'test/scripts/source-map.js'
          , sourceMapRoot: 'src/scripts/'
          , preserveComments: true
        }
        ,files: {
          'test/scripts/modules.js':'build/scripts/modules.js'
        }
      }
      ,distBrowserify: {
        options: {
          mangle: false //(only main.js, plugins.js)
          , compress: true
          , beautify: false
          , report: 'min'
          , sourceMap: 'dist/scripts/source-map.js'
          , sourceMapRoot: 'src/scripts/'
          , preserveComments: false
        },
        files: {
          'dist/scripts/modules.js':'build/scripts/modules.js'
        }
      }
      ,gzipBrowserifyDefault: {
        options: {
          mangle: false //(only main.js, plugins.js)
          , compress: true
          , beautify: true
          , report: 'gzip'
          , sourceMap: 'dist/scripts/source-map.js'
          , sourceMapRoot: 'src/scripts/'
          , preserveComments: false
        }
        ,files: {
          'dist/scripts/modules.js':'build/scripts/modules.js'
        }
      }
    }

    
    ,jsx: {
      client: {
        src: 'src/scripts/main.jsx'
        ,dest: 'build/scripts/main.js'
      }
    }

    ,browserify: {
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
        }
        ,files: {
          'build/scripts/module.js': [
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
      }
      ,dist: {
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
          'build/scripts/module.js': ['src/scripts/**/*.js']
        }
      }
    }


    ,copy: {
      common: {
        files: [ //copy these files from bower_components, run bower update [component_name] to keep them updated
          {expand: true, flatten: true, src: ["bower_components/html5-boilerplate/crossdomain.xml"], dest: 'src/html'}
          ,{expand: true, flatten: true, src: ["bower_components/html5-boilerplate/humans.txt"], dest: 'src/html'}
          ,{expand: true, flatten: true, src: ["bower_components/html5-boilerplate/robots.txt"], dest: 'src/html'}
          ,{expand: true, flatten: true, src: ["bower_components/html5-boilerplate/apple-touch-icon-precomposed.png"], dest: 'src/images/ico/h5bp/'}
          ,{expand: true, flatten: true, src: ["bower_components/html5-boilerplate/favicon.ico"], dest: 'src/images/ico/h5bp/'}
          ,{expand: true, flatten: true, src: ["bower_components/bootstrap/docs-assets/ico/*"], dest: 'src/images/ico/bootstrap/'}
          ,{expand: true, flatten: true, src: ["src/images/ico/bootstrap/*"], dest: 'build/images/ico/bootstrap/'}
          ,{expand: true, flatten: true, src: ["src/images/ico/h5bp/*"], dest: 'build/images/ico/h5bp/'}
          ,{expand: true, flatten: true, src: ["src/images/*"], dest: 'build/images/'}
          ,{expand: true, flatten: true, src: ["src/fonts/*"], dest: 'build/fonts/'}
          ,{expand: true, flatten: true, src: ["src/data/blog/*.markdown"], dest: 'build/blog/data'}
          ,{expand: true, flatten: true, src: ["src/html/*.xml"], dest: 'build/'}
          ,{expand: true, flatten: true, src: ["src/html/*.txt"], dest: 'build/'}
          ,{expand: true, flatten: true, src: ["src/html/*.ico"], dest: 'build/'}
        ]
      }
      ,test: {
        files: [
          {expand: true, flatten: true, src: ["build/images/ico/bootstrap/*"], dest: 'test/images/ico/bootstrap/'}
          ,{expand: true, flatten: true, src: ["build/images/ico/h5bp/*"], dest: 'test/images/ico/h5bp/'}
          ,{expand: true, flatten: true, src: ["build/images/*"], dest: 'test/images/'}
          ,{expand: true, flatten: true, src: ["build/fonts/*"], dest: 'test/fonts/'}
          ,{expand: true, flatten: true, src: ['build/styles/lib/*.css'], dest: 'test/styles/lib/'}
          ,{expand: true, flatten: true, src: ['build/styles/*.css'], dest: 'test/styles/'}
          ,{expand: true, flatten: true, src: ['build/scripts/lib/*.js'], dest: 'test/scripts/lib/'}
          ,{expand: true, flatten: true, src: ['build/scripts/*.js'], dest: 'test/scripts/'}
          ,{expand: true, flatten: true, src: ["build/blog/data/*.markdown"], dest: 'test/blog/data'}
          ,{expand: true, flatten: true, src: ["build/*.xml"], dest: 'test/'}
          ,{expand: true, flatten: true, src: ["build/*.txt"], dest: 'test/'}
          ,{expand: true, flatten: true, src: ["build/*.ico"], dest: 'test/'}
        ]
      }
      ,dist: {
        files: [
          {expand: true, flatten: true, src: ["build/images/ico/bootstrap/*"], dest: 'dist/images/ico/bootstrap/'}
          ,{expand: true, flatten: true, src: ["build/images/ico/h5bp/*"], dest: 'dist/images/ico/h5bp/'}
          ,{expand: true, flatten: true, src: ["build/images/*"], dest: 'dist/images/'}
          ,{expand: true, flatten: true, src: ["build/fonts/*"], dest: 'dist/fonts/'}
          ,{expand: true, flatten: true, src: ['build/styles/lib/*.css'], dest: 'dist/styles/lib/'}
          ,{expand: true, flatten: true, src: ['build/styles/*.css'], dest: 'dist/styles/'}
          ,{expand: true, flatten: true, src: ['build/scripts/lib/*.js'], dest: 'dist/scripts/lib/'}
          ,{expand: true, flatten: true, src: ['build/scripts/*.js'], dest: 'dist/scripts/'}
          ,{expand: true, flatten: true, src: ["build/blog/data/*.markdown"], dest: 'dist/blog/data'}
          ,{expand: true, flatten: true, src: ["build/*.xml"], dest: 'test/'}
          ,{expand: true, flatten: true, src: ["build/*.txt"], dest: 'test/'}
          ,{expand: true, flatten: true, src: ["build/*.ico"], dest: 'test/'}
        ]
      }
    },


    /* TODO: Convert from bootstrap blog validation to byrongibson.com page validation */
    validation: {
      options: {
        reset: true
      }
      ,files: {
        src: ["_gh_pages/**/*.html"]
      }
    }

    
    /* TODO: Convert to byrongibson.com custom js tests */
    ,qunit: {
      options: {
        inject: 'src/scripts/tests/unit/phantom.js'
      }
      ,files: ['src/scripts/tests/*.html']
    }

    
    ,connect: {
      test: {
        options: {
          port: 3001
          ,base: './test/'
          ,keepalive: true
        }
      }
      ,dist: {
        options: {
          port: 3000
          ,base: './dist/'
          ,keepalive: true
        }
      }
    },


    /* TODO: Obsolete, update to work with new build process, integrate with browser plugins */
    watch: {
      src: {
        files: '<%= jshint.src.src %>'
        ,tasks: ['jshint:src', 'qunit']
      }
      ,test: {
        files: '<%= jshint.test.src %>'
        ,tasks: ['jshint:test', 'qunit']
      }
      ,recess: {
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
  grunt.loadNpmTasks('grunt-aws-s3');
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
  grunt.registerTask('concat-html', ['concat:html_index','concat:html_error','concat:lab_index','concat:blog_index','concat:work_index','concat:contact_index']);

  // Concat but don't minify html and JS files.
  grunt.registerTask('concat-all', ['concat']);

  /***** Compile HTML *****/

  // Compile but don't minify html, distribute to ./test only
  grunt.registerTask('test-html', ['concat-html','htmlmin:test']);
  // compile and minify html, distribute to both ./test and ./dist
  grunt.registerTask('dist-html', ['concat-html','htmlmin:dist']);

  /***** Compile CSS *****/

  // Compile less & css into single css file, distribute to ./test only
  grunt.registerTask('test-styles', ['recess:test']);
  // compile and minify less & css, distribute to both ./test and ./dist
  grunt.registerTask('dist-styles', ['recess:dist']);
 
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
  grunt.registerTask('gzip-scripts-browserify', ['concat:bootstrap','uglify:gzipBrowserifyDefault']);

  /***** Build Default *****/

  // Test build, builds ./test 
  grunt.registerTask('test', ['clean:test', 'copy:common', 'test-styles', 'test-scripts', 'test-html', 'copy:test']);
  // Production build, builds ./dist
  grunt.registerTask('dist', ['clean:dist', 'copy:common', 'dist-styles', 'dist-scripts', 'dist-html', 'copy:dist']);
  // Optimized build, builds ./dist with gzipped assets
  grunt.registerTask('gzip', ['clean:dist', 'copy:common', 'dist-styles', 'gzip-scripts', 'dist-html', 'copy:dist']);

  /***** Build Browserify *****/

  // Test build, builds ./test 
  grunt.registerTask('test-browserify', ['clean:test', 'copy:common', 'test-styles', 'test-scripts-browserify', 'test-html', 'copy:test']);
  // Production build, builds ./dist
  grunt.registerTask('dist-browserify', ['clean:dist', 'copy:common', 'dist-styles', 'dist-scripts-browserify', 'dist-html', 'copy:dist']);
  // Optimized build, builds ./dist with gzipped assets
  grunt.registerTask('gzip-browserify', ['clean:dist', 'copy:common', 'dist-styles', 'gzip-scripts-browserify', 'dist-html', 'copy:dist']);

};
