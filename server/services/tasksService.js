const taskModel = require('../models/taskModel');

exports.getTasksAll = async (data) => {
    const results = await taskModel.getAllTasks();
    return results;
}

exports.setTaskAction = async(id, data) => {
    const results = await taskModel.setTaskDone(id, data.isDone);
    
    return results;
}

exports.deleteTaskAction = async(id) => {
    const results = await taskModel.deleteTask(id);
    return results;
}