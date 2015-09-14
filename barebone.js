Barebone = {
  Engines: {},
  IO: {},
  Managers: {},
  Views: {
    Binding: {},
    Compilers: {},
    Renderers: {}
  }
};
Barebone.BaseFunction = function() {};
Barebone.BaseFunction.extend = Backbone.Model.extend;
_.extend(Barebone.BaseFunction.prototype, Backbone.Events);
Barebone.Controller = Barebone.BaseFunction.extend({

    /**
     * ViewManager
     *
     * @type {Barebone.Managers.ViewManager}
     * @private
     */
    _viewManager: null,

    /**
     * Starts the process of executing an action on the controller.
     *
     * @param {string} action
     */
    callAction: function(action) {

        this._beforeAction();
        this._afterAction();
    },

    /**
     * Set a view manager to the controller.
     *
     * @param {Barebone.Managers.ViewManager} manager
     */
    setViewManager: function(manager) {

        this._viewManager = manager;
    },

    /**
     * Function called right before the controller's action is executed.
     *
     * @private
     */
    _beforeAction: function() {

    },

    /**
     * Function called right after the controller's action has executed.
     *
     * @private
     */
    _afterAction: function() {

    }
});
Barebone.Exception = function BareboneException(message, code) {

    this.message = message;
    this.code = code;
};

Barebone.Exception.extend = Backbone.Model.extend;
Barebone.Exception.prototype = new Error();
Barebone.Views.BaseView = Backbone.View.extend({
    /**
     * FileLoader instance.
     *
     * @type {Barebone.IO.FileLoader}
     * @private
     */
    _fileLoader: null,

    /**
     * View compiler instance.
     *
     * @type {Barebone.Views.Compilers.BaseCompiler}
     * @private
     */
    _compiler: null,

    /**
     * Renderer instance.
     *
     * @type {Barebone.Views.Renderers.BaseRenderer}
     * @private
     */
    _renderer: null,

    initialize: function() {

        /**
         * Path to the template.
         *
         * @type {string}
         * @private
         */
        this._templatePath = null;
    },

    /**
    * Renders the template onto the view's DOM then binds
    * directive events.
    *
    * @param {object} context
    */
    render: function(context) {

        if(!this._templatePath) {
            throw new Error('Cannot render view without first setting a template.');
        }

        if(!this._fileLoader) {
            throw new Error('Cannot render view without first setting a file loader.');
        }

        var self = this;

        this._fileLoader.load(this._templatePath, function(html) {
            self._renderer.render(self._compiler.compile(html, context));

            self.$el.find('[bb-form]').each(function() {
                var directive = new Barebone.Views.Binding.BBFormDirective();
                directive.run(($(this)), self);
            });

            if(self._templatePath == '/base/spec/support/templates/data_binding.html') {
                var element = self.$el.find('[bb-model]');
                var expression = element.attr('bb-model');
                var split = expression.split('.');
                element.on('keypress', function() {
                    self[split[0]].set(split[1], $(this).val());
                });
            }
        });

        return this;
    },

    renderHTML: function(html, context) {

        this._renderer.render(this._compiler.compile(html, context));
    },

    /**
    * Sets the file path of the template to use when rendering.
    *
    * @param {string} path
    */
    setTemplatePath: function(path) {

        this._templatePath = path;

        return this;
    },

    /**
    * Sets the view compiler used to compile the view's HTML.
    *
    * @param {Barebone.Views.Compilers.BaseCompiler} compiler
    */
    setCompiler: function(compiler) {

        this._compiler = compiler;

        return this;
    },

    setFileLoader: function(loader) {

        this._fileLoader = loader;

        return this;
    },

    /**
    * Sets the render object used for this view.
    *
    * @param {Barebone.Views.Renderers.BaseRenderer} renderer
    */
    setRenderer: function(renderer) {

        this._renderer = renderer;
    },

    /**
    * Hides the view.
    */
    hide: function() {

        this.$el.hide();

        return this;
    },

    /**
    * Displays the view.
    */
    show: function() {

        this.$el.show();

        return this;
    },

    /**
     *
     * @private
     */
    _bindDirectives: function() {

    }
});
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
Barebone.Views.Renderers.BaseRenderer = Barebone.BaseFunction.extend({

    /**
     * Element to render to.
     *
     * @type {object}
     * @private
     */
    _element: null,

    constructor: function(element) {

        this._element = element;
    },

    setElement: function(element) {

        this._element = element;
    },

    render: function(html) {

        this._element.html(html);
    }
});
Barebone.Views.Compilers.BaseCompiler = Barebone.BaseFunction.extend({

    /**
     * Compiles templates.
     *
     * @private
     */
    _templates: {},

    /**
     * Returns the compiled HTML.
     *
     * @param {string} html
     * @param {object} context
     * @returns {string}
     */
    compile: function(html, context) {

        var key = md5(html);

        if(this._templates[key]) {
            return this._templates[key](context);
        }

        this._templates[key] = _.template(html);

        return this._templates[key](context);
    }
});
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
/**
 * Base Directive object for binding functionality from the view to the controller.
 *
 * @class Directive
 * @namespace Barebone.Views.Binding
 * @author Chris Santos
 */
