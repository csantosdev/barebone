Barebone.Controller = Barebone.BaseFunction.extend({

    /**
     * ViewManager
     *
     * @type {Barebone.Managers.ViewManager}
     * @private
     */
    _viewManager: null,

    /**
     * Starts the process of executing an action on the controller.
     *
     * @param {string} action
     */
    callAction: function(action) {

        this._beforeAction();
        this._afterAction();
    },

    /**
     * Set a view manager to the controller.
     *
     * @param {Barebone.Managers.ViewManager} manager
     */
    setViewManager: function(manager) {

        this._viewManager = manager;
    },

    /**
     * Function called right before the controller's action is executed.
     *
     * @private
     */
    _beforeAction: function() {

    },

    /**
     * Function called right after the controller's action has executed.
     *
     * @private
     */
    _afterAction: function() {

    }
});