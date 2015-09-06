Barebone.Views.BaseView = Backbone.View.extend({

  initialize: function() {

    /**
     * Path to the template.
     *
     * @type {string}
     * @private
     */
    this._templatePath = null;

    /**
     * FileLoader instance.
     *
     * @type {Barebone.IO.FileLoader}
     * @private
     */
    this._fileLoader;

    /**
     * Render engine instance.
     *
     * @type {Barebone.Engines.RenderEngine}
     * @private
     */
    this._engine = null;

    /**
     * View compiler instance.
     *
     * @type {Barebone.Views.Compilers.BaseCompiler}
     * @private
     */
    this._compiler;

    /**
     * Renderer instance.
     *
     * @type {Barebone.Views.Renderers.BaseRenderer}
     * @private
     */
    this._renderer;
  },

  /**
   * Renders the template onto the view's DOM.
   *
   * @param {object} context
   */
  render: function(context) {

    this._render(context);

    return this;
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
   * Sets the render engine to use when rendering the view.
   *
   * @param {Barebone.Engines.Engine} engine
   */
  setRenderEngine: function(engine) {

    this._engine = engine;

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
   * Update elements to the DOM.
   *
   * @private
   */
  _render: function(context) {

    if(!this._compiler) {
      throw new Error('Cannot render view, there is no compiler attached.');
    }

    var self = this;

    this._compiler.processTemplate(this._templatePath, context, function(html) {
      self._renderer.render(html);
    });
  }
});