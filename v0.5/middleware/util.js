const Message = require('../models/message');

exports.canCreateRoom = (req, res, next) => {
    if (req.session.user.canCreateRoom != 1) {
        req.flash('error', 'You are not allowed to create room!');
        return res.redirect('/room-home');
    }
    else {
        next();
    }
}

exports.countNewMessages = (req, res, next) => {
    if (req.session.user) {
        Message.findAll({
            where: { 
                receiverId: req.session.user.id,
                isRead: 0 
            }
        }).then(messages => {
            req.session.newMessagesCnt = messages.length;
            next();
        })
    }
    else {
        next();
    }
}