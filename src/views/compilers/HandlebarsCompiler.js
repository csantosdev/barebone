Barebone.Views.Compilers.HandlebarsCompiler = Barebone.Views.Compilers.BaseCompiler.extend({

    compile: function(html, context) {

        var key = md5(html);

        if(this._templates[key]) {
            return this._templates[key](context);
        }

        this._templates[key] = Handlebars.compile(html);

        return this._templates[key](context);
    }
});