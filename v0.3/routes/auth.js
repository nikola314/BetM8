const express = require('express');

const authController = require('../controllers/auth');

const routeGuard = require('../middleware/routeGuard');

const util = require('../middleware/util');

const router = express.Router();

router.get('/', util.countNewMessages, authController.getIndex);

router.get('/login', util.countNewMessages, authController.getLogin);

router.post('/login', authController.postLogin, util.countNewMessages);

router.get('/logout', util.countNewMessages, authController.getLogout);

router.post('/logout', util.countNewMessages, authController.postLogout);

router.get('/register', util.countNewMessages, authController.getRegister);

router.post('/register', util.countNewMessages, authController.postRegister);

module.exports = router;