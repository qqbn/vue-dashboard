const remindsModel = require('../models/remindsModel');

exports.getRemindsAll = async (data) => {
    const results = await remindsModel.getAllReminds();

    results.forEach(result => {
        result.date = result.date.toISOString().slice(0,10);
    });

    return results;
}

exports.deleteRemindAction = async (id) => {
    const results = await remindsModel.deleteRemind(id);
    return results;
}

exports.addRemindAction = async (data) => {
    const results = await remindsModel.addRemind(data);
    return results;
}
