//const { connection } = require('../utils/database');
const bcrypt = require('bcrypt');
//const sequelize = require('../config/database');
const Users = require('../models/user');

// ----- get -----
const login_get = (req, res) => {
    res.render('user/login');
};

const register_get = (req, res) => {
    res.render('user/register');
};

const view_user = (req, res) => {
    if(req.session.isAuth)
        res.render('user/view');
    else
        res.redirect('/user/register');
};

const logout = (req, res) => {
    try{ 
        req.session.destroy();
    }
    catch(err){
        console.log(err);
    }
    
    res.redirect('/');
};

// ----- post -----
const login_post = async (req, res) => {
    const { email, password } = req.body;
    const users = await Users.findAll({ where: { email }});

    if(users.length > 0){
        if(await bcrypt.compare(password, users[0].password)) {
            console.log("test");
            req.session.username = users[0].username;
            req.session.email = users[0].email;
            req.session.isAuth = true;
            res.redirect('/');
        }
        else{
            res.redirect('/user/register');
        }
    }
    else {
        res.redirect('/user/register');
    }
};

const register_post = async (req, res) => {
    const { username, email } = req.body;
    const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if(pattern.test(req.body.email)){
        const users = await Users.findAll({where: { email } });
        if (users.length == 0){
            const password = await bcrypt.hash(req.body.password, 10);
            await Users.create({ username, email, password});
            res.redirect('/');
        }
        else{
            res.redirect('/user/login');
        }
    }
    else{
        res.redirect('/user/register');
    }
};

module.exports = {
    login_get,
    login_post,
    register_get,
    register_post,
    logout,
    view_user
}