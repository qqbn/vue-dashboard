const notesModel = require('../models/notesModel');
const helpers = require('../helpers/helpers');

exports.getNotesAll = async (data) => {
    const results = await notesModel.getAllNotes();
    
    results.forEach(result => {
        result.date = helpers.formatDate(result.date);
    })

    return results;
}