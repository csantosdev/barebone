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
                    './src/bootstrap.js',
                    './src/BaseFunction.js',
                    './src/Controller.js',
                    './src/views/View.js',
                    './src/views/BaseView.js',
                    './src/views/VirtualDOMView.js',
                    './src/ViewController.js',
                    './src/engines/RenderEngine.js',
                    './src/engines/HandlebarsRenderEngine.js',

                    './examples/test.js'
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
