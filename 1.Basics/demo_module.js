var http = require('http');
var dt = require('./myfirstmodule');

//Create a server Object
http.createServer(function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/html'});

	//Write a response to the client
	res.write("The current date and time are: " + dt.myDateTime());
	res.write("url: " + req.url);
	res.end();//end response
}).listen(8080);//server object listens on port 8080