const User = require('../models/user');

const bcrypt = require('bcryptjs');

const Message = require('../models/message');

const authController = require('../controllers/auth');

const nodemailer = require('nodemailer');

const sendgridTransport = require('nodemailer-sendgrid-transport');

const transporter = nodemailer.createTransport(sendgridTransport({
    auth : {
        api_key : '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' 
    }
}));

exports.getIndex = (req, res, next) => {
    return res.render('home/index', {
        path: '/',
        pageTitle: 'Home',
    });
}

exports.getLogin = (req, res, next) => {
    return res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        errorMessage: req.flash('error'),
        infoMessage: req.flash('info')
    });
};

exports.postLogin = (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({
        where: { username: username }
    }).
        then(user => {
            if (!user) {
                req.flash('error', 'Username doesn\'t exist');
                return res.redirect('/login');
            }
            else if (user.type == 0) {
                req.flash('error', 'You are banned!');
                return res.redirect('/login');
            }
            else {
                bcrypt.compare(password, user.password).then(matchResult => {
                    if (matchResult) {
                        req.session.isLoggedIn = user.type;
                        req.session.user = user;
                        Message.findAll({
                            where: { senderId: user.id }
                        }).then(messages => {
                            res.locals.newMessagesCnt = messages.length;
                            return res.redirect('/');
                        })
                    }
                    else {
                        req.flash('error', 'Invalid password!');
                        return res.redirect('/login');
                    }
                }).catch(err => console.log(err));
            }
        }).catch(err => console.log(err));
};

exports.getLogout = (req, res, next) => {
    req.session.isLoggedIn = 0;
    return res.redirect('/');
};

exports.postLogout = (req, res, next) => {
    req.session.isLoggedIn = 0;
    return res.redirect('/');
};

exports.postRegister = (req, res, next) => {
    const name = req.body.name;
    const surname = req.body.surname;
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const country = req.body.country;

    // Cili

    User.findOne({
        where: { username: username }
    })
        .then(userDoc => {
            let redirect = false;
            if (userDoc) {
                req.flash('error', 'Username already exists!');
                redirect = true;
            }
            if (password !== confirmPassword) {
                req.flash('error', 'Passwords do not match!');
                redirect = true;
            }
            if (!name || !surname ||  !username || !password || !country){
                req.flash('error', 'not all fields are filled!');
                redirect=true;
            }
            if (redirect){
                return res.redirect('/register');
            }
            bcrypt.hash(password, 12).then(hashedPassword => {
                User.create({
                    firstName: name,
                    lastName: surname,
                    username: username,
                    password: hashedPassword,
                    mail: email,
                    country: country,
                    type: 1,
                    money: 0,
                    canCreateRoom: 1,
                    status: 1
                });
            }).catch(err => console.log(err));

            return res.redirect('/');
        })
        .catch(err => { console.log(err); });
};

exports.getRegister = (req, res, next) => {
    return res.render('auth/register', {
        path: '/register',
        pageTitle: 'Register',
        errorMessage: req.flash('error'),
        infoMessage: req.flash('info')
    });
}