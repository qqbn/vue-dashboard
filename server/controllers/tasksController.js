const tasksServices = require('../services/tasksService');

const getTasks = async (req, res) => {
    const data = await tasksServices.getTasksAll();

    return res.json(data);
}

module.exports = {
    getTasks,
}