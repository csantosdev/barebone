Barebone.ViewController = Barebone.Views.BaseView.extend({

    /**
     * Handles the multiple inheritance.
     *
     * @constructor
     */
    constructor: function ViewController() {

        Barebone.ViewController.__super__.constructor.call(this);

        var controller = new Barebone.Controller();
        var controller_proto = Object.getPrototypeOf(controller);
        var proto = Object.getPrototypeOf(this);
        var properties = Object.getOwnPropertyNames(controller_proto);

        properties.forEach(function(name) {
            if(proto[name] == undefined) {
                proto[name] = controller_proto[name];
            }
        });
    },

    stuff: function () {

    },

    afterAction: function(context) {}
});