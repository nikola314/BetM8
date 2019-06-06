/* 
  Authors:
    -Nikola Kesic
    -Dimitrije Milenkovic
*/

const express = require('express');

const userController = require('../controllers/user');

const homeController = require('../controllers/home');

const routeGuard = require('../middleware/routeGuard');

const util = require('../middleware/util');

const router = express.Router();

router.get('/', util.countNewMessages, homeController.getIndex);

router.get('/user-profile', util.countNewMessages, routeGuard.isUser, userController.getUserProfile);

router.post('/user-profile', util.countNewMessages, routeGuard.isUser, userController.postUserProfile);

router.get('/edit-user', util.countNewMessages, routeGuard.isUser, userController.getEditUser);

router.post('/edit-user', util.countNewMessages, routeGuard.isUser, userController.postEditUser);

router.get('/change-password', util.countNewMessages, routeGuard.isUser, userController.getChangePassword);

router.post('/change-password', util.countNewMessages, routeGuard.isUser, userController.postChangePassword);

router.get('/add-money', util.countNewMessages, routeGuard.isUser, userController.getAddMoney);

router.post('/add-money', util.countNewMessages, routeGuard.isUser, userController.postAddMoney);

router.get('/withdraw-money', util.countNewMessages, routeGuard.isUser, userController.getWithdrawMoney);

router.post('/withdraw-money', util.countNewMessages, routeGuard.isUser, userController.postWithdrawMoney);

router.get('/stripe-add-money', util.countNewMessages, routeGuard.isUser, userController.getStripeAddMoney);

router.get('/inbox', util.countNewMessages, routeGuard.isUser, userController.getInbox);

module.exports = router;