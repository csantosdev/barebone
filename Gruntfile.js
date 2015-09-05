module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.initConfig({
        watch: {
            files: [
                '**/*'
            ],
            tasks: ['concat']
        },

        concat: {
            dist: {
                src: [
                    'bootstrap.js',
                    'BaseFunction.js',
                    'Controller.js',
                    'View.js',
                    'ViewController.js',
                    'engines/RenderEngine.js',
                    'engines/HandlebarsRenderEngine.js',

                    'test.js'
                ],
                dest: (function() {
                    grunt.file.delete('app.js');
                    return 'app.js';
                })()
            }
        }
    });

    grunt.registerTask('default', ['concat']);
};
