const mongoose = require('mongoose');

const poolSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: {type: String, required: true},
    gender: {type: String, required: true},
    interestedGender: {type: String, required: true},
    status: {type: String, required: true}
});

module.exports = mongoose.model('Pool', poolSchema);