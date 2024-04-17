const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()


const getAllNotes= async () => {
    const notes = await prisma.notes.findMany();
    return notes;
}


module.exports = {
    getAllNotes,
}