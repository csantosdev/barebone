describe("Default View Compiler", function() {

  var view;

  beforeEach(function() {
    view = new Barebone.Views.BaseView();
  });

  it("should render a view with context", function(done) {
    view.setTemplatePath('./support/templates/my_name.html');
    view.setRenderEngine(new Barebone.Views.Compilers.BaseCompiler());
    view.render({name: 'Sephiroth'});
    done();

    expec(view.$el.html()).toEqual('My name is Sephiroth');
  });

  it("should render a view without context", function(done) {
    view.setTemplatePath('./support/templates/hello_world.html');
    view.setRenderEngine(new Barebone.Views.Compilers.HandlebarsCompiler());
    view.render();
    done();

    expec(view.$el.html()).toEqual('Hello World!');
  });

});