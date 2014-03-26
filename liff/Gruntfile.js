module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    stylus: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      compile: {
        files: [{
          expand: true,
          cwd: 'public/',
          src: ['**/*.styl'],
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
    express: {
      default_option: {
        serverreload: true
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['stylus', 'jshint'],
      options: {
        spawn: false,
      },
    }
  });

  grunt.loadNpmTasks('grunt-express');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('default', ['express', 'watch']);

};