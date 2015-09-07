describe("Barebone.Views.BaseView", function() {

  var view;

  beforeEach(function() {
    view = new Barebone.Views.BaseView();
  });

  describe('View Setup', function() {

    it("should throw an Exception if rendering without setting an engine", function() {
      expect(view.render).toThrowError(Error);
    });
  });

  describe('View Rendering', function() {

    it("should properly render a view with no context", function (done) {
      view.setFileLoader(new Barebone.IO.FileLoader())
      view.setRenderEngine(new Barebone.Views.Compilers.BaseCompiler());
      view.setTemplatePath('./support/templates/hello_world.html');
      view.render();
      done();

      expect(view.$el.html()).toEqual('Hello World!');
    });

    it("should properly render a view with context", function (done) {
      view.setFileLoader(new Barebone.IO.FileLoader())
      view.setRenderEngine(new Barebone.Views.Compilers.BaseCompiler());
      view.setTemplatePath('./support/templates/my_name.html');
      view.render({name: 'Sephiroth'});
      done();

      expect(view.$el.html()).toEqual('My name is Sephiroth');
    });
  });


  describe('View Functionality', function() {

    it("should successfully hide the view when hide() is called.", function () {
      view.hide();

      expect(view.$el.css('display')).toEqual('none');
    });

    it("should successfully display the view when show() is called.", function () {
      view.show();

      expect(view.$el.css('display')).toEqual('block');
    });
  });

});
