'use strict';
module.exports = function(grunt) {

  // ----------------------------------------------------------
  // WARNING, BRAVE DEVELOPER
  // ----------------------------------------------------------
  // Webhook allows you to use local grunt tasks and files.
  // However, these tasks are ONLY RUN LOCALLY and not when
  // your live site needs to be rebuilt. This means you should
  // only use grunt for pre-processing tasks like building
  // Sass, less or coffescript files, not for reading things
  // from your templates and making dynamic changes during
  // the build process. Doing so will cause your live site
  // not to regerate.
  //
  // You have been warned!


  // Put your own grunt config here
  grunt.initConfig({

    // Import Bourbon, Neat and Wyrm. Generate CSS from the /sass/ folder
    less: {
      dev: {
        options: {
          // Uncomment the below line to include outside directories as well.
          // paths: ['location/of/other/less/']
        },
        files: [{
          // Files in the /less/ directory will go to /static/css/ when processed.
          expand: true,
          cwd: 'less',
          src: ['app.less'],
          dest: 'static/css',
          ext: '.css'
        }]
      }
    },
    copy: {
      bootstrap: {
        files: [
          {expand: true, cwd: 'bower_components/bootstrap/less/', src: ['**/*.less'], dest: 'less/bootstrap/'},
          {expand: true, cwd: 'bower_components/bootstrap/dist/js/', src: ['bootstrap*.js'], dest: 'static/javascript/bootstrap/'},
          {expand: true, cwd: 'bower_components/bootstrap/dist/fonts/', src: ['*'], dest: 'static/fonts/'},
        ]
      }
    },
    // Watch for sass changes and build css using the sass task we set above
    watch: {
      options : {
        files: ['less/**/*.less'],
        tasks: ['less','build']
      },
    }
  });

  // Run grunt:reqs to copy the required files from bower
  grunt.registerTask('reqs', ['copy']);

  // These are the custom grunt packages we're adding
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // NEVER REMOVE THESE LINES, OR ELSE YOUR PROJECT MAY NOT WORK
  require('./options/generatorOptions.js')(grunt);
  grunt.loadTasks('tasks');
};




