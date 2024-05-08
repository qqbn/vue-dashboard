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

module.exports = {
    getAllReminds,
    deleteRemind,
}