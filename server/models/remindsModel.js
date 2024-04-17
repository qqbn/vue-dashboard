const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()


const getAllReminds = async () => {
    const reminds = await prisma.reminds.findMany();
    return reminds;
}


module.exports = {
    getAllReminds,
}