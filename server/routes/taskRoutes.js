const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/tasksController');

router.get('/', tasksController.getTasks);
router.put('/taskDone', tasksController.setTask);


module.exports = router;