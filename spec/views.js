describe("Barebone.Views.BaseView", function() {

  var view;

  describe('View Setup', function() {

    beforeEach(function() {
      view = new Barebone.Views.BaseView();
    });

    it("should throw an Exception if rendering without setting an engine", function() {
      expect(view.render).toThrowError(Error);
    });

  });

  describe('View Rendering', function() {

    beforeEach(function() {
      view = new Barebone.Views.BaseView();
    });

    it("should properly render a view with no context", function (done) {
      view.setFileLoader(new Barebone.IO.FileLoader())
      view.setCompiler(new Barebone.Views.Compilers.BaseCompiler());
      view.setRenderer(new Barebone.Views.Renderers.BaseRenderer(view.$el));
      view.setTemplatePath('/base/spec/support/templates/hello_world.html');
      view.render();

      // Wait for DOM to update
      setTimeout(function() {
        expect(view.$el.html()).toEqual('Hello World!');
        done();
      }, DOM_UPDATE_WAIT);

    });

    it("should properly render a view with context", function (done) {
      view.setFileLoader(new Barebone.IO.FileLoader());
      view.setCompiler(new Barebone.Views.Compilers.BaseCompiler());
      view.setRenderer(new Barebone.Views.Renderers.BaseRenderer(view.$el));
      view.setTemplatePath('/base/spec/support/templates/my_name.html');
      view.render({name: 'Sephiroth'});

      // Wait for DOM to update
      setTimeout(function() {
        expect(view.$el.html()).toEqual('My name is Sephiroth');
        done();
      }, DOM_UPDATE_WAIT);

    });
  });


  describe('View Functionality', function() {

    describe('Data Binding', function() {

      it('should bind a model to an input element via the bb-model directive', function(done) {

        view.setFileLoader(new Barebone.IO.FileLoader());
        view.setCompiler(new Barebone.Views.Compilers.BaseCompiler());
        view.setRenderer(new Barebone.Views.Renderers.BaseRenderer(view.$el));
        view.setTemplatePath('/base/spec/support/templates/data_binding.html');

        var User = Backbone.Model.extend({});

        view.user = new User();
        view.render();

        // Wait for DOM to update
        setTimeout(function() {
          var new_name = 'Sephiroth';
          view.$el.find('#first_name').val(new_name);
          view.$el.find('#first_name').trigger('keypress');

          expect(view.user.get('first_name')).toEqual(new_name)
          done();

        }, DOM_UPDATE_WAIT);
      });
    });

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
