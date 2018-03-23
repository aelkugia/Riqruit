'use strict';


module.exports = function(grunt){
  // Load Grunt tasks declared in the package.json file
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  var path = require('path');

  grunt.initConfig({
    clean: {
      dev: {
        src: ['build/']
      }
    },

    copy: {
      dev: {
        cwd: 'public',
        src: ['**/*.html','img/**/*.*','css/*.css'],
        expand: true,
        dest: 'build/'
      }
    },

    express: {
        all: {
            options: {
                server: path.resolve(__dirname, 'server.js'),
                port: 3000,
                hostname: "localhost",
                livereload: true
            }
        }
    },

    // grunt-watch will monitor the projects files
    // https://github.com/gruntjs/grunt-contrib-watch
    watch: {
        all: {
                files: ['public/**/*.html',"public/**/*.scss","public/**/*.js"],
                options: {
                    livereload: true
                },
                tasks: ['clean:dev','copy:dev']
        }
    },

    // grunt-open will open your browser at the project's URL
    // https://www.npmjs.org/package/grunt-open
    open: {
        all: {
            path: 'http://localhost:3000'
        }
    }
  });

  grunt.registerTask('serve', ['clean:dev','copy:dev','express', 'open', 'watch']);
};
