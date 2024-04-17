const notesModel = require('../models/notesModel');

exports.getNotesAll = async (data) => {
    const results = await notesModel.getAllNotes();
    return results;
}