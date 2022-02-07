const express = require('express');

const robotController = require('../controllers/robotController');

const router = express.Router();



router.get('/', robotController.getRobots);

router.get('/:id', robotController.getRobot);

router.post('/', robotController.createRobot);

router.delete('/:id', robotController.deleteRobot);

router.patch('/:id', robotController.updateRobot)






module.exports = router;