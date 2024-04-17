const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()


const getAllContacts = async () => {
    const contacts = await prisma.contacts.findMany();
    return contacts;
}


module.exports = {
    getAllContacts,
}