const remindsModel = require('../models/remindsModel');

const formatDate = (date) => {
    return date.toISOString().slice(0, 10);
}

exports.getRemindsAll = async (data) => {
    const results = await remindsModel.getAllReminds();

    results.forEach(result => {
        result.date = formatDate(result.date);
    });

    return results;
}

exports.deleteRemindAction = async (id) => {
    const results = await remindsModel.deleteRemind(id);
    return results;
}

exports.addRemindAction = async (data) => {
    const results = await remindsModel.addRemind(data);
    results.date = formatDate(results.date);
    return results;
}

exports.editRemindAction = async (id, data) => {
    const results = await remindsModel.editRemind(id, data);
    results.date = formatDate(results.date);
    return results;
}
