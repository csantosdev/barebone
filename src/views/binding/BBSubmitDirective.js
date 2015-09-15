Barebone.Views.Binding.BBSubmitDirective = Barebone.Views.Binding.Directive.extend({

    run: function(expression, element) {

        var self = this;

        var fn = function(event, data) {
            eval('this.' + expression);
        };

        element.on('submit', function(event) {
            var data = $(this).serializeArray();
            fn.call(self, event, data);
        });
    }
});