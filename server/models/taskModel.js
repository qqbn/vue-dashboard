const { PrismaClient } = require('@prisma/client');
const { error } = require('console');

const prisma = new PrismaClient()


const getAllTasks = async () => {
    const tasks = await prisma.tasks.findMany();
    return tasks;
}

const setTaskDone = async (id, isDone) => {
    const doneTask = await prisma.tasks.update({
        where: {
            id: id,
        },
        data: {
            done: isDone,
        }
    })
    
    return doneTask;
}

const deleteTask = async (id) => {
    const deletedTask = await prisma.tasks.delete({
        where: {
            id: id,
        }
    })

    return deletedTask;
}

const addTask = async (data) => {
    const task = await prisma.tasks.create({
        data: {
            content: data.content,
        }
    })

    return task;
}


module.exports = {
    getAllTasks,
    setTaskDone,
    deleteTask,
    addTask
}