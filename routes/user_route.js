const express = require('express');
const uc = require('../controllers/user_controller');

const router = express.Router();

// ----- get -----
router.get('/login', uc.login_get);
router.get('/register', uc.register_get);
router.get('/logout', uc.logout);
router.get('/view', uc.view_user);

// ----- post ------
router.post('/login', uc.login_post);
router.post('/register', uc.register_post);

module.exports = router;