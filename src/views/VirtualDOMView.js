Barebone.Views.VirtualDOMView = Barebone.Views.BaseView.extend({

    /**
     * Update elements to the DOM.
     *
     * @private
     */
    _render: function(context) {

        if(!this._engine) {
            throw new Error('Cannot render view, there is no render engine attached.');
        }

        var self = this;

        this._engine.processTemplate(this._templatePath, context, function(html) {

            console.log(html);

            var element = document.createElement('div');
            element.setAttribute('id', self.id);
            element.innerHTML = html;
            console.log('[Virtual DOM] new node children:', element.childNodes);

            var new_vnode = new vdomVirtualize(element);
            console.log('[Virtual DOM] new node:', new_vnode);

            var existing_vnode = new vdomVirtualize(self.$el[0]);
            console.log('[Virtual DOM] existing node:', existing_vnode);

            var patches = virtualDom.diff(existing_vnode, new_vnode);
            console.log('Virtual DOM:', patches);

            console.log('Virtual DOM: patching to', self.$el[0]);
            virtualDom.patch(self.$el[0], patches);
        });
    }

});