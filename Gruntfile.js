module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.initConfig({
        watch: {
            files: [
                './src/**/*.js',
                './spec/**/*.js'
            ],
            tasks: ['concat']
        },

        concat: {
            dist: {
                src: [
                    './src/bootstrap.js',
                    './src/BaseFunction.js',
                    './src/Controller.js',
                    './src/Exception.js',
                    './src/views/binding/Directive.js',
                    './src/views/binding/BBSubmitDirective.js',
                    './src/views/binding/BBModelDirective.js',
                    './src/views/binding/BBClickDirective.js',
                    './src/views/View.js',
                    './src/views/BaseView.js',
                    './src/views/VirtualDOMView.js',
                    './src/views/renderers/BaseRenderer.js',
                    './src/views/compilers/BaseCompiler.js',
                    './src/views/compilers/HandlebarsCompiler.js',
                    './src/io/FileLoader.js',
                    './src/views/ViewController.js',
                    './src/managers/ViewManager.js',
                    './src/managers/ViewNotManagedException.js'
                ],
                dest: (function() {
                    grunt.file.delete('barebone.js');
                    return 'barebone.js';
                })()
            }
        }
    });

    grunt.registerTask('default', ['concat']);
    grunt.registerTask('watch', ['watch']);
};
