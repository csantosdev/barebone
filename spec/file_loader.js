describe("Barebone.IO.FileLoader", function() {

  var loader;

  beforeEach(function() {
    loader = new Barebone.IO.FileLoader();
  });

  it("should be able to load a local file", function(done) {

    var success = function(contents) {
      expect(contents).toEqual('Hello World!');
      done();
    };

    var error = function() {
      expect(false).toEqual(true); // This should never execute.
      done();
    };

    loader.load('/base/spec/support/templates/hello_world.html', success, error);
  });

  it("should call error callback when loading a file that does not exist", function(done) {

    var success = function(contents) {
      expect(false).toEqual(true); // This should never execute.
      done();
    };

    var error = function() {
      done();
    };

    loader.load('/base/spec/support/templates/404.html', success, error)

  });
});
