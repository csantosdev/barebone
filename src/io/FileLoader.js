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
   * @param {function} success function(contents)
   * @param {function} error function(xhr)
   */
  load: function(filename, success, error) {

    $.ajax({
      url: filename,
      success: function (contents) {
        success(contents);
      },
      error: function (xhr) {
        error(xhr);
      }
    });
  }

});