const createRandomRobotData = (userId, length = 1) => {
    if (length === 1) {
        return randomRobot(userId);
    }
    const arr = [];
    for (let i = 0; i < length; i++) {
        arr.push(randomRobot(userId));
    }
    return arr;
}


const randomRobot = (userId) => ({
    rating: Math.ceil(Math.random() * 10),
    rarity: 1,
    name: "Robot " + Math.ceil(Math.random() * 100),
    user: userId,
});

const calculateRobotCost = (robot, buy = true) => {
    return buy ? robot.rarity * robot.rating + 1 : (robot.rarity * robot.rating);
}




module.exports = {
    createRandomRobotData,
    calculateRobotCost
}