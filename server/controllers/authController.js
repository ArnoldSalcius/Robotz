const User = require('../models/user');
const jwt = require('jsonwebtoken');
const ErrorResponse = require('../utils/ErrorResponse');
const validator = require('validator');

console.log(process.env.JWT_EXPIRY);

const registerUser = async (req, res, next) => {
    console.log('i ran');

    try {

        const { username, password, email } = req.body;

        if (!username || !password || !email) {
            // next(new ErrorResponse('Fields missing', 400));
        }

        //Field validation
        const fields = [];


        const newUser = new User({ username, password, email });
        await newUser.save();
        //Move to somewhere else maybe?
        const user = { username: newUser.username, id: newUser.id }
        const token = jwt.sign(user, process.env.JWT_SECRET_KEY, { expiresIn: parseInt(process.env.JWT_EXPIRY) });
        user.token = token
        res.json({ user });

        //Starting with Express 5, route handlers and middleware that return a Promise will call next(value) automatically when they reject or throw an error.
    } catch (e) {
        next(e);
    }

}

const loginUser = async (req, res, next) => {
    const { username, password } = req.body;
    try {
        const found = await User.findOne({ username }, { __v: 0 });
        if (!found) {
            next(new ErrorResponse('User with that username and password does not exist', 401));
        }

        found.comparePassword(password, (err, isMatch) => {
            if (err) {
                return next(err);
            }
            if (!isMatch) {
                return next(new ErrorResponse('User with that username and password does not exist', 401));
            }

            const token = jwt.sign({ username: found.username, id: found.id }, process.env.JWT_SECRET_KEY, { expiresIn: parseInt(process.env.JWT_EXPIRY) });
            found.token = token
            return res.json({ user: found });
        });


    } catch (e) {
        next(e)
    }

}

const verifyToken = async (req, res, next) => {
    const token = req.headers['authorization'].split('Bearer ')[1];


    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return next(err);
        }
        res.json({ username: decoded.username, id: decoded.id, token });

    });
}

const errorHandler = async (err, req, res, next) => {
    console.log(' auth handler working');
    console.log(err);
    //token expired error
    if (err.name === 'TokenExpiredError' || err.name === 'JsonWebTokenError') {
        return res.status(401).json({
            success: false,
            error: { message: 'Bad or Expired Session. Please re-login.' }
        })
    }

    if (err.name === 'ValidationError') {

        const keys = Object.keys(err.errors);
        const fields = keys.map((key) => ({ [key]: err.errors[key].properties.message }));

        return res.status(400).json({
            success: false,
            error: { message: 'Error. Check highlighted fields', fields },

        })
    }

    if (err instanceof ErrorResponse) {
        return res.status(err.statusCode).json({
            success: false,
            error: { message: err.message, fields: err.fields }
        })
    }


    // Duplicate field (only username for now)
    if (err.code === 11000) {
        let fields = Object.keys(err.keyPattern);
        //If error is because username, check email as well (send both field errors)
        if (fields[0] === 'username') {
            try {
                const user = await User.findOne({ email: req.body.email });
                if (user) {
                    fields.push('email');
                }

            } catch (e) {
                return res.status(500).json({
                    success: false,
                    error: { message: 'Unexpected Server Error. Try again later' }
                })
            }
        }

        const fieldsMessage = fields.map(field => ({ [field]: `This ${field} is already taken` }))

        return res.status(400).json({
            success: false,
            error: { message: `Fields already taken ${fields.join(', ')}`, fields: fieldsMessage },

        })
    }
    return res.status(400).json({
        success: false,
        error: { message: `Oops something` }
    })

}



module.exports = {
    registerUser,
    loginUser,
    verifyToken,
    errorHandler
}