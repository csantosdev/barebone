Barebone.Views.Renderers.BaseRenderer = Barebone.BaseFunction.extend({

    /**
     * Element to render to.
     *
     * @type {object}
     * @private
     */
    _element: null,

    constructor: function(element) {

        this._element = element;
    },

    render: function(html) {

        this._element.html(html);
    }
});