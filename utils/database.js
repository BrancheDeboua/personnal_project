const mysql = require('mysql');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const express = require('express');

const router = express.Router();

var options = {
    host: '192.168.0.50',
    port: 3306,
    user: 'pi',
    password: 'pass',
    database: 'personnel'
};

var connection = mysql.createConnection(options);
connection.connect();
var sessionStore = new MySQLStore(options);

router.use(session({
    key: 'my_session_key',
    secret: 'pwelstunpwel',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000, httpOnly: false}
}));


module.exports = {
    connection,
    sessionStore,
    router
}