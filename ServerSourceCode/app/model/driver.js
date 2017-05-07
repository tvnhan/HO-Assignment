var mongoose = require('mongoose');

var Driver = new mongoose.Schema({
    name: String,
    state: String,
    updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('driver', Driver);
