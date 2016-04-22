var React = require("react");

var Articles = React.createClass({

  getInitialState: function() {
    return {
      collapsible: global ? false : window.innerWidth <= 800,
      open: false
    };
  },

  handleToggle: function() {
    this.setState({ open: !this.state.open });
  },

  handleResize: function() {
    this.setState({ collapsible: window.innerWidth <= 800 });
  },

  componentDidMount: function() {
    // Simple event debouncing to avoid multiple recalculations
    this.debounce = utils.debounceEvent(this.handleResize, 250);
    window.addEventListener("resize", this.debounce, false);
  },

  componentWillUnmount: function() {
    window.removeEventListener("resize", this.debounce, false);
  },

  render: function() {
    var articles = this.props.articles;

    var toggleText = this.state.open ? "Close" : "Open";
    var toggleClass = this.state.collapsible ? (this.state.open ? "is-open" : "is-closed") : "is-static";

    var articleList = [];
    for (var key in articles) {
      if (articles.hasOwnProperty(key)) {
        articleList.push(<Article key={key} articleId={key} headline={articles[key]['headline']} />);
      }
    }

    return (
      <div className={"articles " + toggleClass}>
        <ul>
          {articleList}
        </ul>
      </div>
    );
  }

});

var Article = React.createClass({
  render: function() {
    console.log(this.props);
    var articleId = this.props.articleId;
    var headline = this.props.headline;

    return (
      <li>
        <a href={"article/" + articleId}>{headline}</a>
      </li>
    );
  }

});

module.exports = Articles;
