// 包装函数
module.exports = function(grunt) {
  // 强制使用Unix换行符
  grunt.util.linefeed = '\n';
  // 任务配置
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*!\n' +
            ' * <%= pkg.name %>\n' +
            ' * Description: <%= pkg.description %>\n' +
            ' * Author: <%= pkg.author %>\n' +
            ' * Version: <%= pkg.version %>\n' +
            ' * Last Changed by <%= pkg.lastChange %>\n' +
            ' * Last Update : <%= grunt.template.today("yyyy-mm-dd hh:MM:ss") %>\n'+
            ' */',
    clean:{
      less: {
        files: [{src: ['<%= pkg.path.dest.less %>', '<%= pkg.path.build.less %>']}]
      },
      css: {
        files: [{src: ['<%= pkg.path.dest.css %>', '<%= pkg.path.build.css %>']}]
      },
      js: {
        files: [{src: ['<%= pkg.path.dest.js %>', '<%= pkg.path.build.js %>']}]
      }
    },
    less: {
      compile: {
        options: {
          strictMath: true,
          strictUnits: true,
          sourceMap: true,
          outputSourceFiles: true,
          sourceMapURL: 'style.css.map',
          sourceMapFilename: '<%= pkg.path.dest.less %>style.css.map'
        },
        files: [
          {src: ['<%= pkg.path.src.less %>main.less'], dest: '<%= pkg.path.dest.less %>style.css'}
        ]
      },
      ie: {
        options: {
          strictMath: true,
          strictUnits: true,
          sourceMap: true,
          outputSourceFiles: true,
          sourceMapURL: 'ie.css.map',
          sourceMapFilename: '<%= pkg.path.dest.less %>ie.css.map'
        },
        files: [
          {src: ['<%= pkg.path.src.less %>ie.less'], dest: '<%= pkg.path.dest.less %>ie.css'}
        ]
      }
    },
    autoprefixer: {
      options: {
        browsers: ['last 2 versions', 'ie 7', 'ie 8', 'ie 9'],
        map: true
      },
      less: {
        src: '<%= pkg.path.dest.less %>*.css'
      },
      css: {
        src: '<%= pkg.path.dest.css %>*.css'
      }
    },
    usebanner: {
      options: {
        position: 'top',
        banner: '<%= banner %>'
      },
      less: {
        files: [
          {src: ['<%= pkg.path.dest.less %>*.css']}
        ]
      },
      css: {
        files: [
          {src: ['<%= pkg.path.dest.css %>*.css']}
        ]
      }
    },
    csscomb: {
      options: {
        config: 'config/.csscomb.json'
      },
      less: {
        files: [
          {
            expand: true, //启用动态扩展
            cwd: '<%= pkg.path.dest.less %>', //批匹配相对lib目录的src来源
            src: '**.css', //实际的匹配模式
            dest: '<%= pkg.path.dest.less %>', //目标路径前缀
            ext: '.css' //目标文件路径中文件的扩展名.
          }
        ]
      },
      css: {
        files: [
          {
            expand: true, //启用动态扩展
            cwd: '<%= pkg.path.dest.css %>', //批匹配相对lib目录的src来源
            src: '**.css', //实际的匹配模式
            dest: '<%= pkg.path.dest.css %>', //目标路径前缀
            ext: '.css' //目标文件路径中文件的扩展名.
          }
        ]
      }
    },
    cssmin: {
      options: {
        compatibility: ['ie7', 'ie8'],
        keepSpecialComments: '*',
        keepBreaks: true
      },
      less: {
        files: [
          {
            expand: true, //启用动态扩展
            cwd: '<%= pkg.path.dest.less %>', //批匹配相对lib目录的src来源
            src: '**.css', //实际的匹配模式
            dest: '<%= pkg.path.dest.less %>', //目标路径前缀
            ext: '.min.css' //目标文件路径中文件的扩展名.
          }
        ]
      },
      css: {
        files: [
          {
            expand: true, //启用动态扩展
            cwd: '<%= pkg.path.dest.css %>', //批匹配相对lib目录的src来源
            src: '**.css', //实际的匹配模式
            dest: '<%= pkg.path.dest.css %>', //目标路径前缀
            ext: '.min.css' //目标文件路径中文件的扩展名.
          }
        ]
      }
    },
    cssformat: {
      options: {indent: '\t'},
      less: {
        files: [
          {
            expand: true, //启用动态扩展
            cwd: '<%= pkg.path.dest.less %>', //批匹配相对lib目录的src来源
            src: '**.min.css', //实际的匹配模式
            dest: '<%= pkg.path.dest.less %>', //目标路径前缀
            ext: '.min.css' //目标文件路径中文件的扩展名.
          }
        ]
      },
      css: {
        files: [
          {
            expand: true, //启用动态扩展
            cwd: '<%= pkg.path.dest.css %>', //批匹配相对lib目录的src来源
            src: '**.min.css', //实际的匹配模式
            dest: '<%= pkg.path.dest.css %>', //目标路径前缀
            ext: '.min.css' //目标文件路径中文件的扩展名.
          }
        ]
      }
    },
    csslint: {
      options: {
        csslintrc: 'config/.csslintrc'
      },
      less: {
        files: [{
          src: ['<%= pkg.path.dest.less %>**.css', '!<%= pkg.path.dest.less %>**.min.css']
        }]
      },
      css: {
        files: [{
          src: ['<%= pkg.path.dest.css %>**.css', '!<%= pkg.path.dest.css %>**.min.css']
        }]
      }
    },
    copy: {
      less: {
        files: [
          {src: ['<%= pkg.path.dest.less %>style.min.css'], dest: '<%= pkg.path.build.less %>style.css'},
          {src: ['<%= pkg.path.dest.less %>ie.min.css'], dest: '<%= pkg.path.build.less %>ie.css'}
        ]
      },
      devless: {
        files: [
          {src: ['<%= pkg.path.dest.less %>style.css'], dest: '<%= pkg.path.build.less %>style.css'},
          {src: ['<%= pkg.path.dest.less %>style.css.map'], dest: '<%= pkg.path.build.less %>style.css.map'},
          {src: ['<%= pkg.path.dest.less %>ie.css'], dest: '<%= pkg.path.build.less %>ie.css'},
          {src: ['<%= pkg.path.dest.less %>ie.css.map'], dest: '<%= pkg.path.build.less %>ie.css.map'}
        ]
      },
      css: {
        files: [
          {src: ['<%= pkg.path.dest.css %>style.min.css'], dest: '<%= pkg.path.build.css %>style.css'},
          {src: ['<%= pkg.path.dest.css %>ie.min.css'], dest: '<%= pkg.path.build.css %>ie.css'}
        ]
      },
      devcss: {
        files: [
          {src: ['<%= pkg.path.dest.css %>style.min.css'], dest: '<%= pkg.path.build.css %>style.css'},
          {src: ['<%= pkg.path.dest.css %>style.css.map'], dest: '<%= pkg.path.build.css %>style.css.map'},
          {src: ['<%= pkg.path.dest.css %>ie.min.css'], dest: '<%= pkg.path.build.css %>ie.css'},
          {src: ['<%= pkg.path.dest.css %>ie.css.map'], dest: '<%= pkg.path.build.css %>ie.css.map'}
        ]
      },
      js: {
        files: [
          {src: ['<%= pkg.path.dest.js %>js.min.js'], dest: '<%= pkg.path.build.js %>js.js'}
        ]
      }
    },
    jshint: {
      options: {
        jshintrc: 'config/.jshintrc'
      },
      src: {
        src: '<%= pkg.path.src.js %>**.js'
      }
    },
    concat: {
      css: {
        files:[
          {src: ['<%= pkg.path.src.css %>*.css', '!<%= pkg.path.src.css %>ie.css'], dest: '<%= pkg.path.dest.css %>style.css'},
          {src: ['<%= pkg.path.src.css %>ie.css'], dest: '<%= pkg.path.dest.css %>ie.css'}
        ]
      },
      js: {
        options: {
          banner: '<%= banner %>\n',
          stripBanners: false
        },
        src: [
          '<%= pkg.path.src.js %>**.js',
        ],
        dest: '<%= pkg.path.dest.js %>js.js'
      }
    },
    uglify: {
      js: {
        options: {
          banner: '<%= banner %>\n'
        },
        src: '<%= concat.js.dest %>',
        dest: '<%= pkg.path.dest.js %>js.min.js'
      }
    },
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
        src: '*.html'
      }
    },
    watch: {
      less: {
        files: '<%= pkg.path.src.less %>**.less',
        tasks: 'dev-less'
      },
      css: {
        files: '<%= pkg.path.src.css %>**.css',
        tasks: 'dev-css'
      }
    },
    requirejs: {
      compile: {
        options: {
          baseUrl: '<%= pkg.path.src.js %>',
          paths: {
            zepto: "empty:"
          },
          name: 'index', // assumes a production build using almond
          out: '<%= pkg.path.build.js %>main.js'
        }
      },
      weixin: {
        options: {
          baseUrl: '<%= pkg.path.src.js %>',
          paths: {
            zepto: "empty:"
          },
          name: 'weixin', // assumes a production build using almond
          out: '<%= pkg.path.build.js %>weixin-main.js'
        }
      }
    }
  });
  grunt.registerTask('addcss', function () {
    var input = grunt.file.read("./dist/css/style.min.css", {encoding: 'utf8'});
    var output = input.replace(/\}/g, ";}");
    grunt.file.write("./dist/css/style.min.css", output, {"./dist/css/style.min.css": 'utf8'});
  });
  // 任务加载
  require('load-grunt-tasks')(grunt, {scope: 'devDependencies'});
  grunt.registerTask('dev-less', ['clean:less', 'less', 'autoprefixer:less', 'csscomb:less', 'csslint:less', 'copy:devless']);
  grunt.registerTask('build-less', ['clean:less', 'less', 'autoprefixer:less', 'csscomb:less', 'cssmin:less', 'cssformat:less', 'usebanner:less', 'csslint:less', 'copy:less']);
  grunt.registerTask('dev-css', ['clean:css', 'concat:css', 'autoprefixer:css', 'csscomb:css', 'cssmin:css', 'cssformat:css', 'csslint:css', 'copy:devcss']);
  grunt.registerTask('build-css', ['clean:css', 'concat:css', 'autoprefixer:css', 'csscomb:css', 'cssmin:css', 'cssformat:css', 'usebanner:css', 'csslint:css', 'copy:css']);
  grunt.registerTask('build-js', ['jshint', 'concat:js', 'uglify', 'copy:js']);
};