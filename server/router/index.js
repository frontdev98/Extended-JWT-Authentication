const Router = require('express');

const router = new Router();

router.post('/registration');
router.post('/login');
router.post('/logout');
router.post('/activate/:link');
router.post('/refresh')
router.get('/users');

module.exports = router;