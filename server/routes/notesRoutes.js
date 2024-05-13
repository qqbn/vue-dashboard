const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notesController');

router.get('/', notesController.getNotes);
router.put('/editNote/:id', notesController.editNote);
router.delete('/delete/:id', notesController.deleteNote);
router.post('/addNote', notesController.addNote);


module.exports = router;