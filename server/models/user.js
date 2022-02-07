const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 2,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 3
    },
    robots: [{
        type: mongoose.Schema.ObjectId, ref: 'Robot'
    }],
    token: {
        type: String
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
