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
        {articleList}
        <button type="button" className="article__toggle" onClick={this.handleToggle}>{toggleText}</button>
      </div>
    );
  }

});

var Article = React.createClass({

  handleSubmit: function(event) {
    event.preventDefault();

    // Dispatch an event for other components to capture
    var updateEvent = new CustomEvent("tt:update", {
      detail: {
        article: React.findDOMNode(this.refs.article).value
      },
      bubbles: true
    });

    React.findDOMNode(this.refs.form).dispatchEvent(updateEvent);
  },

  render: function() {
    var articleId = this.props.articleId;
    var headline = this.props.headline;

    return (
      <form ref="form" onSubmit={this.handleSubmit}>
        <fieldset>
          <input name="articleId" value={articleId} readOnly="true"/>
          <input name="headline" value={headline} readOnly="true"/>
          <button type="submit" title="View article">Go</button>
        </fieldset>
      </form>
    );
  }

});

module.exports = Articles;
