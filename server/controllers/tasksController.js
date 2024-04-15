const tasksServices = require('../services/tasksService');

const getTasks = async (req, res) => {
    const data = await tasksServices.getTasksService();

    return res.json(data);
}

module.exports = {
    getTasks,
}