const index = (req, res) => {
    console.log(req.session);
    res.render('general/index');
};

const fourofour = (req, res) => {
    res.render('general/404');
}

module.exports = {
    index,
    fourofour
};