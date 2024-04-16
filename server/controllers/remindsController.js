const remindsSerivce = require('../services/remindsService');

const getReminds = async (req, res) => {
    const data = await remindsSerivce.getRemindsAll();

    return res.json(data);
}

module.exports = {
    getReminds,
}