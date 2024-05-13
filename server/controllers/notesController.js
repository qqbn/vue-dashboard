const notesService = require('../services/notesServices');
const validation = require('../validations/validations');

const getNotes = async (req, res) => {
    const data = await notesService.getNotesAll();

    res.json(data);
}

const editNote = async (req, res) => {
    const id = JSON.parse(req.params['id']);
    if(!id) res.status(400).json({ message: 'Note not found' });

    const { error } = await validation.validateNote(req.body);
    if(error){
        return res.status(400).json({message: error.message});
    }

    const data = await notesService.editNoteAction(id, req.body);
    if(data){
        res.status(200).json({ message: 'Note edited' });
    }
}

const deleteNote = async (req, res) => {
    const id = JSON.parse(req.params['id']);
    if(!id) res.status(400).json({ message: 'Note not found' });

    const data = await notesService.deleteNoteAction(id);
    if(data){
        res.status(200).json({ message: 'Note deleted' });
    }
}

const addNote = async (req, res) => {
    const { error } = await validation.validateNote(req.body);
    if(error){
        return res.status(400).json({message: error.message});
    }

    const data = await notesService.addNoteAction(req.body);
    if(data){
        res.send(data);
    }
}

module.exports={
    getNotes,
    editNote,
    deleteNote,
    addNote
}