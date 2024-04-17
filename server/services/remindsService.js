const taskModel = require('../models/remindsModel');

exports.getRemindsAll = async (data) => {
    const results = await taskModel.getAllReminds();
    return results;
}
