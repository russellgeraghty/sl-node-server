var React = require("react");
var Article = require("./article.jsx");
var Articles = require("./articles.jsx");

var ArticleService = React.createClass({

  getInitialState: function() {
    var initialData = this.props.initialData;

    return initialData;
  },

  componentWillUpdate: function(newProps, newState) {
    // When the state changes push a query string so users can bookmark
    // or share the link to a chosen article.
    window.history.pushState(null, null, utils.formatQueryString(newState));
  },

  componentDidMount: function() {
    window.addEventListener("tt:update", this.handleUpdate, false);
  },

  componentWillUnmount: function() {
    window.removeEventListener("tt:update", this.handleUpdate, false);
  },

  render: function() {
    return (
      <div className="layout">
        <div className="layout__sidebar">
          <Articles article={this.props.articles} />
        </div>
        <div className="layout__content">
          /*<Article line={this.state.articleId} initialData={this.props.initialData} />*/
        </div>
      </div>
    );
  }

});

module.exports = ArticleService;
