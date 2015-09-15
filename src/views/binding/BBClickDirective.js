Barebone.Views.Binding.BBClickDirective = Barebone.Views.Binding.Directive.extend({

    run: function(expression, element) {

        var self = this;

        element.on('click', function(event) {
            eval('self.' + expression);
        });
    }
});