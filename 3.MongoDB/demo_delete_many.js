var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/mydb";

MongoClient.connect(url, function(err, db) {
	if(err) throw err;
	console.log("Connected to database!");
	var query = { address: /^O/ };
	db.collection("customers").deleteMany(query, function(err, obj){
		if(err) throw err;
		console.log(obj.result);
		console.log(obj.result.n + " documents deleted!");
		db.close();
	});
});