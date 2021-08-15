// This is an application used only to set up the database with sequelize

const sequelize = require('./config/database');
const Users = require('./models/user');

sequelize.sync()
    .then(async (result) => {
        console.log('[Success]: ' + result);
        const users = await Users.findAll();
        for (let i = 0; i < users.length; i++)
            console.log('Username: ' + users[i].username);
    })
    .catch(err => {
        console.log('[Error]: ' + err);
    });

