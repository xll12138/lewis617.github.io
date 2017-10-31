var DOCUMENT_ROOT = './public';
var DIRECTORY_INDEX = 'index.html';

var port = process.env.PORT || 8080;

var zlib = require('zlib');
var http = require('http');
var path = require('path');
var fs = require('fs');
var mime = require('mime');

http.createServer(function (req, res) {
  if (req.url.indexOf('?') > -1) {
    req.url = req.url.substr(0, req.url.indexOf('?'));
  }
  var filePath = DOCUMENT_ROOT + req.url;

  if (req.headers['host'] === 'liuyiqi.cn') {
    res.writeHead(301, { 'Location': 'http://www.liuyiqi.cn' + req.url });
    res.end();
  } else if (!fs.existsSync(filePath)) {
    res.writeHead(404);
    res.end();
  } else {
    if (fs.statSync(filePath).isDirectory()) {
      filePath = path.join(filePath, DIRECTORY_INDEX);
    }
    var acceptEncoding = req.headers['accept-encoding'] || '';
    fs.readFile(filePath, function (error, content) {
      if (error) {
        res.writeHead(500);
        res.end();
      }
      else {
        var raw = fs.createReadStream(filePath);

        res.setHeader("Content-Type", mime.getType(filePath));
        if (acceptEncoding.match(/\bdeflate\b/)) {
          res.writeHead(200, { 'content-encoding': 'deflate' });
          raw.pipe(zlib.createDeflate()).pipe(res);
        } else if (acceptEncoding.match(/\bgzip\b/)) {
          res.writeHead(200, { 'content-encoding': 'gzip' });
          raw.pipe(zlib.createGzip()).pipe(res);
        } else {
          res.writeHead(200, {});
          raw.pipe(res);
        }
      }
    });
  }
}).listen(port);

console.log('Serving files on http://localhost:' + port);
