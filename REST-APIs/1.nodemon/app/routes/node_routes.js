//route/note_roiutes.js

module.exports = function(app, db) {
	app.get('/notes', function(req, res){
		//Create note here.
		return "Hello";
	});
}