const express = require('express');

const authController = require('../controllers/auth');

const routeGuard = require('../middleware/routeGuard');

const router = express.Router();

router.get('/', authController.getIndex);

router.get('/login', authController.getLogin);

router.post('/login', authController.postLogin);

router.get('/logout', authController.getLogout);

router.post('/logout', authController.postLogout);

router.get('/register', authController.getRegister);

router.post('/register', authController.postRegister);

module.exports = router;