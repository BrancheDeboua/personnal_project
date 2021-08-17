const index = (req, res) => {
    res.render('general/index');
};

const fourofour = (req, res) => {
    res.render('general/404');
}

module.exports = {
    index,
    fourofour
};