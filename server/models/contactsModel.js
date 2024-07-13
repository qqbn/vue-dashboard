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
            avatar: data.avatar,
            added_to_dashboard: data.added_to_dashboard
        }
    })

    return contact;
}

const deleteContact = async (id) => {
    const contact = prisma.contacts.delete({
        where: {
            id: id,
        }
    })

    return contact;
}

const editContact = async (id, data) => {
    const contact = prisma.contacts.update({
        where: {
            id: id
        },
        data: {
            first_name: data.first_name,
            last_name: data.last_name,
            phone_number: data.phone_number,
            email: data.email,
            avatar: data.avatar,
            added_to_dashboard: data.added_to_dashboard
        }
    })

    return contact;
}

const contactToDashboard = async (id, data) => {
    const task = await prisma.contacts.update({
        where: {
            id: id,
        },
        data: {
            added_to_dashboard: data.add,
        }
    })
    
    return task;
}


module.exports = {
    getAllContacts,
    addContact,
    deleteContact,
    editContact,
    contactToDashboard
}