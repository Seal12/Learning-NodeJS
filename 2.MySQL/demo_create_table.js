var mysql = require('mysql');

var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "node_test_DB"
});

con.connect(function(err){
	if (err) throw err;
	console.log("Connected to database!");

	var sql_query = "CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255))";
	con.query(sql_query, function(err, result){
		if(err) throw err;
		console.log("Table created");
	});
});