var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/mydb";

MongoClient.connect(url, function(err, db) {
	if(err) throw err;
	console.log("Connected to database!");

	var myquery = {name: "Company Inc."};
	var newVals =  {$set: {address: 'flava 535' }};
	db.collection("customers").updateOne(myquery, newVals, function(err, res){
		if(err) throw err;
		console.log("1 document updated!");
		db.close()
	});
});