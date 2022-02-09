const Robot = require('../models/robot');


const getRobots = async (req, res) => {

    try {
        const robots = await Robot.find({}, { __v: 0 });
        res.json(robots);


    } catch (e) {
        throw new Error(e.message);
    }

}

const getRobot = async (req, res, next) => {

    const id = req.params.id;
    console.log(id);

    try {
        const robot = await Robot.findById(id);
        res.json(robot);
    } catch (e) {
        next(e.message)
    }
}

const createRobot = async (req, res) => {

    const num = Math.ceil(Math.random() * 100);
    const rating = Math.ceil(Math.random() * 10);
    const rarity = 1;
    const name = "Robot " + num;


    try {
        const robot = new Robot({ name, rarity, rating });
        const savedRobot = await robot.save();
        res.json(savedRobot);
    } catch (e) {
        next(e.message);
    }

}

const deleteRobot = async (req, res) => {

    const id = req.params.id;
    try {
        const removed = await Robot.findByIdAndRemove(id);
        res.json(removed);

    } catch (e) {
        next(e.message);
    }

}

const updateRobot = async (req, res) => {
    const id = req.params.id;
    const { name, rarity, rating } = req.body;
    try {
        const updated = await Robot.findByIdAndUpdate(id, { name, rarity, rating }, { new: true });
        res.json(updated)
    } catch (e) {
        next(e.message);
    }
}




module.exports = {
    getRobots,
    getRobot,
    createRobot,
    deleteRobot,
    updateRobot
}