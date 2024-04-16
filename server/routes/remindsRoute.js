const express = require('express');
const router = express.Router();
const remindsController = require('../controllers/remindsController');

router.get('/', remindsController.getReminds);


module.exports = router;