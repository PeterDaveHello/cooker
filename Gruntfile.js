 module.exports = function(grunt) {
 
  "use strict";

  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  grunt.initConfig({
    
    pkg: grunt.file.readJSON('package.json'),
        
    banner: 
      '/*!\n' +
      ' * <%= pkg.name %> v<%= pkg.version %>\n' +
      ' * <%= pkg.url %>\n' +
      ' * Licensed under <%= pkg.licenses %>\n' +
      ' * 2013-<%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
      ' * <%= pkg.authorUrl %>\n' +
      ' */\n',
    // ====================================================
    clean: {
      files: [
        '<%= pkg.dist %>',
        '<%= pkg.source %>/js/<%= pkg.name %>.js',
        '<%= pkg.source %>/js/<%= pkg.name %>.min.js',
        '<%= pkg.public %>'
      ]
    },
    // ====================================================
    less:{
      source: {
        options: {
          strictMath: true,
          sourceMap: true,
          outputSourceFiles: true,
          sourceMapURL: ['<%= pkg.name %>.css.map'],
          sourceMapFilename: '<%= pkg.source %>/css/<%= pkg.name %>.css.map'
        },
        files: {
          '<%= pkg.source %>/css/<%= pkg.name %>.css': '<%= pkg.source %>/less/<%= pkg.name %>.less'
        } 
      },
      docs: {
        options: {
          strictMath: true,
          sourceMap: true,
          outputSourceFiles: true,
          sourceMapURL: ['docs.css.map'],
          sourceMapFilename: '<%= pkg.source %>/assets/css/docs.css.map'
        },
        files: {
          '<%= pkg.source %>/assets/css/docs.css': '<%= pkg.source %>/assets/less/docs.less'
        } 
      },
      source_minify: {
        options: {
          cleancss: true
        },
        files: {
          '<%= pkg.source %>/css/<%= pkg.name %>.min.css': '<%= pkg.source %>/css/<%= pkg.name %>.css'
        }
      },
      docs_minify: {
        options: {
          cleancss: true
        },
        files: {
          '<%= pkg.source %>/assets/css/docs.min.css': '<%= pkg.source %>/assets/css/docs.css'
        }
      }
    },
    // ====================================================
    autoprefixer: {
      options: {
        browsers: ['last 2 versions', 'ie 8', 'ie 9', 'android 2.3', 'android 4', 'opera 12'],
        map: true
      },
      source: {
        src: '<%= pkg.source %>/css/<%= pkg.name %>.css'
      },
      docs: {
        src: '<%= pkg.source %>/assets/css/docs.css'
      }
    },
    // ====================================================
    csscomb: {
      options: {
        config: '<%= pkg.source %>/less/.csscomb.json'
      },
      source: {
        expand: true,
        cwd: '<%= pkg.source %>/css/',
        src: ['*.css', '!*.min.css'],
        dest: '<%= pkg.source %>/css/'
      },
      docs: {
        expand: true,
        cwd: '<%= pkg.source %>/assets/css/',
        src: ['*.css', '!*.min.css'],
        dest: '<%= pkg.source %>/assets/css/'
      }
    },    
    // ====================================================
    usebanner: {
      options: {
        position: 'top',
        banner: '<%= banner %>'
      },
      source: {
        src: '<%= pkg.source %>/css/*.css'
      }
    },
    // ====================================================
    csslint: {
      options: {
        csslintrc: '<%= pkg.source %>/less/.csslintrc'
      },
      source: [
        '<%= pkg.source %>/css/<%= pkg.name %>.css'
      ],
      docs: [
        '<%= pkg.source %>/assets/css/docs.css'
      ]
    },
     // ====================================================
     concat: {
       options: {
         banner: '<%= banner %>',
         stripBanners: false
       },
       source: {
         src: [
            '<%= pkg.source %>/js/switchers.js',
            '<%= pkg.source %>/js/scrollmethod.js',
            '<%= pkg.source %>/js/inputcounter.js',
            '<%= pkg.source %>/js/slidebar.js',
            '<%= pkg.source %>/js/drilldown.js',
            '<%= pkg.source %>/js/dropdown.js',
            '<%= pkg.source %>/js/tabs.js'
         ],
         dest: '<%= pkg.source %>/js/<%= pkg.name %>.js'
       }
     },
    // ====================================================
    uglify: {
      options: {
        banner: '<%= banner %>',
        report: 'min',
        mangle: false,
        compress:false,
      },
      source:{
        options: {
          indentLevel: 2,
          beautify: true
        },
        files :  { 
          '<%= pkg.source %>/js/<%= pkg.name %>.js' : [
            '<%= pkg.source %>/js/plugin.js'
          ]
        } 
      },
      minify:{
        files :  { 
          '<%= pkg.source %>/js/<%= pkg.name %>.min.js' : [
            '<%= pkg.source %>/js/<%= pkg.name %>.js' 
          ]
        } 
      }
    },
    // ====================================================
    jshint: {
      options: {
        jshintrc: '<%= pkg.source %>/js/.jshintrc',
      },
      grunt: {
        src: 'Gruntfile.js'
      },
      source: {
        src: [
          '<%= pkg.source %>/js/<%= pkg.name %>.js',
          '<%= pkg.source %>/js/<%= pkg.name %>.min.js'
        ]
      }
    },
    // ====================================================
    jscs: {
      options: {
        config: '<%= pkg.source %>/js/.jscsrc'
      },
      grunt: {
        options: {
          requireCamelCaseOrUpperCaseIdentifiers: null,
          requireParenthesesAroundIIFE: true
        },
        src: '<%= jshint.grunt.src %>'
      },
      source: {
        src: '<%= jshint.source.src %>'
      }
    },
    // ====================================================
    htmlmin: {
      publish: {
        options: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
          removeCommentsFromCDATA: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true,
          removeRedundantAttributes: true,
          useShortDoctype: true
        },
        files: [{
          expand: true,
          cwd: '<%= pkg.public %>',
          src: '{,*/}*.html',
          dest: '<%= pkg.public %>'
        }]
      }
    },     
    // ====================================================
    validation: {
      options: {
        charset: 'utf-8',
        doctype: 'HTML5',
        failHard: true,
        reset: true,
        relaxerror: [
          'Bad value X-UA-Compatible for attribute http-equiv on element meta.',
          'Element img is missing required attribute src.'
        ]
      },
      files: {
        src: [
          '<%= pkg.public %>/index.html',
          '<%= pkg.public %>/**/*.html'
        ]
      }
    },
    // ====================================================
    copy: {
      dist: {
        expand: true,
        cwd: './<%= pkg.source %>',
        src: [
          'js/*.js',
          'css/*.css',
          'css/*.map',
          'less/**'
        ],
        dest: './<%= pkg.dist %>'
      }
    },
    // ====================================================
    connect: {
      server: {
        options: {
          port: 9999,
          hostname: '0.0.0.0',
          base: '<%= pkg.public %>/',
          open: {
            server: {
              path: 'http://<%= connect.server.options.hostname %>:<%= connect.server.options.port %>'
            }
          }
        }
      }
    },
    // ====================================================
    notify: {
      options: {
        title: '<%= pkg.name %> Grunt Notify',
      },
      success:{
        options: {
          message: 'Success!',
        }
      }
    },
    // ====================================================
    bower: {
      install: {
        options: {
          targetDir: '<%= pkg.source %>/vendor',
          layout: 'byComponent',
          install: true,
          verbose: false,
          cleanTargetDir: true,
          cleanBowerDir: false
        }
      }
    },
    // ====================================================
    jekyll: {
      dist: {
        options: {
          config: '_config.yml'
        }
      }
    },
    // ====================================================
    watch: {
      options: {
        spawn: false,
        livereload : true
      },
      grunt: {
        files: ['<%= jshint.grunt.src %>'],
        tasks: [
          'jshint:grunt',
          'notify'
        ]
      },
      js: {
        files: [
          '<%= pkg.source %>/js/*.js'
        ],
        tasks: [
          'build-js',
          'jshint:source',
          'jekyll',
          'notify'
        ]
      },
      html: {
        files: [
          '<%= pkg.source %>/*.html',
          '<%= pkg.source %>/example/**',
          '<%= pkg.source %>/_includes/**',
          '<%= pkg.source %>/style/*',
          '<%= pkg.source %>/_layouts/*'
        ],
        tasks: [
          'build-html',
          'notify'
        ]
      },
      less_source: {
        files: [
          '<%= pkg.source %>/less/*.less',
          '<%= pkg.source %>/less/**/*.less'
        ],
        tasks: [
          'build-less-source',
          'jekyll',
          'notify'
        ]
      },
      less_docs: {
        files: [
          '<%= pkg.source %>/assets/less/*.less',
          '<%= pkg.source %>/assets/less/**/*.less'
        ],
        tasks: [
          'build-less-docs',
          'jekyll',
          'notify'
        ]
      }
    },
    // ====================================================
    buildcontrol: {
      options: {
        dir: '<%= pkg.public %>',
        commit: true,
        push: true,
        message: 'Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%'
      },
      pages: {
        options: {
          remote: 'git@github.com:<%= pkg.repository.user %>/<%= pkg.name %>.git',
          branch: 'gh-pages'
        }
      }
    }        
     
  });

  //publicに指定したディレクトリをgh-pagesブランチにデプロイ。
  // ====================================================
  grunt.registerTask('deploy', [
    'buildcontrol',
    'notify'
  ]);

  // lessコンパイル
  // ====================================================
  grunt.registerTask('build-less-source', [
    'less:source', 
    'autoprefixer:source', 
    'usebanner', 
    'csscomb:source', 
    'less:source_minify',
    'csslint:source'
  ]);

  // lessコンパイル
  // ====================================================
  grunt.registerTask('build-less-docs', [
    'less:docs', 
    'autoprefixer:docs', 
    'csscomb:docs', 
    'less:docs_minify',
    'csslint:docs'
  ]);

  // jsコンパイル
  // ====================================================
  grunt.registerTask('build-js', [
    'concat',
    'uglify'
  ]);
  
  // jekyllコンパイル
  // ====================================================
  grunt.registerTask('build-html', [
    'jekyll',
    //'htmlmin'
  ]);

  // js,css,htmlのテスト
  // ====================================================
  grunt.registerTask('test', [
    'jshint:source',
    //'jscs:source',
    // 'csslint',
    // 'validation'
  ]);

  // ベンダーファイルのインストール →　コンパイル　→　テスト　→　ウォッチ
  // ====================================================
  grunt.registerTask('b', [
    'clean',
    'bower',
    'build-less-source',
    'build-less-docs',
    'build-js',
    'build-html',
    'test',
    'copy'
  ]);
  
  // サーバー起動　→　ウオッチ
  // ====================================================
  grunt.registerTask('default', function () {
    grunt.log.warn('`grunt` to start a watch.');
    grunt.task.run([
      'connect',
      'watch'
    ]);
  });
    
};