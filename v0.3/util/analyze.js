const User = require('../models/user');
const Room = require('../models/room');
const UserRoom = require('../models/user-room');
const Game = require('../models/game');
const League = require('../models/league');
const Prediction = require('../models/prediction');
const RoomLeague = require('../models/room-league');
const Request = require('../models/request');
const Message = require('../models/message');
const Sequelize = require('sequelize');
const db = require('../util/database');


const Op = Sequelize.Op;

exports.analyzeGames = function () {
    let promises = [];
    Game.findAll({
        where: {
            isProcessed: 0,
            result: {
                [Op.not]: null
            }
        }
    }).then(games => {
        for (let game of games) {
            game.isProcessed = 1;
            promises.push(game.save());
        }

        Promise.all(promises).then(result => {
            promises = [];
            for (let game of games) {
                Prediction.findAll({
                    where: {
                        gameId: game.id
                    }
                }).then(predictions => {
                    for (let prediction of predictions) {
                        Room.findByPk(prediction.roomId).then(room => {
                            const outcome = prediction.result == game.result;
                            UserRoom.findOne({
                                where: {
                                    userId: prediction.userId,
                                    roomId: prediction.roomId
                                }
                            }).then(userroom => {
                                if (outcome == true) {
                                    userroom.points += 10;
                                }
                                else {
                                    if (room.scoringType == 2) {
                                        userroom.points -= 5;
                                    }
                                    else if (room.scoringType == 3) {
                                        userroom.points -= 10;
                                    }
                                }
                                userroom.save();
                            })
                        })
                    }
                })
            }
        })
    })
}

exports.analyzeRoomEnd = function () {
    Room.findAll().then(rooms => {
        const today = new Date();
        for (let room of rooms) {
            if (room.dateEnd < today) {
                UserRoom.findAll({
                    where: {
                        roomId: room.id
                    },
                    order: db.literal('points DESC')
                }).then(userrooms => {
                    let promises = [];

                    let first;
                    promises.push(User.findByPk(userrooms[0].userId).then(user => {
                        first = user;
                    }));
                    let second;
                    promises.push(User.findByPk(userrooms[1].userId).then(user => {
                        second = user;
                    }));
                    let third;
                    promises.push(User.findByPk(userrooms[2].userId).then(user => {
                        third = user;
                    }));
                    let prize = room.entryFee * userrooms.length;
                    Promise.all(promises).then(result => {
                        if (room.distributionType == 1) {
                            first.money += prize;
                        }
                        else if (room.distributionType == 2) {
                            first.money += prize / 2;
                            second.money += prize * 0.3;
                            third.money += prize * 0.2;
                            second.save();
                            third.save();
                            Message.create({
                                senderId: 1,
                                receiverId: second.id,
                                message: 'Competition: ' + room.name + ' has come to an end. Congrats, you have won the second prize! Check your balance!',
                                isRead: 0
                            });
                            Message.create({
                                senderId: 1,
                                receiverId: third.id,
                                message: 'Competition: ' + room.name + ' has come to an end. Congrats, you have won the third prize! Check your balance!',
                                isRead: 0
                            });

                        }
                        else {
                            first.money += prize * 0.7;
                            second.money += prize * 0.2;
                            third.money += prize * 0.1;
                            second.save();
                            third.save();
                            Message.create({
                                senderId: 1,
                                receiverId: second.id,
                                message: 'Competition: ' + room.name + ' has come to an end. Congrats, you have won the second prize! Check your balance!',
                                isRead: 0
                            });
                            Message.create({
                                senderId: 1,
                                receiverId: third.id,
                                message: 'Competition: ' + room.name + ' has come to an end. Congrats, you have won the third prize! Check your balance!',
                                isRead: 0
                            });

                        }
                        first.save();
                        Message.create({
                            senderId: 1,
                            receiverId: first.id,
                            message: 'Competition: ' + room.name + ' has come to an end. Congrats, you have won the first prize! Check your balance!',
                            isRead: 0
                        });
                        Room.destroy({
                            where: {
                                id: room.id
                            }
                        })
                    })
                })
            }
        }
    })
}

exports.analyzeRoomStart = function () {
    const today = new Date();
    Room.findAll().then(rooms => {
        for (let room of rooms) {
            if (room.membersCount < room.minPlayers &&
                room.dateBegin < today) {
                UserRoom.findAll({
                    where: {
                        roomId: room.id
                    }
                }).then(userrooms => {
                    let promises = [];
                    for (let userroom of userrooms) {
                        promises.push(Message.create({
                            senderId: 1,
                            receiverId: userroom.userId,
                            message: 'Room: ' + room.name + ' has been deleted because there was not enough participants!',
                            isRead: 0
                        }));
                    }
                    Promise.all(promises).then(result => {
                        Room.destroy({
                            where: {
                                id: room.id
                            }
                        });
                    })
                })
            }
        }
    })
}