Barebone.Engines.HandlebarsRenderEngine = Barebone.Engines.RenderEngine.extend({

    _getTemplate: function(filename, callback) {

        var self = this;

        if(filename in this._templates) {
            callback(self._templates[filename]);
            return;
        }

        $.ajax({
            url: filename,
            success: function(HTML) {
                self._templates[filename] = self._compile(HTML);
                callback(self._templates[filename]);
            },
            error: function() {
                throw new Error('There was an error loading the template: ' + filename);
            }
        });
    },

    _compile: function(html) {

        return Handlebars.compile(html)
    }
});