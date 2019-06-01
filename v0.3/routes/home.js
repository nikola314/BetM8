const path = require('path');

const express = require('express');

const homeController = require('../controllers/home');

const routeGuard = require('../middleware/routeGuard');

const util = require('../middleware/util');

const router = express.Router();

router.get('/', util.countNewMessages, homeController.getIndex);

module.exports = router;
