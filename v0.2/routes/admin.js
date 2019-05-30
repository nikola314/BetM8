const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const routeGuard = require('../middleware/routeGuard');

const router = express.Router();

router.get('/all-users', routeGuard.isAdmin, adminController.getAllUsers);

router.post('/ban-user', routeGuard.isAdmin, adminController.postBanUser);

router.post('/ban-roomcreate', routeGuard.isAdmin, adminController.postBanRoomCreate);

module.exports = router;
