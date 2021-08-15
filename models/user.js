const Sequelize = require('sequelize');
const database = require('../config/database');

const Users = database.sequelize.define('users', {
    username: {
        type: Sequelize.STRING(40),
        allowNull: false,
        primaryKey: true
    },
    email: {
        type: Sequelize.STRING(40),
        allowNull: false
    },
    password: {
        type: Sequelize.STRING(100),
        allowNull: false
    }
});

module.exports = Users;