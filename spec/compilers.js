describe("Barebone.Views.Compilers", function() {

  describe('::BaseCompiler', function() {

    beforeEach(function () {
      compiler = new Barebone.Views.Compilers.BaseCompiler();
    });

    it("should compile HTML with context", function() {
      var template = '<div>My name is <%= name%></div>';
      var context = {name: 'Sephiroth'};
      var html = compiler.compile(template, context);

      expect(html).toEqual('<div>My name is Sephiroth</div>');
    });

    it("should compile HTML without context", function() {
      var template = '<div>Test</div>';
      var html = compiler.compile(template);

      expect(html).toEqual(template);
    });
  });

  describe('::HandlebarsCompiler', function() {

    beforeEach(function () {
      compiler = new Barebone.Views.Compilers.HandlebarsCompiler();
    });

    it("should compile HTML with context", function() {
      var template = '<div>My name is {{name}}</div>';
      var context = {name: 'Sephiroth'};
      var html = compiler.compile(template, context);

      expect(html).toEqual('<div>My name is Sephiroth</div>');
    });

    it("should compile HTML without context", function() {
      var template = '<div>Test</div>';
      var html = compiler.compile(template);

      expect(html).toEqual(template);
    });
  });

});
