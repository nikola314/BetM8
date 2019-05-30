exports.getIndex = (req, res, next) => {
  if (req.session.isLoggedIn == 0 || req.session.isLoggedIn == undefined) {
    return res.redirect('/login');
  }

  return res.render('home/index', {
    pageTitle: 'BetM8',
    path: '/'
  })
};