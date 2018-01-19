var mongoose = require('mongoose');

var PersonSchema = new mongoose.Schema({
    name: String,
    dateOfBirth: Date,
});

module.exports = mongoose.model('Person', PersonSchema);