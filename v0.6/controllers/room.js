const User = require('../models/user');

const Room = require('../models/room');

const UserRoom = require('../models/user-room');

const Game = require('../models/game');

const League = require('../models/league');

const Prediction = require('../models/prediction');

const RoomLeague = require('../models/room-league');

const Request = require('../models/request');

const Message = require('../models/message');

const constants = require('../util/consts');

exports.getRoomHome = (req, res, next) => {
    const user = req.session.user;

    Room.findAll().then(rooms => {
        return res.render('room/room-home', {
            pageTitle: 'Rooms',
            path: '/room-home',
            allRooms: rooms,
            user: user,
            errorMessage: req.flash('error'),
            infoMessage: req.flash('info')
        })
    }).catch(err => {
        console.log(err);
    })
};

exports.getCreateRoom = (req, res, next) => {
    const user = req.session.user;

    return res.render('room/create-room', {
        pageTitle: 'Create Room',
        path: '/create-room',
        user: user,
        errorMessage: req.flash('error'),
        infoMessage: req.flash('info')
    })
};

//cilii
exports.postCreateRoom = (req, res, next) => {
    const name = req.body.name;
    const visibility = req.body.visibility;
    const distributionType = req.body.distributionType;
    const scoringType = req.body.scoringType;
    const sport = req.body.sport;
    const minPlayers = parseInt(req.body.minPlayers);
    const maxPlayers = parseInt(req.body.maxPlayers);
    const entryFee = parseInt(req.body.entryFee);
    const dateBegin = req.body.dateBegin;
    const dateEnd = req.body.dateEnd;
    const latestLeave = req.body.latestLeave;
    const today = new Date();
    let sportName;

    if (sport == constants.SPORT_FOOTBALL) {
        sportName = 'Football';
    }
    else if (sport == constants.SPORT_BASKETBALL) {
        sportName = 'Basketball';
    }
    else if (sport == constants.SPORT_TENNIS) {
        sportName = 'Tennis';
    }
    Room.findOne({
        where: { name: name }
    }).then(roomDoc => {
        let redirect = false;
        if (roomDoc) {
            req.flash('error', 'Room with this name already exists!');
            redirect = true;
        }
        if (!name || visibility == 0 || distributionType == 0 || scoringType == 0 || sport == 0 || !minPlayers || !maxPlayers || !entryFee || dateBegin == 0 || dateEnd == 0 || latestLeave == 0) {
            req.flash('error', 'not all fields are filled!');
            redirect = true;
        }
        if (dateEnd < dateBegin || latestLeave >= dateBegin || dateBegin <= today) {
            req.flash('error', 'You did not set dates in the appropriate way');
            redirect = true;
        }
        if (minPlayers >= maxPlayers) {
            req.flash('error', 'Max players count must be greater than min players');
            redirect = true;
        }
        if (minPlayers < 2) {
            req.flash('error', 'Min players count must be greater than 1');
            redirect = true;
        }
        if (req.session.user.money < entryFee) {
            req.flash('error', 'You don\'t have enough money to create this room!');
            redirect = true;
        }
        if (entryFee < 50) {
            req.flash('error', 'Minimum entry fee is 50!');
            redirect = true;
        }
        if (minPlayers == 2 && distributionType > 1) {
            req.flash('error', 'Number of players must be greater than 2 in order to select desired distribution type');
            redirect = true;
        }
        if (redirect) {
            return res.redirect('/create-room');
        }
        Room.create({
            name: name,
            visibility: visibility,
            distributionType: distributionType,
            scoringType: scoringType,
            sport: sport,
            minPlayers: minPlayers,
            maxPlayers: maxPlayers,
            entryFee: entryFee,
            membersCount: 0,
            dateBegin: dateBegin,
            dateEnd: dateEnd,
            latestLeave: latestLeave,
            userId: req.session.user.id
        }).then(room => {
            League.findAll({
                where: {
                    sport: sportName
                }
            }).then(leagues => {
                for (let league of leagues) {
                    RoomLeague.create({
                        roomId: room.id,
                        leagueId: league.id
                    });
                }
            });
            joinRoom(req, res, next, room.id);
        }).catch(err => {
            console.log(err);
        })

    })
        .catch(err => { console.log(err); });


};

exports.postJoinRoom = (req, res, next) => {
    const roomId = req.body.roomId;
    joinRoom(req, res, next, roomId);
}

