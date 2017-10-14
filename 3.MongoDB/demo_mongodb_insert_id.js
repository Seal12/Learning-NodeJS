var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/mydb";

MongoClient.connect(url, function(err, db) {
	if(err) throw err;
	console.log("Connected to Database!");
	var myObjs = [
		{ _id: 154, name: 'Chocolate Heaven'},
		{ _id: 155, name: 'Tasty Lemon'},
		{ _id: 156, name: 'Vanilla Dream'}
	];

	db.collection("products").insertMany(myObjs, function(err, res){
		if(err) throw err;
		console.log("Inserted " + res.insertedCount + " documents.");
		console.log(res);
		db.close();
	})
});