const User = require('../models/user');

const Room = require('../models/room');

const UserRoom = require('../models/user-room');

const Game = require('../models/game');

const League = require('../models/league');

const Prediction = require('../models/prediction');

const RoomLeague = require('../models/room-league');


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
        joinRoom(req, res, next, room.id);
    }).catch(err => {
        console.log(err);
    })
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
            let promises = [];

            RoomLeague.findAll({
                where: {
                    roomId: roomId
                }
            }).then(roomleagues => {
                for (let roomleague of roomleagues) {
                    promises.push(Game.findAll({
                        where: {
                            leagueId: roomleague.leagueId
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
                            for (let j = 0; j < mygames[i].length; j++)
                            {
                                gamesarray.push(mygames[i][j]);
                            }
                        }

                        UserRoom.findAll({
                            where: {
                                roomId: roomId,
                            }
                        }).then(userrooms => {
                            userrooms.sort((a,b) => (a.points > b.points) ? -1 : ((b.points > a.points) ? 1 : 0));
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
                                return res.render('room/single-room', {
                                    pageTitle: 'Room',
                                    path: '/single-room',
                                    room: room,
                                    roomUser: user,
                                    allGames: gamesarray,
                                    userRooms: userrooms,
                                    leaderboardUsers: leaderboardUsers,
                                    errorMessage: req.flash('error'),
                                    infoMessage: req.flash('info')
                                })
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

exports.postLeaveRoom = (req, res, next) => {
    const roomId = req.body.roomId;
    const userId = req.session.user.id;

    UserRoom.destroy({
        where: {
            userId: userId,
            roomId: roomId
        }
    }).then(result => {
        req.flash('info', 'You have successfully leaved room!');
        return res.redirect('/my-rooms');
    })
}

exports.postMakePrediction = (req, res, next) => {
    const roomId = req.body.roomId;
    const gameId = req.body.gameId;
    const userId = req.session.user.id;
    const prediction = req.body.button;

    Prediction.findOne({
        where: {
            userId: userId,
            gameId: gameId
        }
    }).then(oldPrediction => {
        if (oldPrediction) {
            oldPrediction.result = prediction;
            oldPrediction.save().then(result => {
                req.flash('error', 'Old prediction has been overwritten');
                req.flash('info', 'Prediction for game [' + gameId + '] have been saved successfully');
                res.redirect('/single-room?roomId=' + roomId);
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
                res.redirect('/single-room?roomId=' + roomId);
            }).catch(err => {
                console.log(err);
            })
        }
    })
}





















///////// HELPERS

function joinRoom(req, res, next, roomId) {
    const userId = req.session.user.id;

    Room.findOne({
        where: {
            id: roomId
        }
    }).then(room => {
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