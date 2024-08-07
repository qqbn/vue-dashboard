const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()

const getExpenseWidgetData = async () => {
    const expenses = await prisma.expenses.findMany({
        orderBy: {date: 'desc'},
        take: 5,
    });

    return expenses;
}

const getNotesWidgetData = async () => {
    const notes = await prisma.notes.findMany({
        where: {
            important: true,
        },
        orderBy: {date: 'desc'},
        take: 3,
    })

    return notes;
}

const getRemindsWidgetData = async () => {
    const reminds = await prisma.reminds.findMany({
        orderBy: {date: 'desc'},
        take: 3,
    })

    return reminds;
}

const getTasksWidgetData = async () => {
    const tasks =  await prisma.tasks.findMany({
        where: {
            added_to_dashboard: true,
        },
        take: 5,
    })

    return tasks;
}

const getContactsWidgetData = async () => {
    const contacts = await prisma.contacts.findMany({
        where: {
            added_to_dashboard: true,
        },
        take: 5,
    })

    return contacts;
}

module.exports = {
    getExpenseWidgetData,
    getNotesWidgetData,
    getRemindsWidgetData,
    getTasksWidgetData,
    getContactsWidgetData,
}