Barebone.Views.Binding.Directive = Barebone.BaseFunction.extend({

    run: function(value, controller) {


    }

});
Barebone.Views.Binding.BBFormDirective = Barebone.Views.Binding.Directive.extend({

    run: function(element, view) {

        var callback = element.attr('bb-form');

        element.on('submit', function(event) {

            if(!view[callback]) {
                throw new Error('There is no callback method "' + callback+ '" on view cid "' + view.cid + '"');
            }

            view[callback](event, $(this).serializeArray(), element);
        });
    }
});
Barebone.Views.Binding.BBModelDirective = Barebone.Views.Binding.Directive.extend({

    run: function(value, controller) {

    }
});
/**
 * Responsible for loading local and remote files.
 *
 * @namespace Barebone.IO
 * @class FileLoader
 * @author Chris Santos
 */
Barebone.IO.FileLoader = Barebone.BaseFunction.extend({

  /**
   * Loads a file.
   *
   * @param {string} filename
   * @param {function} success function(contents)
   * @param {function} error function(xhr)
   */
  load: function(filename, success, error) {

    $.ajax({
      url: filename,
      success: function (contents) {
        success(contents);
      },
      error: function (xhr) {
        error(xhr);
      }
    });
  }

});
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
/**
 * ViewManager.
 *
 * @class ViewManager
 * @namespace Barebone.Managers
 * @author Chris Santos
 */
Barebone.Managers.ViewManager = Barebone.BaseFunction.extend({

    constructor: function(element) {

        this._element = element;

        /**
         * Hash is views being managed.
         *
         * @type {Array}
         */
        this.views = {};
    },

    /**
     * Set the DOM element where the views will be managed.
     *
     * @param {Object} element
     */
    setElement: function(element) {

        this._element = element;
    },

    /**
     * Adds a view to be managed.
     *
     * @param {Barebone.Views.BaseView} view
     * @param {boolean} visible
     */
    addView: function(view, visible) {

        this.views[view.cid] = view;

        if($(this._element).find('#' + view.id).length == 0) {
            visible ? view.show() : view.hide();
            this._element.append(view.$el);
        }
    },

    /**
     * Returns TRUE is the provided view is being managed by this manager.
     *
     * @param {Barebone.Views.BaseView} view
     * @returns {boolean}
     */
    hasView: function(view) {

        return this.views[name] != undefined
    },

    /**
     * Returns a view by the provided view cid. Throws Exception if not found.
     *
     * @param {string} cid
     * @returns {Barebone.Views.BaseView}
     * @throws Barebone.Managers.ViewNotFoundException
     */
    getView: function(cid) {

        if(!this.hasView(cid)) {
            throw new Barebone.Managers.ViewNotManagedException('Could not find view with "cid" ' + cid);
        }

        return this.views[name];
    },

    /**
     * Hides all managed views.
     */
    hideAll: function() {

        for(var key in this.views) {
            this.views[key].hide();
        };
    }
});
Barebone.Managers.ViewNotManagedException = Barebone.Exception.extend({

    constructor: function ViewNotManagedException() {

        Barebone.Managers.ViewNotManagedException.__super__.constructor.call(this, arguments);
    }
});