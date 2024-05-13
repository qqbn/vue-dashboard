const notesModel = require('../models/notesModel');
const helpers = require('../helpers/helpers');

exports.getNotesAll = async (data) => {
    const results = await notesModel.getAllNotes();
    
    results.forEach(result => {
        result.date = helpers.formatDate(result.date);
    })

    return results;
}

exports.editNoteAction = async (id, data) => {
    const result = await notesModel.editNote(id, data);
    
    result.date = helpers.formatDate(result.date);

    return result;
}

exports.deleteNoteAction = async (id) => {
    const result = await notesModel.deleteNote(id);

    return result;
}

exports.addNoteAction = async (data) => {
    data['date'] = new Date();
    const result = await notesModel.addNote(data);

    result.date = helpers.formatDate(result.date);

    return result;
}