const contactsModel = require('../models/contactsModel');

exports.getContactsAll = async (data) => {
    const results = await contactsModel.getAllContacts();
    return results;
}