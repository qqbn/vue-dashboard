const contactsService = require('../services/contactsService');
const validation = require('../validations/validations');

const getContacts = async (req, res) => {
    const data = await contactsService.getContactsAll();

    res.json(data);
}

const addContact = async(req, res) => {
    const { error } = await validation.validateContact(req.body);
    if(error){
        return res.status(400).json({message: error.message});
    }

    const data = await contactsService.addContactAction(req.body);
    if(data){
        res.send(data);
    }
}

module.exports = {
    getContacts,
    addContact,
}