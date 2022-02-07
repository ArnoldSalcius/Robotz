const mongoose = require('mongoose');



const RobotSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    rating: {
        required: true,
        type: Number
    },
    rarity: {
        required: true,
        type: Number,
        default: 1
    }
});

const Robot = mongoose.model('Robot', RobotSchema);


module.exports = Robot;