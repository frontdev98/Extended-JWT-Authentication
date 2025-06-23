const Router = require('express');
const controller = require('../controllers/user-controller')

const router = new Router();

router.post('/registration', controller.registration);
router.post('/login', controller.login);
router.post('/logout', controller.logout);
router.post('/activate/:link', controller.activate);
router.post('/refresh', controller.refresh)
router.get('/users', controller.getUsers);

module.exports = router;