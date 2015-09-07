Barebone.Views.Compilers.BaseCompiler = Barebone.BaseFunction.extend({

    /**
     * Compiles templates.
     *
     * @private
     */
    _templates: {},

    /**
     * Returns the compiled HTML.
     *
     * @param {string} html
     * @param {object} context
     * @returns {string}
     */
    compile: function(html, context) {

        var key = md5(html);

        if(this._templates[key]) {
            return this._templates[key](context);
        }

        this._templates[key] = _.template(html);

        return this._templates[key](context);
    }
});