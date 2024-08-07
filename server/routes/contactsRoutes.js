const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contactsController');

router.get('/', contactsController.getContacts);
router.post('/addContact', contactsController.addContact);
router.delete('/delete/:id', contactsController.deleteContact);
router.put('/editContact/:id', contactsController.editContact);
router.patch('/addToDashboard/:id', contactsController.addToDashboard);


module.exports = router;