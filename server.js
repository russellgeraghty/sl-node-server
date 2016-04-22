require("node-jsx").install({ extension: ".jsx" });

var express = require("express");
var articlesAPI = require("./app/server/articles-api");
var articleAPI = require("./app/server/article-api");
var Bootstrap = require("./app/server/bootstrap.jsx");
var ArticleBootstrap = require("./app/server/articleBootstrap.jsx");
var config = {};

// Start a new app
var app = express();

// Serve initial HTML
app.get("/", function(req, res) {
  new articlesAPI(config).list(function(err, data) {
    if (err) {
      console.log(err);
      return res.status(500).send("API error");
    }

    new Bootstrap(data).load(function(err, responseHTML) {
      if (err) {
        return res.status(500).send("Template error");
      }

      res.send(responseHTML);
    });

  });
});

// Serve initial HTML
app.get("/article/:articleId", function(req, res) {
  
  new articleAPI(config).for(req.params.articleId).get(function(err, data) {
    if (err) {
      console.log(err);
      return res.status(500).send("API error");
    }

    new ArticleBootstrap(data).load(function(err, responseHTML) {
      if (err) {
        return res.status(500).send("Template error");
      }

      res.send(responseHTML);
    });

  });
});

// Static assets
app.use(function(req, res, next) {
  if (req.url === "/scripts/bundle.js") {
    var pkg = app.get("env") === "development" ? "dev" : "min";
    req.url = "/scripts/bundle." + pkg + ".js";
  }

  next();
});

app.use(express.static("./public"));

var port = process.env.PORT || 8080;
app.listen(port);

console.log("Running server on port " + port + ", press ctrl + c to stop.");
