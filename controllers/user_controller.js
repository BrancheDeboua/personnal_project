const { connection } = require('../utils/database');
const bcrypt = require('bcrypt');

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
    req.session.destroy();
    res.redirect('/');
};

// ----- post -----
const login_post = (req, res) => {
    const { email, password } = req.body;
    connection.query('SELECT * FROM user WHERE email = \'' + email + '\';', (err, result, field) => {
        if(result.length > 0){
            bcrypt.compare(password, result[0].password, (err, r) => {
                if(r){
                    req.session.username = result[0].username;
                    req.session.email = result[0].email;
                    req.session.isAuth = true;
                    res.redirect('/');
                }
                else {
                    res.redirect('/user/login');
                }
            });
        }
        else{
            res.redirect('/user/register');
        }
    });
};

const register_post = (req, res) => {
    const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(pattern.test(req.body.email)){
        connection.query('SELECT username FROM user WHERE username = \'' + req.body.username + '\' OR email = \'' + req.body.email + '\'; ', (err, result, field) => {
            if (err) throw err;

            if(result.length == 0){
                bcrypt.hash(req.body.password, 13, (err, result) => {
                    connection.query('INSERT INTO user VALUES (\'' + req.body.username + '\', \'' + req.body.email +'\', \'' + result + '\');', (err) => {
                        if (err) throw err;
                        res.redirect('/');
                    });
                })  
            }
            else {
                res.redirect('/user/login');
            }    
        });
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