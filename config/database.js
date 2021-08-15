const express = require('express');
const Sequelize = require('sequelize');
const session = require('express-session');
const SequelizeStore = require('express-session-sequelize')(session.Store);

const router = express.Router();

const sequelize = new Sequelize('personnel', 'pi', 'pass', {
    dialect: 'postgres',
    host: '192.168.0.50',
    port: 5432,
    logging: false
});

const sequelizeSessionStore = new SequelizeStore({
    db: sequelize
});

router.use(session({
    key: 'sequelize-session-key',
    secret: 's8R8nJeZBTLiRzIonCs3R0dV4BEURhCkvKa7th7kLah1xEGRAeXeQGv0FBzm',
    store: sequelizeSessionStore,
    resave: false,
    saveUninitialized: false
}));


module.exports = { 
    sequelize,
    router
};