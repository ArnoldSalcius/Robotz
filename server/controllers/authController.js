const User = require('../models/user');
const jwt = require('jsonwebtoken');


const registerUser = async (req, res, next) => {
    const { username, password } = req.body;
    try {
        const newUser = new User({ username, password });
        await newUser.save();
        //Move to somewhere else maybe?
        const user = { username: newUser.username, id: newUser.id }
        const token = jwt.sign(user, process.env.JWT_SECRET_KEY, { expiresIn: parseInt(process.env.JWT_EXPIRY) });
        res.json({ user, token });

        //Starting with Express 5, route handlers and middleware that return a Promise will call next(value) automatically when they reject or throw an error.
    } catch (e) {
        next(e);
    }

}

const loginUser = async (req, res, next) => {
    const { username, password } = req.body;
    try {
        const found = await User.findOne({ username, password }, { password: 0, robots: 0, __v: 0 });
        const token = jwt.sign({ username: found.username, id: found.id }, process.env.JWT_SECRET_KEY, { expiresIn: parseInt(process.env.JWT_EXPIRY) });
        if (found) {
            found.token = token;
            return res.json(found);
        }

        next('User with that with that username and password was not found');

    } catch (e) {
        next(e)
    }

}

const verifyToken = async (req, res, next) => {
    const token = req.headers['authorization'];


    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return next(err);
        }
        console.log(decoded);
        res.json({ username: decoded.username, id: decoded.id, token });

    });
}

const errorHandler = (err, req, res, next) => {
    console.log('auth err handler');
    console.log(err);
    //Expired token error
    //Malformed token error
    res.status(401).json(err)



}


module.exports = {
    registerUser,
    loginUser,
    verifyToken,
    errorHandler
}