Barebone.Views.BaseView = Backbone.View.extend({

    initialize: function() {

        /**
         * Path to the template.
         *
         * @type {string}
         * @private
         */
        this._templatePath = null;

        /**
         * FileLoader instance.
         *
         * @type {Barebone.IO.FileLoader}
         * @private
         */
        this._fileLoader;

        /**
         * View compiler instance.
         *
         * @type {Barebone.Views.Compilers.BaseCompiler}
         * @private
         */
        this._compiler;

        /**
         * Renderer instance.
         *
         * @type {Barebone.Views.Renderers.BaseRenderer}
         * @private
         */
        this._renderer;
    },

    /**
    * Renders the template onto the view's DOM.
    *
    * @param {object} context
    */
    render: function(context) {

        if(!this._templatePath) {
            throw new Error('Cannot render view without first setting a template.');
        }

        if(!this._fileLoader) {
            throw new Error('Cannot render view without first setting a file loader.');
        }

        var self = this;

        this._fileLoader.load(this._templatePath, function(html) {
            self._renderer.render(self._compiler.compile(html, context));
        });

        return this;
    },

    renderHTML: function(html) {

        var self = this;

        this._compiler.processTemplate(this._templatePath, context, function(html) {
          self._renderer.render(html);
        });

    },

    /**
    * Sets the file path of the template to use when rendering.
    *
    * @param {string} path
    */
    setTemplatePath: function(path) {

        this._templatePath = path;

        return this;
    },

    /**
    * Sets the view compiler used to compile the view's HTML.
    *
    * @param {Barebone.Views.Compilers.BaseCompiler} compiler
    */
    setCompiler: function(compiler) {

        this._compiler = compiler;

        return this;
    },

    setFileLoader: function(loader) {

        this._fileLoader = loader;

        return this;
    },

    /**
    * Sets the render object used for this view.
    *
    * @param {Barebone.Views.Renderers.BaseRenderer} renderer
    */
    setRenderer: function(renderer) {

        this._renderer = renderer;
    },

    /**
    * Hides the view.
    */
    hide: function() {

        this.$el.hide();

        return this;
    },

    /**
    * Displays the view.
    */
    show: function() {

        this.$el.show();

        return this;
    }
});