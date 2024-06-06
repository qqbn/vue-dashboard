const contactsModel = require('../models/contactsModel');

exports.getContactsAll = async (data) => {
    const results = await contactsModel.getAllContacts();
    return results;
}

exports.addContactAction = async (data) => {
    const results = await contactsModel.addContact(data)
    return results;
}