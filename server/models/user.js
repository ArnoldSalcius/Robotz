const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please provide a username'],
        minlength: [2, 'Provide at least 2 characters for username'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: [3, 'Provide at least 3 characters for password']
    },
    token: {
        type: String
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true
    },
    credits: {
        type: Number,
        default: 0
    },
    lastRobots: {
        type: Date
    }

});

UserSchema.pre('save', function (next) {
    if (!this.isModified('password')) return next();
    console.log('presave rengas');
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            if (!err && hash) {
                console.log('pass hashed');
                this.password = hash;
                next();
            }
        })
    });
});

UserSchema.methods.comparePassword = function (pass, cb) {
    console.log(this);
    bcrypt.compare(pass, this.password, (err, isMatch) => {
        if (err) return cb(err);
        cb(null, isMatch);
    })
}

const User = mongoose.model('User', UserSchema);


module.exports = User;
