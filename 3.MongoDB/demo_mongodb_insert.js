var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/mydb";

MongoClient.connect(url, function(err, db) {
	if(err) throw err;
	console.log("Connected to Database!");
	var myObj = {name: "Company Inc.", address: "Highway 37"};
	db.collection("customers").insertOne(myObj, function(err, res){
		if(err) throw err;
		console.log("Inserted one document.");
		db.close();
	});
});