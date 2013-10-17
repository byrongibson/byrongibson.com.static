/* jshint node: true */

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
        dist: ['dist'],
        aws: ['aws']
    },

    jshint: {
      options: {
        jshintrc: 'src/js/.jshintrc'
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      src: {
        src: ['src/js/*.js']
      },
      test: {
        src: ['src/js/tests/unit/*.js']
      }
    },

    concat: {
      options: {
        stripBanners: true
      },
      bootstrap: {
        src: [
          'src/js/transition.js',
          'src/js/alert.js',
          'src/js/button.js',
          'src/js/carousel.js',
          'src/js/collapse.js',
          'src/js/dropdown.js',
          'src/js/modal.js',
          'src/js/tooltip.js',
          'src/js/popover.js',
          'src/js/scrollspy.js',
          'src/js/tab.js',
          'src/js/affix.js'
        ],
        dest: 'dist/js/lib/<%= pkg.name %>.js'
      },
      html_index: {
        src: [
            'src/html/head.html',
            'src/html/header.html',
            'src/html/index.html',
            'src/html/foot.html'
        ],
        dest: 'dist/index.html'
      },
      html_error: {
        src: [
            'src/html/head.html',
            'src/html/header.html',
            'src/html/error.html',
            'src/html/foot.html'
        ],
        dest: 'dist/error.html'
      }
    },

    uglify: {
      options: {
        report: 'min'
      },
      bootstrap: {
        src: ['<%= concat.bootstrap.dest %>'],
        dest: 'dist/js/lib/<%= pkg.name %>.js'
      },
      modernizr: {
        src: ['bower_components/modernizr/modernizr.js'],
        dest: 'dist/js/lib/modernizr.js'
      },
      html5shiv: {
        src: ['bower_components/html5shiv/dist/html5shiv.js'],
        dest: 'dist/js/lib/html5shiv.js'
      },
      html5shivprintshiv: {
        src: ['bower_components/html5shiv/dist/html5shiv-printshiv.js'],
        dest: 'dist/js/lib/html5shiv-printshiv.js'
      },
      JSXTransformer: {
        src: ['bower_components/react/JSXTransformer.js'],
        dest: 'dist/js/lib/JSXTransformer.js'
      },
      react: {
        src: ['bower_components/react/react.js'],
        dest: 'dist/js/lib/react.js'
      },
      d3: {
        src: ['bower_components/d3/d3.js'],
        dest: 'dist/js/lib/d3.js'
      },
      requirejs: {
        src: ['bower_components/requirejs/require.js'],
        dest: 'dist/js/require.js'
      },
      main: {
        src: ['src/js/main.js'],
        dest: 'dist/js/main.js'
      },
      plugins: {
        src: ['src/js/plugins.js'],
        dest: 'dist/js/plugins.js'
      }
    },

    /* rename is broken, it overwrites the source file with the new name, even when
     * dest specifies a completely different path.  Should not do this.  Just use 
     * uglify instead to compress the uncompressed source and rename at new loc.
     */
    /*rename: {
        jquery: {
            src: 'bower_components/jquery/jquery.min.js',
            dest: 'dist/js/lib/jquery.js'
        },
        respond: {
            src: 'bower_components/respond/respond.min.js',
            dest: 'dist/js/lib/respond.js'
        },
        react: {
          src: 'bower_components/react/react.min.js',
          dest: 'dist/js/lib/react.js'
        },
        d3: {
          src: 'bower_components/d3/d3.min.js',
          dest: 'dist/js/lib/d3.js'
        }
    },*/

    recess: {
      options: {
        compile: true
      },
      bootstrap_min: {
        options: {
          compress: true
        },
        src: ['src/less/bootstrap.less'],
        dest: 'dist/css/lib/<%= pkg.name %>.css'
      },
      bootstrap_theme_min: {
        options: {
          compress: true
        },
        src: ['src/less/theme.less'],
        dest: 'dist/css/lib/<%= pkg.name %>-theme.css'
      },
      normalize_min: {
        options: {
          compress: true
        },
        src: ['bower_components/html5-boilerplate/css/normalize.css'],
        dest: 'dist/css/lib/normalize.css'
      },
      main_min: {
        options: {
          compress: true
        },
        src: ['src/less/main.less'],
        dest: 'dist/css/main.css'
      }
    },

    htmlmin: {                                      // Task
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
                'aws/index.html': 'dist/index.html',        // 'destination': 'source'
                'aws/error.html': 'dist/error.html'
            }
        }
    },

    copy: {
      dist: {
        files: [
          {expand: true, flatten: true, src: ["bower_components/html5-boilerplate/crossdomain.xml"], dest: 'dist/'},
          {expand: true, flatten: true, src: ["bower_components/html5-boilerplate/favicon.ico"], dest: 'dist/img/ico/h5bp'},
          {expand: true, flatten: true, src: ["bower_components/html5-boilerplate/humans.txt"], dest: 'dist/'},
          {expand: true, flatten: true, src: ["bower_components/html5-boilerplate/robots.txt"], dest: 'dist/'},
          {expand: true, flatten: true, src: ["bower_components/html5-boilerplate/apple-touch-icon-precomposed.png"], dest: 'dist/img/ico/h5bp/'},
          {expand: true, flatten: true, src: ["bower_components/html5-boilerplate/favicon.ico"], dest: 'dist/img/ico/h5bp/'},
          {expand: true, flatten: true, src: ["docs-assets/ico/*"], dest: 'dist/img/ico/bootstrap/'},
          {expand: true, flatten: true, src: ["src/fonts/*"], dest: 'dist/fonts/'},
          {expand: true, flatten: true, src: ["img/*"], dest: 'dist/img/'}
        ]
      },
      aws: {
        files: [
          {expand: true, flatten: true, src: ["dist/js/lib/modernizr.js"], dest: 'aws/scripts/lib/'},
          {expand: true, flatten: true, src: ["dist/js/lib/jquery.js"], dest: 'aws/scripts/lib/'},
          {expand: true, flatten: true, src: ["dist/js/lib/html5shiv.js"], dest: 'aws/scripts/lib/'},
          {expand: true, flatten: true, src: ["dist/js/lib/html5shiv-printshiv.js"], dest: 'aws/scripts/lib/'},
          {expand: true, flatten: true, src: ["dist/js/lib/react.js"], dest: 'aws/scripts/lib/'},
          {expand: true, flatten: true, src: ["dist/js/lib/JSXTransformer.js"], dest: 'aws/scripts/lib/'},
          {expand: true, flatten: true, src: ["dist/js/lib/d3.js"], dest: 'aws/scripts/lib/'},
          {expand: true, flatten: true, src: ["dist/js/lib/respond.js"], dest: 'aws/scripts/lib/'},
          {expand: true, flatten: true, src: ["dist/js/lib/bootstrap.js"], dest: 'aws/scripts/lib/'},
          {expand: true, flatten: true, src: ["dist/js/require.js"], dest: 'aws/scripts/'},
          {expand: true, flatten: true, src: ["dist/js/plugins.js"], dest: 'aws/scripts/'},
          {expand: true, flatten: true, src: ["dist/js/main.js"], dest: 'aws/scripts/'},
          {expand: true, flatten: true, src: ["dist/css/lib/bootstrap-theme.css"], dest: 'aws/styles/lib/'},
          {expand: true, flatten: true, src: ["dist/css/lib/bootstrap.css"], dest: 'aws/styles/lib/'},
          {expand: true, flatten: true, src: ["dist/css/main.css"], dest: 'aws/styles/'},
          {expand: true, flatten: true, src: ["dist/fonts/*"], dest: 'aws/fonts/'},
          {expand: true, flatten: true, src: ["dist/img/*"], dest: 'aws/images/'},
          {expand: true, flatten: true, src: ["dist/img/ico/bootstrap/*"], dest: 'aws/images/ico/bootstrap/'},
          {expand: true, flatten: true, src: ["dist/img/ico/h5bp/*"], dest: 'aws/images/ico/h5bp/'},
          {expand: true, flatten: true, src: ["dist/css/lib/normalize.css"], dest: 'aws/styles/lib/'},
          {expand: true, flatten: true, src: ["dist/img/ico/h5bp/apple-touch-icon-precomposed.png"], dest: 'aws/images/ico/h5bp'},
          {expand: true, flatten: true, src: ["dist/img/ico/h5bp/favicon.ico"], dest: 'aws/images/ico/h5bp'},
          {expand: true, flatten: true, src: ["dist/crossdomain.xml"], dest: 'aws/'},
          {expand: true, flatten: true, src: ["dist/humans.txt"], dest: 'aws/'},
          {expand: true, flatten: true, src: ["dist/robots.txt"], dest: 'aws/'},
        ]
      }
    },

    qunit: {
      options: {
        inject: 'js/tests/unit/phantom.js'
      },
      files: ['js/tests/*.html']
    },

    connect: {
      server: {
        options: {
          port: 3000,
          base: './aws/',
          keepalive: true
        }
      }
    },

    jekyll: {
      docs: {}
    },

    validation: {
      options: {
        reset: true
      },
      files: {
        src: ["_gh_pages/**/*.html"]
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
        files: 'src/less/*.less',
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
  grunt.loadNpmTasks('grunt-jekyll');
  grunt.loadNpmTasks('grunt-recess');
  /*grunt.loadNpmTasks('grunt-rename');*/

  // Docs HTML validation task
  grunt.registerTask('validate-html', ['jekyll', 'validation']);

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

  // JS distribution task.
  grunt.registerTask('dist-js', ['concat', 'uglify']);

  // CSS distribution task.
  grunt.registerTask('dist-css', ['recess']);
  
  // HTML distribution task.
  grunt.registerTask('dist-html', ['htmlmin']);

  // Fonts distribution task.
  grunt.registerTask('dist-all', ['copy']);

  // Full distribution task.
  grunt.registerTask('dist', ['clean', 'dist-css', 'dist-js', 'dist-html', 'dist-all']);

  // Default task.
  grunt.registerTask('default', ['test', 'dist', 'build-customizer']);

  // task for building customizer
  grunt.registerTask('build-customizer', 'Add scripts/less files to customizer.', function () {
    var fs = require('fs')

    function getFiles(type) {
      var files = {}
      fs.readdirSync(type)
        .filter(function (path) {
          return type == 'fonts' ? true : new RegExp('\\.' + type + '$').test(path)
        })
        .forEach(function (path) {
          var fullPath = type + '/' + path
          return files[path] = (type == 'fonts' ? btoa(fs.readFileSync(fullPath)) : fs.readFileSync(fullPath, 'utf8'))
        })
      return 'var __' + type + ' = ' + JSON.stringify(files) + '\n'
    }

    var files = getFiles('js') + getFiles('less') + getFiles('fonts')
    fs.writeFileSync('docs-assets/js/raw-files.js', files)
  });
};
