var mongoose = require('mongoose');

var Location = new mongoose.Schema({
    id: String,
    lat: Number,
    lng: Number,
    updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('location', Location);
