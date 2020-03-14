const router = require('express').Router();
const auth = require('../auth');
const USER_CONTROLLER = require('../../controllers/User.controller');

router.get('/', auth.required, USER_CONTROLLER.getUser);

router.post('/', auth.optional, USER_CONTROLLER.createUser);

router.post('/login', auth.optional, USER_CONTROLLER.login);

module.exports = router;