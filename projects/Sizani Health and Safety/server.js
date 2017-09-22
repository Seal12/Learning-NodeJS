var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var mysql = require('mysql');

//initialize socket arrays
var socketConnections = [];
var onlineParties = [];
var availableAmbulances = {};
var helpSeekers = {};
var HelpPair = {};

//Start Server
const PORT = process.env.PORT || 8081;
server.listen(PORT);//
console.log("Server Running on PORT %d", PORT);

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.js');
});

process.on('uncaughtException', function(error){
	console.log(error.stack);
});

io.sockets.on('connection', function(socket){
	//socketConnections is a list of ambulance on duty.
	socketConnections.push(socket);
	console.log('Log: %s sockets connected.', socketConnections.length);

	//When a connection is established, the spci
	socket.on('online', function(entity_ID){
		onlineParties.push(entity_ID);
	});

	//Ambulance becomes available. Both ID and location must be saved.
	//Ambulance must also check if there is no help seekers on the wait list.
	socket.on('ambulanceAvailable', function(Ambulance_ID, location){
		console.log('%s is available.', Ambulance_ID);
		availableAmbulances[Ambulance_ID] = {
										socketID 	: socket.id,
										longitude	: location.longitude,
										altitude	: location.altitude
									};

		var num_help_seeker = Object.keys(helpSeekers).length;

		//If number of waiting helpseeker is creater than 0, then there is at least one help seeker in need.
		//Seach through list of help seekers and assist closest one.
		if(length > 0){
			var seeker;
			var shortest_dist = Infinity, closest_seeker_ID;
			var seeker_dist;

			//Check all help seekers and find the closest one
			for(seeker in helpSeekers){
				x = Math.pow(location.longitude - seeker.longitude, 2);
				y = Math.pow(location.altitude - seeker.altitude, 2);
				seeker_dist = Math.sqrt(x+y);

				if(seeker_dist < shortest_dist){
					shortest_dist = seeker_dist;
					closest_seeker_ID = seeker;
				}
			}

			//Accept help request
			HelpPair[Ambulance_ID] = closest_seeker_ID;

			var helpSeeker_data = helpSeekers[closest_seeker_ID];

			var socketIndex = onlineParties.indexOf(closest_seeker_ID);
			var helpSeeker_socket = socketConnections[socketIndex];

			socket.emit('foundHelpseeker', helpSeeker_data); //tell ambulance, help seeker found.
			helpSeeker_socket.emit('foundHelp', availableAmbulances[Ambulance_ID]); //tell help seeker, ambulance found.
			console.log(Ambulance_ID + " is assisting " + closest_seeker_ID + ".");
		}
	});

	//Help seeker request for help: User_id, location, description.
	//Help seeker must also check if there are not ambulance on standby.
	socket.on('requestHelp', function(User_id, location, description){
		console.log('%s requested help.', User_id);
		helpSeekers[User_id] = {
							longitude	: location.longitude,
							altitude	: location.altitude,
							descrip	: description
						};

		var num_Available_Ambulances = Object.keys(availableAmbulances).length;

		//If length is creater than 0, then there is at leas one available ambulance.
		//Seach through list of ambulances and get closest one.
		if(num_Available_Ambulances > 0){
			var ambulance;
			var shortest_dist = Infinity, closest_ambulance;
			var ambulance_dist;

			//Check all ambulances and find the closest one
			for(ambulance in availableAmbulances){
				x = Math.pow(location.longitude - ambulance.longitude, 2);
				y = Math.pow(location.altitude - ambulance.altitude, 2);
				ambulance_dist = Math.sqrt(x+y);

				if(ambulance_dist < shortest_dist){
					closest_ambulance = ambulance;
					shortest_dist = ambulance_dist;
				}
			}

			//Accept help request
			HelpPair[closest_ambulance] = User_id;

			var ambulance_data = availableAmbulances[closest_ambulance];

			var socketIndex = onlineParties.indexOf(closest_ambulance);
			var ambulance_socket = socketConnections[socketIndex];

			socket.emit('foundHelp', ambulance_data); //tell ambulance, help seeker found.
			ambulance_socket.emit('foundHelpseeker', helpSeekers[User_id]); //tell help seeker, ambulance found.
		}
	});

	//Update the Ambulances location
	socket.on('updateAmbulanceLocation', function(Ambulance_ID, location){
		availableAmbulances[Ambulance_ID].longitude = location.longitude;
		availableAmbulances[Ambulance_ID].altitude = location.altitude;

		if(Ambulance_ID in HelpPair){
			var helpSeeker_ID = HelpPair[Ambulance_ID];

			var socketIndex = onlineParties.indexOf(helpSeeker_ID);
			var helpSeeker_socket = socketConnections[socketIndex];

			helpSeeker_socket.emit('locationUpdate', availableAmbulances[Ambulance_ID]); //tell help seeker, ambulance found.
		}
	});

	//Update the Help seekers location
	socket.on('updateHelpSeekersLocation', function(User_id, location){
		helpSeekers[User_id].longitude = location.longitude;
		helpSeekers[User_id].altitude = location.altitude;

		var pair_number = Object.values(HelpPair).indexOf(User_id);
		if(pair_number > -1){
			var Ambulance_ID = HelpPair[Object.keys(HelpPair)[pair_number]];

			var socketIndex = onlineParties.indexOf(Ambulance_ID);
			var ambulance_socket = socketConnections[socketIndex];

			ambulance_socket.emit('locationUpdate', helpSeekers[User_id]); //tell help seeker, ambulance found.
		}
	});

	//Acknowledge that ambulance reached help seeker.
	//Remove ambulance from available list and help seeker from help seeker list.
	socket.on('reachedHelpseeker', function(Ambulance_ID){
		var helpSeeker_ID = HelpPair[Ambulance_ID];
		delete availableAmbulances[Ambulance_ID];
		delete helpSeekers[helpSeeker_ID];
		delete HelpPair[Ambulance_ID];
	});

	socket.on('disconnect', function(data){
		var socketIndex = socketConnections.indexOf(socket);
		socketConnections.splice(socketIndex, 1);
		onlineParties.splice(socketIndex, 1);
		connection.end();
		console.log("%s disconnected. %s connections left", data, socketConnections.length);
	})
});