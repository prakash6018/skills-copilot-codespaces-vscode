// Create web server
// Load the http module to create an http server.
var http = require('http');
var fs = require('fs');
var url = require('url');
var querystring = require('querystring');

var comments = [];

// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {
  // Get the path
  var path = url.parse(request.url).pathname;
  console.log('path: ' + path);
  // Get the query
  var query = url.parse(request.url).query;
  console.log('query: ' + query);
  // Get the method
  var method = request.method;
  console.log('method: ' + method);
  // Get the body
  var body = '';
  request.on('data', function (data) {
    body += data;
  });
  request.on('end', function () {
    // Get the query
    var query = url.parse(request.url).query;
    console.log('query: ' + query);
    console.log('body: ' + body);
    // Get the method
    var method = request.method;
    console.log('method: ' + method);
    // Get the path
    var path = url.parse(request.url).pathname;
    console.log('path: ' + path);
    if (method === 'GET' && path === '/comments') {
      response.writeHead(200, {'Content-Type': 'application/json'});
      response.end(JSON.stringify(comments));
    } else if (method === 'POST' && path === '/comments') {
      var comment = querystring.parse(body);
      comments.push(comment);
      response.writeHead(201, {'Content-Type': 'application/json'});
      response.end(JSON.stringify(comment));
    } else {
      response.writeHead(404, {'Content-Type': 'text/plain'});
      response.end('Not Found');
    }
  });
});

// Listen on port 8000, IP defaults to