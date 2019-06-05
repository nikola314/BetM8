const User = require('../models/user');

exports.getAllUsers = (req, res, next) => {
  User.findAll()
    .then(users => {
      return res.render('admin/all-users', {
        pageTitle: 'All Users',
        path: '/all-users',
        allUsers: users,
        errorMessage: req.flash('error'),
        infoMessage: req.flash('info')
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postBanUser = (req, res, next) => {
  const userId = req.body.banId;

  User.findByPk(userId)
    .then(user => {
      if (user.type == 2) return res.redirect('/all-users');
      if (user.type == 1) user.type = 0;
      else if (user.type == 0) user.type = 1;

      user.save().then(user => {
        return res.redirect('/all-users');
      });
    })
    .catch(err => console.log(err));
};

exports.postBanRoomCreate = (req, res, next) => {
  const userId = req.body.banId;

  User.findByPk(userId)
    .then(user => {
      if (user.type == 2) return res.redirect('/all-users');
      if (user.canCreateRoom == 1) user.canCreateRoom = 0;
      else if (user.canCreateRoom == 0) user.canCreateRoom = 1;

      user.save().then(user => {
        return res.redirect('/all-users');
      });
    })
    .catch(err => console.log(err));
};

exports.banUserByName = (req, res, next) => {
  const username = req.body.username;

  User.findOne({
    where: {
      username: username
    }
  }).then(user => {
    if (!user) {
      req.flash('error', 'User with that username doesn\'t exist!');
      return res.redirect('/all-users');
    }
    else if (user.type == 2) {
      req.flash('error', 'Admin cannot be banned!');
      return res.redirect('/all-users');
    }
    else {
      if (user.type == 1) {
        user.type = 0;
        req.flash('info', 'User ' + username + ' has been BANNED successfully!');
      }
      else if (user.type == 0) {
        user.type = 1;
        req.flash('info', 'User ' + username + ' has been UNBANNED successfully!');
      }

      user.save().then(user => {
        return res.redirect('/all-users');
      });
    }
  })
}