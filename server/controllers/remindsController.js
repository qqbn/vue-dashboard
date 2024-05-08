const remindsSerivce = require('../services/remindsService');

const getReminds = async (req, res) => {
    const data = await remindsSerivce.getRemindsAll();

    return res.json(data);
}

const deleteRemind = async (req, res) => {
    const id = JSON.parse(req.params['id']);
    if(!id) res.status(400).json({ message: 'Remind not found' });

    const data = await remindsSerivce.deleteRemindAction(id, req.body);

    if(data){
        res.status(200).json({ message: 'Remind deleted' });
    }
}
module.exports = {
    getReminds,
    deleteRemind
}