const express = require('express');
const router = express.Router();
const remindsController = require('../controllers/remindsController');

router.get('/', remindsController.getReminds);
router.delete('/delete/:id', remindsController.deleteRemind);
router.post('/addRemind', remindsController.addRemind);


module.exports = router;