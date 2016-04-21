require("node-jsx").install({ extension: ".jsx" });

var express = require("express");
var API = require("./app/server/articles-api");
var Bootstrap = require("./app/server/bootstrap.jsx");
var config = {};

// Start a new app
var app = express();

// Serve initial HTML
app.get("/", function(req, res) {
  new API(config).list(function(err, data) {
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
