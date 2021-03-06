module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      compile: {
        files: [{
          expand: true,
          cwd: 'public/',
          src: ['**/*.scss'],
          dest: 'public/',
          ext: '.css'
        }]
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'liff/**/*.js'],
      options: {
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    qunit: {
      options: {
        urls: [
          'http://127.0.0.1:3000/tests/test.html',
        ]
      }
    },
    express: {
      dev: {
        options: {
          script: 'app.js'
        }
      },
      background: {
        options: {
          script: 'app.js',
          background: false
        }
      }
    },
    watch: {
      js: {
        files: ['<%= jshint.files %>', 'app.js'],
        tasks: ['jshint'],
        options: {
          spawn: false,
        }
      },
      css: {
        files: ['**/*.scss'],
        tasks: ['sass'],
        options: {
          spawn: false,
        }
      }
    },
    gitcommit: {
      task: {
        options: {
         message: '<%= grunt.template.today("yyyy-mm-dd") %> - Grunt build commit',
         directory: '../'
        }
      }
    }
  });
  
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-git');

  grunt.registerTask('sync', ['express:dev', 'watch']);
  grunt.registerTask('default', ['express:dev', 'watch']);
  grunt.registerTask('build', ['qunit','jshint','sass','gitcommit']);

};