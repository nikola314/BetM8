/* 
  Authors:
    -Nikola Kesic
    -Dimitrije Milenkovic
*/

const express = require('express');

const roomController = require('../controllers/room');

const routeGuard = require('../middleware/routeGuard');

const util = require('../middleware/util');

const router = express.Router();

router.get('/room-home', util.countNewMessages, roomController.getRoomHome);

router.get('/create-room', util.countNewMessages, routeGuard.isUser, util.canCreateRoom, roomController.getCreateRoom);

router.post('/create-room', util.countNewMessages, routeGuard.isUser, util.canCreateRoom, roomController.postCreateRoom);

router.post('/join-room', util.countNewMessages, routeGuard.isUser, roomController.postJoinRoom);

router.get('/my-rooms', util.countNewMessages, routeGuard.isUser, roomController.getMyRooms);

router.get('/single-room', util.countNewMessages, roomController.getSingleRoom);

router.post('/join-private-room-request', util.countNewMessages, routeGuard.isUser, roomController.joinPrivateRoomReq);

router.post('/leave-room', util.countNewMessages, routeGuard.isUser, roomController.postLeaveRoom);

router.post('/leave-room-request', util.countNewMessages, routeGuard.isUser, roomController.postLeaveRoomReq);

router.post('/make-prediction', util.countNewMessages, routeGuard.isUser, roomController.postMakePrediction);

router.post('/handle-request', util.countNewMessages, routeGuard.isUser, roomController.postHandleReq);

module.exports = router;