var React = require("react");

var Article = React.createClass({
    render: function() {
        var headline = this.props.article.headline;
        var body = this.props.article.body;

        return (
        <div className={"article"}>
           <h1>{headline}</h1>
           <p>{body}</p>
        </div>
        );
    }
});


module.exports = Article;