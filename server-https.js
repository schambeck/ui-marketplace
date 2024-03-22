var express = require('express');
var https = require('https');
var http = require('http');
var fs = require('fs');
var path = require('path');

// This line is from the Node.js HTTPS documentation.
var options = {
  key: fs.readFileSync('cert/client-key.pem'),
  cert: fs.readFileSync('cert/client-cert.pem')
};

// Create a service (the app object is just a callback).
var app = express();
app.use(express.static(__dirname + '/dist/ui-marketplace'));
app.get('/*', function(req,res) {
res.sendFile(path.join(__dirname + '/dist/ui-marketplace/index.html'));});

// Create an HTTP service.
http.createServer(app).listen(4200);
// Create an HTTPS service identical to the HTTP service.
https.createServer(options, app).listen(4443);
