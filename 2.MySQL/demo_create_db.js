var mysql = require('mysql');

var con = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'password'
});

con.connect(function(err){
	if (err) throw err;
	console.log("Connected to db!");

	var sql_query = "CREATE DATABASE node_test_DB";
	con.query(sql_query, function(err, result){
		if (err) throw err;
		console.log("DB created!");
	});
});