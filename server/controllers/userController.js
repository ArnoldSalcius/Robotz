const User = require('../models/user');
const jwt = require('jsonwebtoken');


const getUser = async (req, res, next) => {
    const id = req.params.id;

    try {

        const user = await User.findById(id);
        res.json(user);

    } catch (e) {
        next(e.message);
    }

}

const getUsers = async (req, res, next) => {

    try {
        const users = await User.find({});
        res.json(users);
    } catch (e) {
        next(e.message);
    }
}

const createUser = async (req, res, next) => {
    const { username, password } = req.body;

    try {
        const newUser = new User({ username, password });
        const saved = await newUser.save();
        res.json(saved);

    } catch (e) {
        next(e.message);
    }
}

const deleteUser = async (req, res, next) => {
    const id = req.params.id;

    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (deletedUser) {
            return res.json({
                success: true,
                username: deletedUser.username
            })
        }

        next('Error! User you are trying to delete does not exist')


    } catch (e) {
        next(e.message);
    }
}


const registerUser = async (req, res, next) => {
    const { username, password } = req.body;

    try {
        const newUser = new User({ username, password });
        await newUser.save();

        const token = jwt.sign({ user: newUser.username, id: newUser.id }, process.env.JWT_SECRET_KEY, { expiresIn: parseInt(process.env.JWT_EXPIRY) });

        res.json({ username, token, id: newUser.id });
    } catch (e) {
        next(e.message);
    }

}

const loginUser = async (req, res, next) => {
    const { username, password } = req.body;
    try {
        const found = await User.findOne({ username, password });
        if (found) {
            return res.json(found);
        }

        next('User with that with that username and password was not found');

    } catch (e) {
        next(e.message)
    }

}


const getUserRobots = async (req, res, next) => {
    const id = req.params.id;

    const found = await User.findById(id).populate('robots');
    if (found) {
        return res.json({ id, username: found.username, robots: found.robots });
    }
    return next('user not found')

}

const getMyRobots = async (req, res, next) => {

    const id = req.user.id;

    try {
        const user = await User.findById(id).populate('robots');

        if (!user) {
            return next('something went wong. User not found (somehow)')
        }
        res.json(user.robots);

    } catch (e) {
        next(e.message)
    }
}

module.exports = {
    getUser,
    getUsers,
    createUser,
    deleteUser,
    registerUser,
    loginUser,
    getUserRobots,
    getMyRobots
}