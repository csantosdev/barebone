Barebone.Engines.RenderEngine = Barebone.BaseFunction.extend({

    /**
     * Compiles templates.
     *
     * @private
     */
    _templates: {},

    /**
     * Template Paths.
     *
     * @private
     * @type {object}
     */
    _templatePaths: {},

    /**
     * Returns rendered HTML.
     *
     * @param {string} template
     * @param {object} context
     * @param {function} callback function(html)
     */
    processTemplate: function(template, context, callback) {

        this._getTemplate(template, function(compiler) {
            callback(compiler(context));
        });
    },

    /**
     * Loads in a template and compiles it.
     *
     * @param {String} filename Path to the template.
     * @param {Object} context The data accessible by the template.
     * @param {function} callback Function called on success. Passes callback(HTML)
     */
    processHTML: function(html, context, callback) {

        callback(this._compile(html)(context));
    },

    /**
     * Returns an object that can be used to compile HTML with context.
     *
     * @param {string} filename
     * @param {object} context
     * @param {function} callback function(compiler)
     */
    _getTemplate: function(filename, callback) {

        throw new Error('RenderEngine::getTemplate must be implemented!');
    },

    /**
     * Returns the compiled HTML.
     *
     * @param {string} html
     * @private
     */
    _compile: function(html) {

        throw new Error('RenderEngine::_compile must be implemented!');
    }
});