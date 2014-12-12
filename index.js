var path = require('path');
var dust = require('dustjs-linkedin');

module.exports = function(content) {
  if (this.cacheable) {
    this.cacheable();
  }


  var name = this.resourcePath.replace(this.options.context, '').split(path.sep).join('/'),
    compiled = dust.compile(content, name);

  return "module.exports = function(dust) {" +
  	"if (dust.isDebug) {" +
  	  "console.log(\"[dust] Registering template: " + name + "\"); " +
  	"}" +
  	compiled +
  	"return \"" + name + "\";" +
  "};";
};
