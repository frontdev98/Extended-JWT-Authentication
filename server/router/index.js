const Router = require('express');
const controller = require('../controllers/user-controller')
const { body } = require('express-validator')

const router = new Router();

const authMiddleware = require('../middlewares/auth-middleware')

router.post('/registration', 
    body('email', 'Invalid email.').isEmail(),                                 // validate email: must be like email (=D)
    body('password', 'Minimum password size 8 characters').isLength({min: 8})  // validate password: minimum size is 8
, controller.registration);
router.post('/login', controller.login);
router.get('/logout', controller.logout);
router.get('/activate/:link', controller.activate);
router.get('/refresh', controller.refresh)
router.get('/users', authMiddleware, controller.getUsers);                     // only for registered users

module.exports = router;