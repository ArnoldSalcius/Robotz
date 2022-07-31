const express = require('express');

const robotController = require('../controllers/robotController');

const { auth } = require('../middleware/auth');


const router = express.Router();



router.get('/my', auth, robotController.getMyRobots);

router.get('/lottery', auth, robotController.getRobotLottery);

router.post('/lottery', auth, robotController.claimRobotLottery);

router.get('/store', auth, robotController.getStoreRobots);

router.post('/store/buy', auth, robotController.buyRobot);

router.post('/store/sell', auth, robotController.sellRobot);

router.get('/:id', robotController.getRobot);





router.use(robotController.robotErrorHandler);





module.exports = router;