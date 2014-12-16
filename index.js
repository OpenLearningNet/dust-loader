var path = require('path');
var dust = require('dustjs-linkedin');

module.exports = function(content) {
  if (this.cacheable) {
    this.cacheable();
  }
  var callback = this.async();

  var name = this.resourcePath
    .replace(this.options.context, '') // Remove unecessary path info
    .replace(new RegExp("^" + path.sep), '') // Remove leading path separator
    .split(path.sep).join('/'); // Use unix path separator
  try {
    var compiled = dust.compile(content, name);
  } catch (err) {
    return callback(err);
  }

  var result =
    "var dust = require('dustjs-linkedin');" +
    compiled +
    "dust.log(\"Registering template: " + name + "\", \"DEBUG\"); " +
    "module.exports = \"" + name + "\";";

  callback(null, result);
};
