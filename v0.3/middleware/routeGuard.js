exports.isGuest = (req, res, next) => {
    if (req.session.isLoggedIn != 0)
    {
        return res.redirect('/login');
    }
    else{
        next();
    }
}

exports.isUser = (req, res, next) => {
    if (req.session.isLoggedIn == 0 || req.session.isLoggedIn == undefined)
    {
        req.flash('error', 'Please login first!');
        return res.redirect('/login');
    }
    else{
        next();
    }
}

exports.isAdmin = (req, res, next) => {
    if (req.session.isLoggedIn != 2)
    {
        req.flash('error', 'ADMINS ONLY! Login as admin to visit page.');
        return res.redirect('/login');
    }
    else{
        next();
    }
}