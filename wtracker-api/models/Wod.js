var mongoose = require('mongoose');

var WodSchema = new mongoose.Schema({
    name: String,
    description: String,
    type: String
});

module.exports = mongoose.model('Wod', WodSchema);