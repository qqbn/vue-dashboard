const remindsModel = require('../models/remindsModel');
const helpers = require('../helpers/helpers');

exports.getRemindsAll = async (data) => {
    const results = await remindsModel.getAllReminds();

    results.forEach(result => {
        result.date = helpers.formatDate(result.date);
    });

    return results;
}

exports.deleteRemindAction = async (id) => {
    const results = await remindsModel.deleteRemind(id);
    return results;
}

exports.addRemindAction = async (data) => {
    const results = await remindsModel.addRemind(data);
    results.date = helpers.formatDate(results.date);
    return results;
}

exports.editRemindAction = async (id, data) => {
    const results = await remindsModel.editRemind(id, data);
    results.date = helpers.formatDate(results.date);
    return results;
}
