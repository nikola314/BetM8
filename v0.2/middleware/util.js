exports.canCreateRoom = (req, res, next) => {
    if (req.session.user.canCreateRoom != 1)
    {
        req.flash('error', 'You are not allowed to create room!');
        return res.redirect('/room-home');
    }
    else{
        next();
    }
}