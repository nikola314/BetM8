const User = require('../models/user');

const bcrypt = require('bcryptjs');

const stripe = require('stripe')('sk_test_258Jjg61M0s56J0WirY4RbsE00AicTW2bc');

const Message = require('../models/message');

const db = require('../util/database');

exports.getUserProfile = (req, res, next) => {
    return res.render('user/user-profile', {
        pageTitle: 'User Profile',
        path: '/user-profile',
        currentUser: req.session.user,
        errorMessage: req.flash('error'),
        infoMessage: req.flash('info')
    })
};

exports.postUserProfile = (req, res, next) => {
    const token = req.body.stripeToken;
    const type = req.body.type;
    const money = req.session.moneyAmount;

    if (type == 'withdraw' && req.session.user.money < money) {
        req.flash('error', 'You don\'t have enough money!');
        return res.redirect('/user-profile');
    }

    const charge = stripe.charges.create({
        amount: money * 100,
        currency: 'rsd',
        description: type + 'money',
        source: token
    }).then(result => {
        if (result) {
            User.findByPk(req.session.user.id)
                .then(user => {
                    if (type == 'withdraw') user.money -= money;
                    else if (type == 'add') user.money += money;
                    else {
                        req.flash('error', 'Unknown transaction type!');
                        return res.redirect('/user-profile');
                    }
                    req.session.user = user;
                    user.save();
                })
                .then(result => {
                    return res.redirect('/user-profile');
                })
                .catch(err => console.log(err));
        }
        else {
            req.flash('error', 'Payment not successful!');
            return res.redirect('/user-profile');
        }
    }).catch(err => {
        req.flash('error', err.message);
        return res.redirect('/user-profile');
    });
}

exports.getEditUser = (req, res, next) => {

    return res.render('user/edit-user', {
        pageTitle: 'Edit User',
        path: '/edit-user',
        currentUser: req.session.user
    })
};

exports.postEditUser = (req, res, next) => {
    const updatedFirstName = req.body.name;
    const updatedLastName = req.body.surname;
    const updatedEmail = req.body.email;
    let updatedCountry = req.body.country;
    // TODO Validate input
    // If there is no new selection, stay with the old value
    if (updatedCountry == "") updatedCountry = req.session.user.country;

    User.findByPk(req.session.user.id)
        .then(user => {
            console.log('nasao usera');

            user.firstName = updatedFirstName;
            user.lastName = updatedLastName;
            user.email = updatedEmail;
            user.country = updatedCountry;
            req.session.user = user;
            user.save();
        })
        .then(result => {
            return res.redirect('/user-profile');
        })
        .catch(err => console.log(err));
};

exports.getChangePassword = (req, res, next) => {
    return res.render('user/change-password', {
        pageTitle: 'Change Password',
        path: '/change-password',
        errorMessage: req.flash('error'),
        infoMessage: req.flash('info')
    })
};

exports.postChangePassword = (req, res, next) => {
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;
    const repeatPassword = req.body.repeatPassword;

    if (newPassword != repeatPassword) {
        req.flash('error', 'Passwords do not match!');
        return res.redirect('/change-password');
    }

    else {
        bcrypt.compare(oldPassword, req.session.user.password).then(matchResult => {
            if (matchResult) {
                User.findByPk(req.session.user.id)
                    .then(user => {
                        bcrypt.hash(newPassword, 12).then(hashedPassword => {
                            user.password = hashedPassword;
                            return user.save();
                        }).catch(err => console.log(err));
                    })
                    .then(result => {
                        console.log('UPDATED PASSWORD!');
                        return res.redirect('/');
                    })
                    .catch(err => console.log(err));
            }
            else {
                req.flash('error', 'Incorrect old password!');
                return res.redirect('/change-password');
            }
        }).catch(err => console.log(err));
    }
};

exports.getAddMoney = (req, res, next) => {
    return res.render('user/add-money', {
        pageTitle: 'Add Money',
        path: '/add-money',
        errorMessage: req.flash('error'),
        infoMessage: req.flash('info')
    })
};

exports.postAddMoney = (req, res, next) => {
    const moneyAmount = parseFloat(req.body.moneyAmount);
    const type = req.body.type;
    req.session.moneyAmount = moneyAmount;
    return res.render('user/stripe-add-money', {
        pageTitle: 'Stripe Add Money',
        path: '/stripe-add-money',
        money: moneyAmount,
        type: type
    })
};

exports.getStripeAddMoney = (req, res, next) => {
    const moneyAmount = parseFloat(req.body.moneyAmount);
    const type = req.body.type;
    return res.render('user/stripe-add-money', {
        pageTitle: 'Stripe Add Money',
        path: '/stripe-add-money',
        type: type,
        money: moneyAmount,
    })
};

exports.getWithdrawMoney = (req, res, next) => {
    return res.render('user/withdraw-money', {
        pageTitle: 'Withdraw Money',
        path: '/withdraw-money',
        errorMessage: req.flash('error'),
        infoMessage: req.flash('info')
    })
};

exports.postWithdrawMoney = (req, res, next) => {
    const moneyAmount = parseFloat(req.body.moneyAmount);
    const type = req.body.type;
    req.session.moneyAmount = moneyAmount;

    if (req.session.user.money < moneyAmount) {
        req.flash('error', 'You don\'t have enough money!');
        return res.redirect('/user-profile');
    }

    return res.render('user/stripe-add-money', {
        pageTitle: 'Stripe Add Money',
        path: '/stripe-add-money',
        money: moneyAmount,
        type: type
    })
};

exports.getInbox = (req, res, next) => {
    const userId = req.session.user.id;
    let promises = [];
    Message.findAll({
        where: {
            receiverId: userId
        },
        order: db.literal('createdAt DESC')
    }).then(messages => {
        for (let msg of messages) {
            msg.isRead = 1;
            msg.save();
            promises.push(User.findByPk(msg.senderId).then(user=>{
                msg.senderName = user.username;
            }));
        }

        Promise.all(promises).then(result => {
            return res.render('user/inbox', {
                pageTitle: 'Inbox',
                path: '/inbox',
                allMessages: messages
            })
        })
    });
}