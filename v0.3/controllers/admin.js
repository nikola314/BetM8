const User = require('../models/user');

exports.getAllUsers = (req, res, next) => {
    User.findAll()
    .then(users => {
      return res.render('admin/all-users', {
        pageTitle: 'All Users',
        path: '/all-users',
        allUsers: users
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

          user.save();
      })
      .then(result => {
          return res.redirect('/all-users');
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

          user.save();
      })
      .then(result => {
          return res.redirect('/all-users');
      })
      .catch(err => console.log(err));
};