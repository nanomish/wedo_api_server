
//https://github.com/simonholmes/mongoose-default-connection/tree/master/model

// DB configuration details
var db_config = require('../config/db.js')();

// Bring Mongoose into the app
var mongoose = require( 'mongoose' );

// Create the database connection
mongoose.connect(db_config.CONNECTION_STRING, db_config.CONNECTION_OPTIONS);

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection open', new Date);
});

// If the connection throws an error
mongoose.connection.on('error',function (err) {
  console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});


// BRING IN YOUR SCHEMAS & MODELS
// For example
require('./user');
require('./list');