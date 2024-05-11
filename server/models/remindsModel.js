const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()


const getAllReminds = async () => {
    const reminds = await prisma.reminds.findMany();
    return reminds;
}

const deleteRemind = async (id) => {
    const deletedRemind = await prisma.reminds.delete({
        where: {
            id: id,
        }
    })

    return deletedRemind;
}

const addRemind = async (data) => {
    const remind = await prisma.reminds.create({
        data: {
            name: data.name,
            date: data.date
        }
    })

    return remind;
}

const editRemind = async (id, data) => {
    const remind = await prisma.reminds.update({
        where: {
            id: id
        },
        data: {
            name: data.name,
            date: data.date,     
        }
    })

    return remind;
}

module.exports = {
    getAllReminds,
    deleteRemind,
    addRemind,
    editRemind,
}