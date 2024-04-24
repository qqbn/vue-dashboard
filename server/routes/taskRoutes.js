const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/tasksController');

router.get('/', tasksController.getTasks);
router.patch('/taskDone/:id', tasksController.setTask);
router.delete('/delete/:id', tasksController.deleteTask);
router.post('/addTask', tasksController.addTask);


module.exports = router;