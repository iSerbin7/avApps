const Router = require('express').Router;
const router = Router();
const userController = require('../controllers/user-controller')

router.get('/refresh', userController.refresh);
router.get('/users', userController.getUsers);
router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.post('/logout', userController.logout);

module.exports = router;