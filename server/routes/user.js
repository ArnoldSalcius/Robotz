const express = require('express');
const { auth } = require('../middleware/auth');

const router = express.Router();

const userController = require('../controllers/userController');




router.get('/', userController.getUsers);

router.post('/', userController.createUser);



//Test
router.get('/:id/test', userController.getUserRobots);

router.get('/robots', auth, userController.getMyRobots);

router.post('/robots', auth, userController.addUserRobot);

router.get('/me', auth, userController.getMyInfo);


//Leave these last
router.get('/:id', userController.getUser);

router.patch('/:id');

router.delete('/:id', userController.deleteUser);
//end these last
module.exports = router;