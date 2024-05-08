const taskModel = require('../models/remindsModel');

exports.getRemindsAll = async (data) => {
    const results = await taskModel.getAllReminds();

    results.forEach(result => {
        result.date = result.date.toISOString().slice(0,10);
    });

    return results;
}

exports.deleteRemindAction = async (id) => {
    const results = await taskModel.deleteRemind(id);
    return results;
} 
