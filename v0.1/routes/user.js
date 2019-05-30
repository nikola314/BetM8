const express = require('express');

const userController = require('../controllers/user');

const homeController = require('../controllers/home');

const routeGuard = require('../middleware/routeGuard');

const router = express.Router();

router.get('/', homeController.getIndex);

router.get('/user-profile', routeGuard.isUser, userController.getUserProfile);

router.get('/edit-user', routeGuard.isUser, userController.getEditUser);

router.post('/edit-user', routeGuard.isUser, userController.postEditUser);

router.get('/change-password', routeGuard.isUser, userController.getChangePassword);

router.post('/change-password', routeGuard.isUser, userController.postChangePassword);

router.get('/add-money', routeGuard.isUser, userController.getAddMoney);

router.post('/add-money', routeGuard.isUser, userController.postAddMoney);

router.get('/withdraw-money', routeGuard.isUser, userController.getWithdrawMoney);

router.post('/withdraw-money', routeGuard.isUser, userController.postWithdrawMoney);

router.get('/stripe-add-money', routeGuard.isUser, userController.getStripeAddMoney);

module.exports = router;