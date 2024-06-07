const contactsModel = require('../models/contactsModel');

exports.getContactsAll = async (data) => {
    const results = await contactsModel.getAllContacts();
    return results;
}

exports.addContactAction = async (data) => {
    const results = await contactsModel.addContact(data)
    return results;
}

exports.deleteContactAction = async (id) => {
    const results = await contactsModel.deleteContact(id);
    return results;
}

exports.editContactAction = async (id, data) => {
    const results = await contactsModel.editContact(id, data);
    return results;
}