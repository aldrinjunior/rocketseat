const mongoose = require('mongoose');

const SpotSchema = new mongoose.Schema({
    thumbnail: String,
    company: String,
    price: Number,
    techs: [String], //array com varias strings
    user: {
        type: mongoose.Schema.Types.ObjectId, //passa  o id que criou o Spot
        ref: 'User'
    }
});

module.exports = mongoose.model('Spot', SpotSchema);