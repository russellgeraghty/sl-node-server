var React = require("react");
var Template = require("../server/template");
var Articles = require("../component/articles.jsx");

function Bootstrap(data) {
  this.data = data;
}

Bootstrap.prototype.load = function(callback) {
  var staticHTML = React.renderToString(<Articles initialData={this.data} articles={this.data}/>);
  new Template("../view/index.html").render({ app: staticHTML, data: JSON.stringify(this.data) }, callback);
};

module.exports = Bootstrap;


