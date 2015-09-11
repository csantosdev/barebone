describe("Barebone.Views.ViewController", function() {

  var viewController;

  describe('ViewController Setup', function() {

    beforeEach(function() {
      viewController = new Barebone.Views.ViewController();
    });

    it("should throw an Exception if rendering without setting an engine", function() {
      expect(viewController.render).toThrowError(Error);
    });

  });

  describe('ViewController Rendering', function() {

    beforeEach(function() {
      viewController = new Barebone.Views.ViewController();
    });

    it("should properly render a view with no context", function (done) {
      viewController.setFileLoader(new Barebone.IO.FileLoader());
      viewController.setCompiler(new Barebone.Views.Compilers.BaseCompiler());
      viewController.setRenderer(new Barebone.Views.Renderers.BaseRenderer(viewController.$el));
      viewController.setTemplatePath('/base/spec/support/templates/hello_world.html');
      viewController.render();

      // Wait for DOM to update
      setTimeout(function() {
        expect(viewController.$el.html()).toEqual('Hello World!');
        done();
      }, DOM_UPDATE_WAIT);

    });

    it("should properly render a view with context", function (done) {
      viewController.setFileLoader(new Barebone.IO.FileLoader());
      viewController.setCompiler(new Barebone.Views.Compilers.BaseCompiler());
      viewController.setRenderer(new Barebone.Views.Renderers.BaseRenderer(viewController.$el));
      viewController.setTemplatePath('/base/spec/support/templates/my_name.html');
      viewController.render({name: 'Sephiroth'});

      // Wait for DOM to update
      setTimeout(function() {
        expect(viewController.$el.html()).toEqual('My name is Sephiroth');
        done();
      }, DOM_UPDATE_WAIT);

    });
  });


  describe('ViewController Functionality', function() {

    describe('Data Binding', function() {

      it('should bind a model to an input element via the bb-model directive', function(done) {

        viewController.setFileLoader(new Barebone.IO.FileLoader());
        viewController.setCompiler(new Barebone.Views.Compilers.BaseCompiler());
        viewController.setRenderer(new Barebone.Views.Renderers.BaseRenderer(viewController.$el));
        viewController.setTemplatePath('/base/spec/support/templates/data_binding.html');

        var User = Backbone.Model.extend({});

        viewController.user = new User();
        viewController.render();

        // Wait for DOM to update
        setTimeout(function() {
          var new_name = 'Sephiroth';
          viewController.$el.find('#first_name').val(new_name);
          viewController.$el.find('#first_name').trigger('keypress');

          expect(viewController.user.get('first_name')).toEqual(new_name)
          done();

        }, DOM_UPDATE_WAIT);
      });
    });

    it("should successfully hide the view when hide() is called.", function () {
      viewController.hide();

      expect(viewController.$el.css('display')).toEqual('none');
    });

    it("should successfully display the view when show() is called.", function () {
      viewController.show();

      expect(viewController.$el.css('display')).toEqual('block');
    });
  });

});
