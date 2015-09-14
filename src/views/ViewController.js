Barebone.Views.ViewController = Barebone.Views.BaseView.extend({

    /**
     * Handles the multiple inheritance.
     *
     * @constructor
     */
    constructor: function ViewController() {

        var controller = new Barebone.Controller();
        var controller_proto = Object.getPrototypeOf(controller);
        var proto = Object.getPrototypeOf(this);
        var properties = Object.getOwnPropertyNames(controller_proto);

        properties.forEach(function(name) {
            if(proto[name] == undefined) {
                proto[name] = controller_proto[name];
            }
        });

        Barebone.Views.BaseView.prototype.constructor.call(this);
    }
});