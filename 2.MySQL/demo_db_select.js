var mysql = require('mysql');

var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "node_test_DB"
});

con.connect(function(err) {
	console.log("connected to database");
	if(err) throw err;
	var sql_query = "SELECT * FROM customers"
	con.query(sql_query, function(error, result, fields){
		if(error) throw error;
		console.log("Result:");
		console.log(result);

		console.log('\n');
		for(var item in result){
			//console.log(item);
			console.log(result[item].name + " lives at " + result[item].address);
		}
	});
	console.log("Done!");
});