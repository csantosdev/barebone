Barebone.Views.Binding.BBFormDirective = Barebone.Views.Binding.Directive.extend({

    run: function(element, view) {

        var callback = element.attr('bb-form');

        if(!view[callback]) {
            throw new Error('There is no callback method "' + callback+ '" on view cid "' + view.cid + '"');
        }

        element.on('submit', function() {
            view[callback]($(this).serializeArray(), element);
            return false;
        });
    }
});