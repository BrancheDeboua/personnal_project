// ----- General include -----
const express = require('express');
const http = require('http');
const { local_session } = require('./utils/auth');
const database = require('./config/database');
const passport = require('passport');

// ----- Routes include -----
const gr = require('./routes/general_route');
const ur = require('./routes/user_route');
const mr = require('./routes/management_route');

// ----- Server setup -----
const app = express();
const server = http.createServer(app);

// ----- Middlewares -----
app.set('view engine', 'ejs');
app.use(database.router);
app.use(local_session);
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// ----- Routes -----
app.use('/management', mr);
app.use('/user', ur);
app.use('/', gr);   // Must be last because there is the 404 page over there

// ----- Listening -----
server.listen(3000);