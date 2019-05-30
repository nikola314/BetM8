const path = require('path');

const express = require('express');

const homeController = require('../controllers/home');

const routeGuard = require('../middleware/routeGuard');

const router = express.Router();

router.get('/', homeController.getIndex);

module.exports = router;
