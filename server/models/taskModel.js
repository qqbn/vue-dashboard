const { PrismaClient } = require('@prisma/client');
const { error } = require('console');

const prisma = new PrismaClient()


const getAllTasks = async () => {
    const tasks = await prisma.tasks.findMany();
    return tasks;
}

const setTaskDone = async (id, done) => {
    const doneTask = await prisma.tasks.update({
        where: {
            id: id,
        },
        data: {
            done: done,
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

const editTask = async (id, data) => {
    const task = await prisma.tasks.update({
        where:{
            id: id,
        },
        data: {
            content: data.content,
            done: data.done
        }
    })

    return task;
}

const taskToDashboard = async (id, data) => {
    const task = await prisma.tasks.update({
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
    getAllTasks,
    setTaskDone,
    deleteTask,
    addTask,
    editTask,
    taskToDashboard
}