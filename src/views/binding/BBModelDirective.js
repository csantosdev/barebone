Barebone.Views.Binding.BBModelDirective = Barebone.Views.Binding.Directive.extend({

    run: function(expression, element) {

        var model = eval('this.' + expression);
        var property = element.attr('bb-model-property');

        element.on('keypress', function() {
            model.set(property, $(this).val());
        });
    }
});