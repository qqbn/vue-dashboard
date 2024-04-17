const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()


const getAllTasks = async () => {
    const tasks = await prisma.tasks.findMany();
    return tasks;
}


module.exports = {
    getAllTasks,
}