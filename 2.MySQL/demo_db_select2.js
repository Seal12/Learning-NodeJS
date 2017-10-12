var mysql = require('mysql');

var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "node_test_DB"
});

con.connect(function(err) {
	if(err) throw err;
	console.log("Connected to database.");
	var sql_query = "SELECT name, address FROM customers";
	con.query(sql_query, function(err, result, field){
		if (err) throw err;
		console.log(result);
		console.log("\n");
		console.log(field);
		return;
	});
});