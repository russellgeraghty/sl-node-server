var http = require("http");

function ArticlesAPIRequest(config) {
    this.config = config;
}

ArticlesAPIRequest.prototype.for = function(articleId) {
  this.articleId = articleId;
  return this;
};

ArticlesAPIRequest.prototype.list = function(callback) {
    var path = "/articles";
    var formatCallback = this.formatList.bind(this);

    var options = {
        path: path,
        hostname: "localhost",
        port: 5000
    }

    var request = http.request(options, function(response){
        var str = "";
        response.setEncoding("utf8");

        response.on("data", function(chunk){
            str += chunk;
        });

        response.on("end", function() {
            var responseJSON = formatCallback(str);

            if (responseJSON instanceof Error) {
                callback(responseJSON, null);
            } else {
                callback(null, responseJSON);
            }
        });

    });

    request.on("error", function(err) {
        callback(err);
        console.log(options.hostname + options.path);
    });

    request.end();
}


ArticlesAPIRequest.prototype.formatList = function(responseText, callback) {
  var parsedResponse = parseResponse(responseText);
  var formattedData = {};

  if (parsedResponse instanceof Error) {
    return parsedResponse;
  }

  var sortedData = parsedResponse.sort(function(a, b) {
    return a.articleId - b.articleId;
  });

  sortedData.forEach(function(record) {
    formattedData[record.id] = record;
  });

  return formattedData;
};


function parseResponse(responseText) {
    var jsonData;

    try {
        jsonData = JSON.parse(responseText);
    }
    catch(e) {
        return new Error("Data could not be parsed");
    }

    return jsonData;
};

module.exports = ArticlesAPIRequest;
