const mongoose = require('mongoose');
const { calculateRobotCost } = require('../utils/robot');



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
    },
    user: mongoose.Schema.ObjectId,
    isClaimed: {
        //this and user both cant be false
        //can be claimed and user (owned by user)
        //can be claimed and not owned by user(in shop)
        type: Boolean,
        default: false,
        validate: [function (v) {
            return this.user || v;
        }, 'User must not be null']
    }
});

RobotSchema.virtual('price').get(function () {
    //if user exists show sell price
    return calculateRobotCost(this, !this.user);

});

RobotSchema.set('toJSON', { virtuals: true });


const Robot = mongoose.model('Robot', RobotSchema);


module.exports = Robot;