exports.getMyRooms = (req, res, next) => {
    const user = req.session.user;
    let promises = [];

    UserRoom.findAll({
        where: {
            userId: user.id
        }
    }).then(userrooms => {
        for (let userroom of userrooms) {
            promises.push(Room.findOne({
                where: {
                    id: userroom.roomId
                }
            }))
        }
    }).then(room => {
        Promise.all(promises).then(result => {
            return res.render('room/my-rooms', {
                pageTitle: 'My Rooms',
                path: '/my-rooms',
                myRooms: result,
                user: user,
                errorMessage: req.flash('error'),
                infoMessage: req.flash('info')
            })
        })
    }).catch(err => {
        console.log(err);
    })
};

exports.getSingleRoom = (req, res, next) => {
    const roomId = req.query.roomId;
    const userId = req.session.user ? req.session.user.id : 0;
    const leaderboardUsers = [];
    let roomOwnerId = null;
    const today = new Date();
    let roomStarted = false;

    if (!roomId) {
        req.flash('error', 'No room id specified!');
        return res.redirect('/room-home');
    }
    Room.findOne({
        where: {
            id: roomId
        }
    }).then(room => {
        if (!room) {
            req.flash('error', 'Room not found!');
            return res.redirect('/room-home');
        }
        else {
            if (room.dateBegin < today) roomStarted = true;
            roomOwnerId = room.userId;
            let promises = [];

            RoomLeague.findAll({
                where: {
                    roomId: roomId
                }
            }).then(roomleagues => {
                for (let roomleague of roomleagues) {
                    promises.push(Game.findAll({
                        where: {
                            leagueId: roomleague.leagueId,
                            result: null
                        }
                    }))
                }
            }).then(result => {
                Promise.all(promises).then(mygames => {
                    UserRoom.findOne({
                        where: {
                            roomId: roomId,
                            userId: userId
                        }
                    }).then(user => {
                        var gamesarray = [];
                        for (let i = 0; i < mygames.length; i++) {
                            for (let j = 0; j < mygames[i].length; j++) {
                                gamesarray.push(mygames[i][j]);
                            }
                        }

                        UserRoom.findAll({
                            where: {
                                roomId: roomId,
                            }
                        }).then(userrooms => {
                            userrooms.sort((a, b) => (a.points > b.points) ? -1 : ((b.points > a.points) ? 1 : 0));
                            promises = [];
                            for (let userroom of userrooms) {
                                promises.push(User.findOne({
                                    where: {
                                        id: userroom.userId
                                    }
                                }).then(user => {
                                    leaderboardUsers.push(user);
                                }))
                            }

                            Promise.all(promises).then(result => {
                                if (roomOwnerId === userId) {
                                    Request.findAll({
                                        where: {
                                            roomId: roomId,
                                            isActive: 1
                                        }
                                    }).then(requests => {
                                        let pendingUsers = [];
                                        let reqpromises = [];
                                        for (let request of requests) {
                                            reqpromises.push(User.findOne({
                                                where: {
                                                    id: request.userId
                                                }
                                            }).then(user => {
                                                pendingUsers.push(user);
                                            }))
                                        }
                                        Promise.all(reqpromises).then(result => {
                                            return res.render('room/single-room', {
                                                pageTitle: 'Room',
                                                path: '/single-room',
                                                room: room,
                                                roomUser: user,
                                                allGames: gamesarray,
                                                userRooms: userrooms,
                                                pendingUsers: pendingUsers,
                                                leaderboardUsers: leaderboardUsers,
                                                roomStarted: roomStarted,
                                                errorMessage: req.flash('error'),
                                                infoMessage: req.flash('info')
                                            })
                                        })
                                    })
                                } else {
                                    return res.render('room/single-room', {
                                        pageTitle: 'Room',
                                        path: '/single-room',
                                        room: room,
                                        roomUser: user,
                                        allGames: gamesarray,
                                        userRooms: userrooms,
                                        pendingUsers: new Array(),
                                        leaderboardUsers: leaderboardUsers,
                                        roomStarted: roomStarted,
                                        errorMessage: req.flash('error'),
                                        infoMessage: req.flash('info')
                                    })
                                }
                            })
                        })
                    })
                })
            })
        }
    }).catch(err => {
        console.log(err);
    })
}

