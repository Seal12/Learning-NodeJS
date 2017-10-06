var mysql = require('mysql');

var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "password",
	database: "node_test_DB"
});

con.connect(function(err) {
	if(err) throw err;
	console.log("Connect to database!");
	var sql_query = "INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37')";
	con.query(sql_query, function(err, result){
		if(err) throw err;
		console.log("1 record inserted.");
	});
});