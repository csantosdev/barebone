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
         * Render engine instance.
         *
         * @type {Barebone.Engines.RenderEngine}
         * @private
         */
        this._engine = null;
    },

    /**
     * Renders the template onto the view's DOM.
     *
     * @param {object} context
     */
    render: function(context) {

        this._render(context);

        return this;
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
     * Sets the render engine to use when rendering the view.
     *
     * @param {Barebone.Engines.Engine} engine
     */
    setRenderEngine: function(engine) {

        this._engine = engine;

        return this;
    },

    /**
     * Update elements to the DOM.
     *
     * @private
     */
    _render: function(context) {

        if(!this._engine) {
            throw new Error('Cannot render view, there is no render engine attached.');
        }

        var self = this;

        this._engine.processTemplate(this._templatePath, context, function(html) {
            self.$el.html(html);
        });
    }
});