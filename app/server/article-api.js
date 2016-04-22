var http = require("http");

function APIRequest(config) {
    this.config = config;
}

APIRequest.prototype.for = function(articleId) {
  this.articleId = articleId;
  return this;
};

APIRequest.prototype.get = function(callback) {
    var formatCallback = this.format.bind(this);
    var path = "/article/" + this.articleId;

    var options = {
        path: path,
        hostname: "localhost",
        port: 5000
    }

    var request = http.request(options, function(response) {
        var str = "";

        response.setEncoding("utf8");

        response.on("data", function(chunk) {
            str+= chunk;
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

APIRequest.prototype.format = function(responseText, callback) {
  var parsedResponse = parseResponse(responseText);

  if (parsedResponse instanceof Error) {
    return parsedResponse;
  }

  var formattedData = {};
  formattedData.articleId = parsedResponse.articleId;
  formattedData.headline = parsedResponse.headline;
  formattedData.body = parsedResponse.body;
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

module.exports = APIRequest;
