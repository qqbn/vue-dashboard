const taskModel = require('../models/taskModel');

exports.getTasksAll = async (data) => {
    const results = await taskModel.getAllTasks();
    return results;
}

exports.setTaskAction = async(data) => {
    const results = await taskModel.setTaskDone(data.id, data.isDone);
    
    return results;
}