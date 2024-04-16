const taskModel = require('../models/taskModel');

exports.getTasksAll = async (data) => {
    const results = await taskModel.getAllTasks();
    return results;
}