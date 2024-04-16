const contactsService = require('../services/contactsService');

const getContacts = async (req, res) => {
    const data = await contactsService.getContactsAll();

    res.json(data);
}

module.exports = {
    getContacts,
}