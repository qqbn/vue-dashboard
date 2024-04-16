const notesService = require('../services/notesServices');

const getNotes = async (req, res) => {
    const data = await notesService.getNotesAll();

    res.json(data);
}

module.exports={
    getNotes,
}