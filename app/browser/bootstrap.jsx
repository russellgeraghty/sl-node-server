var React = require("react");
var ArticleService = require("../component/article-service.jsx");

window.app = (function() {
  var requiredFeatures = {
    "JSON decoding": window.JSON,
    "the selectors API": document.querySelector,
    "ES5 array methods": Array.prototype.forEach,
    "DOM level 2 events": window.addEventListener,
    "the HTML5 history API": window.history.pushState
  };

  for (var feature in requiredFeatures) {
    if (!requiredFeatures[feature]) {
      return alert("Sorry, but your browser does not support " + feature + " so this app won't work properly.");
    }
  }

  var initialData = JSON.parse(document.getElementById("initial-data").innerHTML);
  return React.render(<ArticleService networkData={networkData} initialData={initialData} />, document.getElementById("app"));
})();
