var mysql = require('mysql');

var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "node_test_DB"
});

con.connect(function(err) {
	if(err) throw err;
	console.log("Connected to DB!");
	var sql_query = "SELECT * FROM customers LIMIT 5";
	con.query(sql_query, function(err, result, fields){
		if(err) throw err;
		console.log(result);
	});
});