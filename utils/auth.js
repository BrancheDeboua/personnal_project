const isAuth = (req, res, next) => {
    if(req.session.isAuth)
        next();
    else
        res.redirect('/user/login');
}

const local_session = (req, res, next) => {
    res.locals.session = req.session;
    next();
};

module.exports = {
    isAuth,
    local_session
}