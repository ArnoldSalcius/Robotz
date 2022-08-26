const Robot = require('../models/robot');
const User = require('../models/user');
const { addDate, compareDate } = require('../utils/date');
const ErrorResponse = require('../utils/ErrorResponse');

const { createRandomRobotData, calculateRobotCost } = require('../utils/robot');


const getRobots = async (req, res) => {

    try {
        const robots = await Robot.find({ user: null }, { __v: 0 });
        res.json(robots);


    } catch (e) {
        next(e)
    }

}

const getRobot = async (req, res, next) => {
    console.log(req);
    const id = req.params.id;

    try {
        const robot = await Robot.findById(id);
        res.json(robot);
    } catch (e) {
        next(e)
    }
}

const getMyRobots = async (req, res, next) => {

    try {
        const robots = await Robot.find({ user: req.user.id, isClaimed: true }).select('-__v');
        res.json({ success: true, robots });
    } catch (e) {
        console.log(e);
        next(e);

    }
}

const getRobotLottery = async (req, res, next) => {
    const userId = req.user.id;
    try {
        const { lastRobots } = await User.findById(userId, 'lastRobots -_id');

        //check if available for new robots
        const date = new Date();
        if (date < lastRobots) {
            return res.json({ success: false, timer: lastRobots });
        }

        const robotData = createRandomRobotData(userId, 5);

        //check if user has unclaimed robots

        let robots = await Robot.find({ user: userId, isClaimed: false });

        if (!robots.length) {
            robots = await Robot.insertMany(robotData, { new: true });
        }
        res.json({ success: true, robots });

    } catch (e) {
        next(e)
    }
}

//errors Done
const claimRobotLottery = async (req, res, next) => {
    const id = req.user.id;
    const selected = req.body.selected;
    console.log(selected);

    //Must be 3 robots exactly
    if (selected.length !== 3) {
        return next({ success: false, message: 'Selected robots must contain 3 robots', statusCode: 403 });
    }


    try {
        //check if sent robots belongs to user
        const foundRobots = await Robot.find({ user: id, isClaimed: false });

        //No good because need to update all unclaimed robots, not just selected
        // const foundRobots2 = await Robot.find({ '_id': { $in: selected }, user: id, isClaimed: false });

        if (!foundRobots.length) {
            return next({ success: false, statusCode: 403, message: 'No robots found in lottery. try again later.' })
        }
        if (foundRobots.length !== 5) {
            return next({ success: false, statusCode: 403, message: 'Something went wrong with lottery robots. Try again' })
        }

        //check if ALL selected robots are in found robots BEFORE adding
        const map = new Map();
        const isCorrectRobots = selected.every(id => {
            const isFound = foundRobots.find((robot) => robot.id === id);
            map.set(id, isFound);
            return isFound;
        });

        if (!isCorrectRobots) {
            return next({ success: false, statusCode: 403, message: 'Error selected robot does not exist. Try again' })
        }

        //Modify each of the found robots (add selected to user & remove the rest (shop))
        const responseArr = [];
        for (const robot of foundRobots) {

            robot.isClaimed = true;
            const isSelected = map.get(robot.id);
            //Remove from user if not selected
            if (!isSelected) {
                robot.user = null
            }
            try {
                await robot.save();

                if (isSelected) {
                    responseArr.push(robot);
                }
            } catch (e) {
                return res.statusCode(400).json({ success: false, error: new ErrorResponse('Unexpected Error claiming some robots', 400) });
            }



        }

        const timer = addDate(process.env.LOT_TIMER);

        await User.findByIdAndUpdate(id, { lastRobots: timer });


        res.json({ success: true, robots: responseArr, timer })

    } catch (e) {
        next(e);
    }
}


const getStoreRobots = async (req, res, next) => {
    try {
        const storeRobots = await Robot.find({ isClaimed: true, user: null });
        res.json({ success: true, robots: storeRobots });
    } catch (e) {
        next(e);
    }
}


const buyRobot = async (req, res, next) => {
    const selectedRobot = req.body.robot;
    try {
        const foundRobot = await Robot.findOne({ _id: selectedRobot, isClaimed: true, user: null });

        if (!foundRobot) return next({ message: "Robot not found in store. Try again after reload...", statusCode: 403 });

        const user = await User.findById(req.user.id);

        const robotPrice = calculateRobotCost(foundRobot);

        if (robotPrice > user.credits) return next({ message: "Not sufficient credits to buy robot " + foundRobot.name, statusCode: 403 });

        //Subtract credits
        user.credits -= robotPrice;

        //Add user as owner
        foundRobot.user = req.user.id;
        await foundRobot.save();
        await user.save();
        res.json(foundRobot);


    } catch (e) {
        next(e)
    }

}

const sellRobot = async (req, res, next) => {
    const selectedRobot = req.body.robot;
    try {
        const foundRobot = await Robot.findOne({ _id: selectedRobot, isClaimed: true, user: req.user.id });

        if (!foundRobot) return next({ message: "Robot not found in your collection", statusCode: 403 });

        const robotCost = calculateRobotCost(foundRobot, false);
        //add the money
        await User.findByIdAndUpdate(req.user.id, { $inc: { 'credits': robotCost } });


        foundRobot.user = null;
        await foundRobot.save();
        res.json(foundRobot);

    } catch (e) {
        next(e);
    }
}


const robotErrorHandler = async (err, req, res, next) => {
    if (!err.statusCode) {
        return res.status(400).json({ success: false, error: { message: "Unexpected error occurred1. Please try again later" } })
    }
    res.status(err.statusCode).json({ success: false, error: err });
}



module.exports = {
    getRobot,
    getMyRobots,
    robotErrorHandler,
    getRobotLottery,
    claimRobotLottery,
    getStoreRobots,
    buyRobot,
    sellRobot
}