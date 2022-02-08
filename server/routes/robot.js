const express = require('express');

const robotController = require('../controllers/robotController');

const { auth } = require('../middleware/auth');


const router = express.Router();


// TEST ---> Delete this
router.post('/verify', auth, (req, res) => {
    res.json({ user: req.user });
})
//Bro dont delete everything

router.get('/', robotController.getRobots);

router.get('/:id', robotController.getRobot);

router.post('/', robotController.createRobot);

router.delete('/:id', robotController.deleteRobot);

router.patch('/:id', robotController.updateRobot)






module.exports = router;