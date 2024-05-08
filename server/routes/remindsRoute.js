const express = require('express');
const router = express.Router();
const remindsController = require('../controllers/remindsController');

router.get('/', remindsController.getReminds);
router.delete('/delete/:id', remindsController.deleteRemind);


module.exports = router;