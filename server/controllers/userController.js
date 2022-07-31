const User = require('../models/user');
const Robot = require('../models/robot');


const getUser = async (req, res, next) => {
    const id = req.params.id;

    try {

        const user = await User.findById(id);
        res.json(user);

    } catch (e) {
        next(e.message);
    }

}

const getMyInfo = async (req, res, next) => {
    const id = req.user.id;

    const user = await User.findById(id);
    //fix so the lottery robots dont count
    const robots = await Robot.find({ user: id, isClaimed: true });

    res.json({ credits: user.credits, robots: robots.length });
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





const getUserRobots = async (req, res, next) => {
    const id = req.params.id;

    const found = await User.findById(id).populate('robots');
    if (found) {
        return res.json({ id, username: found.username, robots: found.robots });
    }
    return next('user not found')

}

const addUserRobot = async (req, res, next) => {
    console.log(req.user);
}

const getMyRobots = async (req, res, next) => {

    const id = req.user.id;

    try {
        const user = await User.findById(id).populate('robots');

        if (!user) {
            return next('something went wong. User not found (somehow)')
        }
        res.json({ robots: user.robots });

    } catch (e) {
        next(e.message)
    }
}

module.exports = {
    getUser,
    getUsers,
    createUser,
    deleteUser,
    getUserRobots,
    getMyRobots,
    addUserRobot,
    getMyInfo
}