/**
 * ViewManager.
 *
 * @class ViewManager
 * @namespace Barebone.Managers
 * @author Chris Santos
 */
Barebone.Managers.ViewManager = Barebone.BaseFunction.extend({

    constructor: function(element) {

        this._element = element;

        /**
         * Hash is views being managed.
         *
         * @type {Array}
         */
        this.views = {};
    },

    /**
     * Set the DOM element where the views will be managed.
     *
     * @param {Object} element
     */
    setElement: function(element) {

        this._element = element;
    },

    /**
     * Adds a view to be managed.
     */
    addView: function(view, name, visible) {

        name ? this.views[name] = view : this.views[view.el] = view;

        if($(this._element).find('#' + view.id).length == 0) {
            visible ? view.hide().show(0) : view.hide();
            this._element.append(view.$el);
        }
    },

    hasView: function(name) {

        return this.views[name] != undefined
    },

    getView: function(name) {

        return this.views[name];
    },

    hideAll: function() {

        for(var key in this.views) {
            this.views[key].hide();
        };
    }
}));