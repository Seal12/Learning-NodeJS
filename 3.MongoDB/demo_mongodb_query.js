var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/mydb";

MongoClient.connect(url, function(err, db) {
	if(err) throw err;
	console.log("Connected to database!");
	var query = {address: "Mountain 21"};
	db.collection("customers").find(query, {_id: false}).toArray(function(err, res){
		if(err) throw err;
		console.log(res);
		db.close();
	});
});