var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/mydb";

MongoClient.connect(url, function(err, db) {
	if(err) throw err;
	db.collection("customers").find({}).toArray(function(err, res){
		if(err) throw err;
		console.log(res);
		db.close();
	});
});