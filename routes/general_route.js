const express = require('express');
const gc = require('../controllers/general_controller');

const router = express.Router();

router.get('/', gc.index); 
router.use(gc.fourofour);

module.exports = router;