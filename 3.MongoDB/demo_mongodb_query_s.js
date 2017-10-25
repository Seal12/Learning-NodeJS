var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/mydb"

MongoClient.connect(url, function(err, db) {
	if(err) throw err;
	console.log("Connected to database!");
	var query = { address: /^S/ };
	db.collection("customers").find(query).toArray(function(err, res){
		if(err) throw err;
		console.log(res);
		db.close();
	});
});