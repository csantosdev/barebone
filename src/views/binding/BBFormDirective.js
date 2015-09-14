Barebone.Views.Binding.BBFormDirective = Barebone.Views.Binding.Directive.extend({

    run: function(element, view) {

        var callback = element.attr('bb-form');

        element.on('submit', function() {

            if(!view[callback]) {
                throw new Error('There is no callback method "' + callback+ '" on view cid "' + view.cid + '"');
            }

            view[callback]($(this).serializeArray(), element);
            return false;
        });
    }
});