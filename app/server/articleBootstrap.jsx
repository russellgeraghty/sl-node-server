var React = require("react");
var Template = require("../server/template");
var Article = require("../component/article.jsx");

function ArticleBootstrap(data) {
  this.data = data;
}

ArticleBootstrap.prototype.load = function(callback) {
  var staticHTML = React.renderToString(<Article article={this.data}/>);
  new Template("../view/index.html").render({ app: staticHTML, data: JSON.stringify(this.data) }, callback);
};

module.exports = ArticleBootstrap;
