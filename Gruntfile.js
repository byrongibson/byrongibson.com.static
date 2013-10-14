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
      dist: ['dist']
    },

    jshint: {
      options: {
        jshintrc: 'js/.jshintrc'
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      src: {
        src: ['js/*.js']
      },
      test: {
        src: ['js/tests/unit/*.js']
      }
    },

    concat: {
      options: {
        stripBanners: true
      },
      bootstrap: {
        src: [
          'js/transition.js',
          'js/alert.js',
          'js/button.js',
          'js/carousel.js',
          'js/collapse.js',
          'js/dropdown.js',
          'js/modal.js',
          'js/tooltip.js',
          'js/popover.js',
          'js/scrollspy.js',
          'js/tab.js',
          'js/affix.js'
        ],
        dest: 'dist/js/lib/<%= pkg.name %>.js'
      },
      html_index: {
        src: [
            'html/head.html',
            'html/index.html',
            'html/foot.html'
        ],
        dest: 'dist/index.html'
      }
    },

    uglify: {
      options: {
        report: 'min'
      },
      bootstrap: {
        src: ['<%= concat.bootstrap.dest %>'],
        dest: 'dist/js/lib/<%= pkg.name %>.min.js'
      },
      modernizr: {
        src: ['bower_components/modernizr/modernizr.js'],
        dest: 'dist/js/lib/modernizr.min.js'
      },
      html5shiv: {
        src: ['bower_components/html5shiv/dist/html5shiv.js'],
        dest: 'dist/js/lib/html5shiv.min.js'
      },
      html5shivprintshiv: {
        src: ['bower_components/html5shiv/dist/html5shiv-printshiv.js'],
        dest: 'dist/js/lib/html5shiv-printshiv.min.js'
      },
      requirejs: {
        src: ['bower_components/requirejs/require.js'],
        dest: 'dist/js/require.min.js'
      },
      main: {
        src: ['js/main.js'],
        dest: 'dist/js/main.min.js'
      },
      plugins: {
        src: ['js/plugins.js'],
        dest: 'dist/js/plugins.min.js'
      }
    },

    recess: {
      options: {
        compile: true
      },
      bootstrap: {
        src: ['less/bootstrap.less'],
        dest: 'dist/css/lib/<%= pkg.name %>.css'
      },
      min: {
        options: {
          compress: true
        },
        src: ['less/bootstrap.less'],
        dest: 'dist/css/lib/<%= pkg.name %>.min.css'
      },
      theme: {
        src: ['less/theme.less'],
        dest: 'dist/css/lib/<%= pkg.name %>-theme.css'
      },
      theme_min: {
        options: {
          compress: true
        },
        src: ['less/theme.less'],
        dest: 'dist/css/lib/<%= pkg.name %>-theme.min.css'
      },
      normalize: {
        src: ['bower_components/html5-boilerplate/css/normalize.css'],
        dest: 'dist/css/lib/normalize.min.css'
      },
      main: {
        src: ['less/main.less'],
        dest: 'dist/css/main.css'
      },
      main_min: {
        options: {
          compress: true
        },
        src: ['less/main.less'],
        dest: 'dist/css/main.min.css'
      }
    },

    copy: {
      fonts: {
      },
      dist: {
        files: [
          {expand: true, flatten: true, src: ["bower_components/html5-boilerplate/404.html"], dest: 'dist/'},
          {expand: true, flatten: true, src: ["bower_components/html5-boilerplate/crossdomain.xml"], dest: 'dist/'},
          {expand: true, flatten: true, src: ["bower_components/html5-boilerplate/favicon.ico"], dest: 'dist/img/ico/h5bp'},
          {expand: true, flatten: true, src: ["bower_components/html5-boilerplate/humans.txt"], dest: 'dist/'},
          {expand: true, flatten: true, src: ["bower_components/html5-boilerplate/robots.txt"], dest: 'dist/'},
          {expand: true, flatten: true, src: ["bower_components/html5-boilerplate/apple-touch-icon-precomposed.png"], dest: 'dist/img/ico/h5bp/'},
          {expand: true, flatten: true, src: ["bower_components/html5-boilerplate/favicon.ico"], dest: 'dist/img/ico/h5bp/'},
          {expand: true, flatten: true, src: ["bower_components/jquery/jquery.min.js"], dest: 'dist/js/lib/'},
          {expand: true, flatten: true, src: ["bower_components/respond/respond.min.js"], dest: 'dist/js/lib/'},
          {expand: true, flatten: true, src: ["bower_components/react/react.min.js"], dest: 'dist/js/lib/'},
          {expand: true, flatten: true, src: ["docs-assets/ico/*"], dest: 'dist/img/ico/bootstrap/'},
          {expand: true, flatten: true, src: ["fonts/*"], dest: 'dist/fonts/'},
          {expand: true, flatten: true, src: ["img/*"], dest: 'dist/img/'}
        ]
      },
      aws: {
        files: [
          {expand: true, flatten: true, src: ["dist/js/lib/modernizr.min.js"], dest: 'aws/scripts/lib/'},
          {expand: true, flatten: true, src: ["dist/js/lib/jquery.min.js"], dest: 'aws/scripts/lib/'},
          {expand: true, flatten: true, src: ["dist/js/lib/html5shiv.min.js"], dest: 'aws/scripts/lib/'},
          {expand: true, flatten: true, src: ["dist/js/lib/html5shiv-printshiv.min.js"], dest: 'aws/scripts/lib/'},
          {expand: true, flatten: true, src: ["dist/js/lib/react.min.js"], dest: 'aws/scripts/lib/'},
          {expand: true, flatten: true, src: ["dist/js/lib/respond.min.js"], dest: 'aws/scripts/lib/'},
          {expand: true, flatten: true, src: ["dist/js/lib/bootstrap.min.js"], dest: 'aws/scripts/lib/'},
          {expand: true, flatten: true, src: ["dist/js/require.min.js"], dest: 'aws/scripts/'},
          {expand: true, flatten: true, src: ["dist/js/plugins.min.js"], dest: 'aws/scripts/'},
          {expand: true, flatten: true, src: ["dist/js/main.min.js"], dest: 'aws/scripts/'},
          {expand: true, flatten: true, src: ["dist/css/lib/bootstrap-theme.min.css"], dest: 'aws/styles/lib/'},
          {expand: true, flatten: true, src: ["dist/css/lib/bootstrap.min.css"], dest: 'aws/styles/lib/'},
          {expand: true, flatten: true, src: ["dist/css/main.min.css"], dest: 'aws/styles/'},
          {expand: true, flatten: true, src: ["dist/fonts/*"], dest: 'aws/fonts/'},
          {expand: true, flatten: true, src: ["dist/img/*"], dest: 'aws/images/'},
          {expand: true, flatten: true, src: ["dist/img/ico/bootstrap/*"], dest: 'aws/images/ico/bootstrap/'},
          {expand: true, flatten: true, src: ["dist/img/ico/h5bp/*"], dest: 'aws/images/ico/h5bp/'},
          {expand: true, flatten: true, src: ["dist/css/lib/normalize.min.css"], dest: 'aws/styles/lib/'},
          {expand: true, flatten: true, src: ["dist/img/ico/h5bp/apple-touch-icon-precomposed.png"], dest: 'aws/images/ico/h5bp'},
          {expand: true, flatten: true, src: ["dist/img/ico/h5bp/favicon.ico"], dest: 'aws/images/ico/h5bp'},
          {expand: true, flatten: true, src: ["dist/404.html"], dest: 'aws/'},
          {expand: true, flatten: true, src: ["dist/crossdomain.xml"], dest: 'aws/'},
          {expand: true, flatten: true, src: ["dist/humans.txt"], dest: 'aws/'},
          {expand: true, flatten: true, src: ["dist/robots.txt"], dest: 'aws/'},
          {expand: true, flatten: true, src: ["dist/index.html"], dest: 'aws/'},
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
        files: 'less/*.less',
        tasks: ['recess', 'copy']
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('browserstack-runner');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-html-validation');
  grunt.loadNpmTasks('grunt-jekyll');
  grunt.loadNpmTasks('grunt-recess');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');

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

  // Fonts distribution task.
  grunt.registerTask('dist-all', ['copy']);

  // Full distribution task.
  grunt.registerTask('dist', ['clean', 'dist-css', 'dist-js', 'dist-all']);

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
