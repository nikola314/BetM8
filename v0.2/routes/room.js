const express = require('express');

const roomController = require('../controllers/room');

const routeGuard = require('../middleware/routeGuard');

const util = require('../middleware/util');

const router = express.Router();

router.get('/room-home', roomController.getRoomHome);

router.get('/create-room', routeGuard.isUser, util.canCreateRoom, roomController.getCreateRoom);

router.post('/create-room', routeGuard.isUser, util.canCreateRoom, roomController.postCreateRoom);

router.post('/join-room', routeGuard.isUser, roomController.postJoinRoom);

router.get('/my-rooms', routeGuard.isUser, roomController.getMyRooms);

router.get('/single-room', roomController.getSingleRoom);

router.post('/join-private-room-request', routeGuard.isUser, roomController.joinPrivateRoomReq);

router.post('/leave-room', routeGuard.isUser, roomController.postLeaveRoom);

router.post('/leave-room-request', routeGuard.isUser, roomController.postLeaveRoomReq);

router.post('/make-prediction', routeGuard.isUser, roomController.postMakePrediction);

router.post('/handle-request', routeGuard.isUser, roomController.postHandleReq);

module.exports = router;