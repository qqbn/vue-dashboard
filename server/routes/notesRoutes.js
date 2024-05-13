const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notesController');

router.get('/', notesController.getNotes);
router.put('/editNote/:id', notesController.editNote);


module.exports = router;