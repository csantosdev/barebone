describe("Barebone.Views.Binding.Directive", function() {

    var viewController;

    beforeEach(function() {
      viewController = new Barebone.Views.ViewController();
      viewController.setFileLoader(new Barebone.IO.FileLoader());
      viewController.setCompiler(new Barebone.Views.Compilers.BaseCompiler());
      viewController.setRenderer(new Barebone.Views.Renderers.BaseRenderer(viewController.$el));
      viewController.setTemplatePath('/base/spec/support/templates/data_binding.html');
    });

    describe('BBSubmitDirective', function() {

        it("should call provided callback", function(done) {

            var called = false;
            var title = 'Engineer';
            var age = 21;

            viewController.onFormSubmit = function(event, data) {
                event.preventDefault();

                expect(data[0].name).toEqual('title');
                expect(data[0].value).toEqual(title);
                expect(data[1].name).toEqual('age');
                expect(data[1].value).toEqual(age.toString());

                called = true;
            };
            viewController.render();

            setTimeout(function() {
                viewController.$el.find('[name=title]').val(title);
                viewController.$el.find('[name=age]').val(age);
                viewController.$el.find('form').trigger('submit');

                expect(called).toEqual(true);
                done();
            }, DOM_UPDATE_WAIT);
        });

    });

    describe('BBModelDirective', function() {

        it("should set the model property", function(done) {

            var user = new Backbone.Model({first_name: 'Sephiroth'});
            viewController.user = user;
            viewController.render();

            var newName = 'Cloud';

            setTimeout(function() {
                viewController.$el.find('#first_name').val(newName);
                viewController.$el.find('#first_name').trigger('keypress');

                expect(user.get('first_name')).toEqual(newName);
                done();
            }, DOM_UPDATE_WAIT);
        });

    });

    describe('BBClickDirective', function() {

        it("should execute expression within bb-click", function(done) {

            var user = new Backbone.Model({first_name: 'Sephiroth'});
            var model = new Backbone.Model({id: 1});
            var collection = new Backbone.Collection([model]);
            collection.removeById = function(id) {
                var model = this.get(id);
                this.remove(model);
            };

            user.set('myCollection', collection);

            viewController.user = user;
            viewController.render();

            setTimeout(function() {
                expect(collection.length).toEqual(1);
                viewController.$el.find('#click-test').trigger('click');
                expect(collection.length).toEqual(0);
                done();
            }, DOM_UPDATE_WAIT);
        });

    });
});
