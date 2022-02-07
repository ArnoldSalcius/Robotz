const express = require('express');

const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

const router = express.Router();



router.post('/verify', auth.auth, (req, res) => {
    res.json({ user: req.user });
})


router.get('/', userController.getUsers);

router.get('/:id', userController.getUser);

router.post('/register', userController.registerUser)

router.post('/login', userController.loginUser);

router.post('/', userController.createUser);

router.patch('/:id');

router.delete('/:id', userController.deleteUser);







module.exports = router;