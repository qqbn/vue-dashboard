const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()


const getAllNotes= async () => {
    const notes = await prisma.notes.findMany();
    return notes;
}

const editNote = async (id, data) => {
    const note = await prisma.notes.update({
        where: {
            id: id
        },
        data: {
            title: data.title,
            content: data.content,
            important: data.important
        }
    })

    return note;
}

const deleteNote = async (id) => {
    const note = await prisma.notes.delete({
        where:{
            id: id
        }
    });

    return note;
}


module.exports = {
    getAllNotes,
    editNote,
    deleteNote
}