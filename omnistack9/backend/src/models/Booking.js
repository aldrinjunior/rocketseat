const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    date: String,
    approved: Boolean,

    user: {
        type: mongoose.Schema.Types.ObjectId, //passa  o id que criou o Spot
        ref: 'User'
    },
    spot: {
        type: mongoose.Schema.Types.ObjectId, //passa  o id que criou o Spot
        ref: 'Spot'
    }
});

module.exports = mongoose.model('Booking', BookingSchema);