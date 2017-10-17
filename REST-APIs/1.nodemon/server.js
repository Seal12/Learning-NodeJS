// server.js

const express = require("express");
const MongoClient = require("mongodb");
const bodyParser = require("body-parser");

const app = express();

const port = 8080;

app.listen(port, () =>{
	console.log("Server running on port " + port)
});