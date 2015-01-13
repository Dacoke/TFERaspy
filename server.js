// server.js

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();
var port 	 = 80;

var morgan       = require('morgan');
var bodyParser   = require('body-parser');

//socket.io listens to an instance of http.Server
var server = require("http").Server(app);
var io = require("socket.io")(server);

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // get information from html forms

app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', '*');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	return next();
});

app.set('view engine', 'ejs'); // set up ejs for templating

app.set('message', '');
// routes ======================================================================
require('./app/routes.js')(app); // load our routes and pass in our app and fully configured passport

//socket openshift
io.on('connection', function (socket) {
	socket.on('connection established', function (data) {
	  console.log(data);
	});
	//send message to localhost when received from openshift
	socket.on('message', function (message) {
		console.log('message received : ' + message);
		socket.emit('print', function(message){
			console.log('message sent to localhost' + message);
		});
			
		//app.set('message', message);
	});
});

// launch ======================================================================
server.listen(port, function(){
  console.log("The magic happens on port " + port);
});