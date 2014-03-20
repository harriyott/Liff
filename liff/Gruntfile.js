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
  });

  grunt.loadNpmTasks('grunt-contrib-stylus');

  grunt.registerTask('default', ['stylus']);

};