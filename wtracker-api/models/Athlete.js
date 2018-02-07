var mongoose = require('mongoose');

var AthleteSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    dateOfBirth: Date,
    weight: Number,
    gender: String
});

module.exports = mongoose.model('Athlete', AthleteSchema);