exports.postLeaveRoomReq = (req, res, next) => {
    const roomId = req.body.roomId;
    let message = "";
    let refund = null;
    const today = new Date();
    const latestLeave = new Date(req.body.latestLeave);

    if (today < latestLeave) {
        message = 'If you leave the room, 75% of the amount of money you have invested will be returned to you!';
        refund = true;
    }
    else {
        message = 'If you leave the room, you will not be refunded!';
        refund = false;
    }
    UserRoom.findOne({
        where: {
            roomId: roomId,
            userId: req.session.user.id
        }
    }).then(userroom => {
        if (!userroom) {
            req.flash('error', 'You are not in this room!');
            return res.redirect('/single-room?roomId=' + roomId);
        }
        else {
            Room.findOne({
                where: {
                    id: roomId
                }
            }).then(room => {
                if (!room) {
                    req.flash('error', 'Room not found!');
                    return res.redirect('/room-home');
                }
                if (room.userId == req.session.user.id) {
                    req.flash('error', 'You are creator of this room! You can\'t leave it!');
                    return res.redirect('/room-home');
                }
                else {
                    return res.render('room/popup', {
                        pageTitle: 'Popup',
                        path: '/popup',
                        message: message,
                        refund: refund,
                        room: room,
                        errorMessage: req.flash('error'),
                        infoMessage: req.flash('info')
                    })
                }
            })
        }
    })
}

exports.postLeaveRoom = (req, res, next) => {
    const roomId = req.body.roomId;
    const userId = req.session.user.id;
    const refund = req.body.refund;
    const decision = req.body.button;
    let entryFee = null;

    if (decision == "Yes") {
        UserRoom.destroy({
            where: {
                userId: userId,
                roomId: roomId
            }
        }).then(result => {
            Room.findOne({
                where: {
                    id: roomId
                }
            }).then(room => {
                room.membersCount--;
                room.save();
                if (refund) {
                    entryFee = room.entryFee;
                    User.findOne({
                        where: {
                            id: userId
                        }
                    }).then(user => {
                        user.money += entryFee * 0.75;
                        user.save().then(savedUser => {
                            res.locals.currentUser = savedUser;
                            req.session.user = savedUser;
                            req.flash('info', 'You have successfully left the room!');
                            return res.redirect('/my-rooms');
                        })
                    })
                }
            })
        })
    }
    else {
        req.flash('info', 'You have not left the room!');
        return res.redirect('/my-rooms');
    }
}

exports.postMakePrediction = (req, res, next) => {
    const roomId = req.body.roomId;
    const gameId = req.body.gameId;
    const userId = req.session.user.id;
    let prediction = req.body.button;
    if (prediction == 'X') prediction = 3;

    UserRoom.findOne({
        where: {
            roomId: roomId,
            userId: req.session.user.id
        }
    }).then(userroom => {
        if (!userroom) {
            req.flash('error', 'Only room members can make predictions!');
            return res.redirect('/single-room?roomId=' + roomId);
        }
        else {
            Prediction.findOne({
                where: {
                    userId: userId,
                    gameId: gameId,
                    roomId: roomId
                }
            }).then(oldPrediction => {
                if (oldPrediction) {
                    oldPrediction.result = prediction;
                    oldPrediction.save().then(result => {
                        req.flash('error', 'Old prediction has been overwritten');
                        req.flash('info', 'Prediction for game [' + gameId + '] have been saved successfully');
                        return res.redirect('/single-room?roomId=' + roomId);
                    })
                }
                else {
                    Prediction.create({
                        result: prediction,
                        userId: userId,
                        gameId: gameId,
                        roomId: roomId
                    }).then(prediction => {
                        req.flash('info', 'Prediction for game [' + gameId + '] have been saved successfully');
                        return res.redirect('/single-room?roomId=' + roomId);
                    }).catch(err => {
                        console.log(err);
                    })
                }
            })
        }
    })
}

