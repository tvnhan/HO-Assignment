"use strict";


const config = require('config');

// set up ======================================================================
var express = require('express');
var app = express(); 						// create our app w/ express
var mongoose = require('mongoose'); 				// mongoose for mongodb
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');




var master_db_config = config.get('db');

mongoose.connect('mongodb://' + master_db_config.user + ':' + master_db_config.password + '@' + master_db_config.url);


app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());




// routes ======================================================================
// routes ======================================================================
// require('./app/routes.js')(app, __dirname);
// app.get('*', function (req, res) {
//
//     console.log("send index.html");
//     console.log(dirname);
//     res.sendFile(dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
// });


// listen (start app with node server.js) ======================================
app.listen(config.get('port'));
console.log("App listening on port "+ config.get('port'));
