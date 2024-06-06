const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()


const getAllContacts = async () => {
    const contacts = await prisma.contacts.findMany();
    return contacts;
}

const addContact = async () => {
    const contact = prisma.contacts.create({
        data:{
            first_name: data.firstName,
            last_name: data.lastName,
            phone_number: data.phoneNumber,
            email: data.email,
            avatar: data.avatar
        }
    })
}


module.exports = {
    getAllContacts,
    addContact
}