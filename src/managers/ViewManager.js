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
     *
     * @param {Barebone.Views.BaseView} view
     * @param {boolean} visible
     */
    addView: function(view, visible) {

        this.views[view.cid] = view;

        if($(this._element).find('#' + view.id).length == 0) {
            visible ? view.show() : view.hide();
            this._element.append(view.$el);
        }
    },

    /**
     * Returns TRUE is the provided view is being managed by this manager.
     *
     * @param {Barebone.Views.BaseView} view
     * @returns {boolean}
     */
    hasView: function(view) {

        return this.views[name] != undefined
    },

    /**
     * Returns a view by the provided view cid. Throws Exception if not found.
     *
     * @param {string} cid
     * @returns {Barebone.Views.BaseView}
     * @throws Barebone.Managers.ViewNotFoundException
     */
    getView: function(cid) {

        if(!this.hasView(cid)) {
            throw new Barebone.Managers.ViewNotManagedException('Could not find view with "cid" ' + cid);
        }

        return this.views[name];
    },

    /**
     * Hides all managed views.
     */
    hideAll: function() {

        for(var key in this.views) {
            this.views[key].hide();
        };
    }
});