exports.joinPrivateRoomReq = (req, res, next) => {
    const roomName = req.body.roomname;
    Room.findOne({
        where: {
            name: roomName
        }
    }).then(room => {
        if (!room) {
            req.flash('error', 'Room with that name doesn\'t exist!');
            return res.redirect('/room-home');
        }
        else if (room.visibility == 1) {
            req.flash('error', 'That is public room!');
            return res.redirect('/room-home');
        }
        else {
            UserRoom.findOne({
                where: {
                    userId: req.session.user.id,
                    roomId: room.id
                }
            }).then(userroom => {
                if (userroom) {
                    req.flash('error', 'You are already in this room!');
                    return res.redirect('/room-home');
                }
                else {
                    Request.findOne({
                        where: {
                            roomId: room.id,
                            userId: req.session.user.id,
                            isActive: 1
                        }
                    }).then(request => {
                        if (request) {
                            req.flash('error', 'You request for this room is pending! Please wait!');
                            return res.redirect('/room-home');
                        } else {
                            Request.create({
                                roomId: room.id,
                                userId: req.session.user.id,
                                isActive: 1
                            }).then(result => {
                                Message.create({
                                    senderId: req.session.user.id,
                                    receiverId: room.userId,
                                    message: 'New join request in private room: ' + room.name,
                                    isRead: 0
                                }).then(message => {
                                    req.flash('info', 'Request has been sent!');
                                    return res.redirect('/room-home');
                                })
                            });
                        }
                    })
                }
            })
        }
    })
}

exports.postHandleReq = (req, res, next) => {
    const roomId = req.body.roomId;
    const userId = req.body.userId;
    const action = req.body.button;

    Request.findOne({
        where: {
            userId: userId,
            roomId: roomId,
            isActive: 1
        }
    }).then(request => {
        User.findOne({
            where: {
                id: userId
            }
        }).then(user => {
            Room.findOne({
                where: {
                    id: roomId
                }
            }).then(room => {
                if (user.money < room.entryFee && action == "Accept") {
                    req.flash('error', 'User doesn\'t have enough money!');
                    return res.redirect('/single-room?roomId=' + roomId);
                }

                request.isActive = 0;
                request.save().then(result => {
                    if (action == "Accept") {
                        UserRoom.create({
                            roomId: roomId,
                            userId: userId,
                            points: 0
                        }).then(userroom => {
                            room.membersCount++;
                            room.save().then(result => {
                                user.money -= room.entryFee;
                                user.save().then(result => {
                                    Message.create({
                                        senderId: req.session.user.id,
                                        receiverId: userId,
                                        message: 'Your request to join private room ' + room.name + ' has been accepted!',
                                        isRead: 0
                                    }).then(message => {
                                        req.flash('info', 'User accepted!');
                                        return res.redirect('/single-room?roomId=' + roomId);
                                    })
                                })
                            })
                        })
                    }
                    else {
                        Message.create({
                            senderId: req.session.user.id,
                            receiverId: userId,
                            message: 'Your request to join private room ' + room.name + ' has been rejected!',
                            isRead: 0
                        }).then(message => {
                            req.flash('info', 'User rejected!');
                            return res.redirect('/single-room?roomId=' + roomId);
                        })
                    }
                })
            })
        })
    })
}







///////// HELPERS

function joinRoom(req, res, next, roomId) {
    const userId = req.session.user.id;
    const today = new Date();
    Room.findOne({
        where: {
            id: roomId
        }
    }).then(room => {
        if (room.dateBegin < today) {
            req.flash('error', 'This competition has already started!');
            return res.redirect('/room-home');
        }
        if (room.membersCount == room.maxPlayers) {
            req.flash('error', 'This room is full!');
            return res.redirect('/room-home');
        }
        else {
            User.findOne({
                where: {
                    id: userId
                }
            }).then(user => {
                if (user.money < room.entryFee) {
                    req.flash('error', 'You don\'t have enough money to join this room!');
                    return res.redirect('/room-home');
                }
                else {
                    UserRoom.findOne({
                        where: {
                            userId: userId,
                            roomId: roomId
                        }
                    }).then(result => {
                        if (result) {
                            req.flash('error', 'You are already in this room!');
                            return res.redirect('/room-home');
                        }
                        else {
                            UserRoom.create({
                                points: 0,
                                userId: userId,
                                roomId: roomId
                            }).then(result => {
                                room.membersCount += 1;
                                user.money -= room.entryFee;
                                room.save().then(result => {
                                    user.save().then(result => {
                                        req.session.user = user;
                                        // TODO Style this message or redirect inside room!
                                        req.flash('info', 'You have successfully joined room!');
                                        return res.redirect('/room-home');
                                    })
                                });
                            }).catch(err => {
                                console.log(err);
                            })
                        }
                    });
                }
            })
        }
    })
}