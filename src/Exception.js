Barebone.Exception = function BareboneException(message, code) {

    this.message = message;
    this.code = code;
};

Barebone.Exception.extend = Backbone.Model.extend;
Barebone.Exception.prototype = new Error();