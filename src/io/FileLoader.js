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
   * @param {function} callback function(contents)
   */
  load: function(filename, callback) {

    $.ajax({
      url: filename,
      success: function (contents) {
        callback(contents);
      },
      error: function () {
        throw new Error('There was an error loading contents from: ' + filename);
      }
    });
  }
});