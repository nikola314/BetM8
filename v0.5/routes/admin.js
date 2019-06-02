const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const routeGuard = require('../middleware/routeGuard');

const util = require('../middleware/util');

const router = express.Router();

router.get('/all-users', util.countNewMessages, routeGuard.isAdmin, adminController.getAllUsers);

router.post('/ban-user', util.countNewMessages, routeGuard.isAdmin, adminController.postBanUser);

router.post('/ban-roomcreate', util.countNewMessages, routeGuard.isAdmin, adminController.postBanRoomCreate);

router.post('/ban-user-by-name', util.countNewMessages, routeGuard.isAdmin, adminController.banUserByName);

module.exports = router;
