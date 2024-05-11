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

exports.addTaskAction = async(data) => {
    const results = await taskModel.addTask(data);
    return results;
}

exports.editTaskAction = async(id, data) => {
    const result = await taskModel.editTask(id, data);
    return result;
}