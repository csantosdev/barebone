describe("Barebone.IO.FileLoader", function() {

  var loader;

  beforeEach(function() {
    loader = new Barebone.IO.FileLoader();
  });

  it("should be able to load a local file", function(done) {
    var contents;
    loader.load('./support/templates/hello_world.html', function (_contents) {
      contents = _contents;
    });
    done();

    expect(contents).toEqual('Hello World!');
  });

  it("should throw an Error if loading a file that does not exist", function(done) {

    var go = function() {
      loader.load('./support/templates/404.html');
    };
    done();

    expect(go).toThrowError(Error);
  });
});
