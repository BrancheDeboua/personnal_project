const express = require('express');
const mc = require('../controllers/management_controller');
const auth = require('../utils/auth');

const router = express.Router();

router.use(auth.isAuth);

router.get('/', mc.index);

module.exports = router;