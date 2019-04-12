const mongoose = require('mongoose');

const roomSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user: [ {userId:{type: String}}, {userStatus:{type: String}} ],
    status: {type: String, required: true},
    roomLevel: {type: String, required: true}
});

module.exports = mongoose.model('Room', roomSchema);