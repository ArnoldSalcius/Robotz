const express = require('express');
const { auth } = require('../middleware/auth');


const userController = require('../controllers/userController');

const router = express.Router();



router.get('/', userController.getUsers);

router.post('/', userController.createUser);


router.post('/register', userController.registerUser)

router.post('/login', userController.loginUser);


//Test
router.get('/:id/test', userController.getUserRobots);

router.get('/robots', auth, userController.getMyRobots);


//Leave these last
router.get('/:id', userController.getUser);

router.patch('/:id');

router.delete('/:id', userController.deleteUser);
//end these last
module.exports = router;