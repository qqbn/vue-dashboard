const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()


const getAllContacts = async () => {
    const contacts = await prisma.contacts.findMany();
    return contacts;
}

const addContact = async (data) => {
    const contact = prisma.contacts.create({
        data:{
            first_name: data.first_name,
            last_name: data.last_name,
            phone_number: data.phone_number,
            email: data.email,
            avatar: data.avatar
        }
    })

    return contact;
}


module.exports = {
    getAllContacts,
    addContact
}