var mongoose = require('mongoose');

var Passenger = new mongoose.Schema({
    name: String,
    type: String,
    updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('passenger', Passenger);