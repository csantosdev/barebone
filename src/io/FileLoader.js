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
   * @param {string} filepath
   * @param {function} callback function(contents)
   */
  load: function(filepath, callback) {

    $.ajax({
      url: filename,
      success: function (contents) {
        callback(context);
      },
      error: function () {
        throw new Error('There was an error loading contents from: ' + filename);
      }
    });
  }
});