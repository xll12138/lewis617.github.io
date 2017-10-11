var request = require('request');

var fs = require("fs");
var data = fs.readFileSync('public/sitemap.xml');
var array = data.toString().match(/http:\/\/www.liuyiqi.cn\/\d*\/\d*\/\d*\/[\w-]*\//g)
var body = array.join('\n');

request.post(
  {
    url: 'http://data.zz.baidu.com/urls?site=www.liuyiqi.cn&token=iXikmQ5JiHNvr7tz',
    headers: {
      'Content-Type': 'text/plain'
    },
    body: body
  }, function (error, response, body) {
    console.log(body);
  }
);