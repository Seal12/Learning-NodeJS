var http = require('http');
var uc = require('upper-case');

http.createServer(function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write("<p>hello world</p>");
	res.write(uc("<p>hello world!</p>"));
	res.end();
}).listen(8080);