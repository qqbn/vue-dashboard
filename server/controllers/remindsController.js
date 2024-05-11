const remindsSerivce = require('../services/remindsService');
const validation = require('../validations/validations');

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

const addRemind = async(req, res) => {
    const { error } = await validation.validateRemind(req.body);
    if(error){
        return res.status(400).json({message: error.message});
    }

    const data = await remindsSerivce.addRemindAction(req.body);
    if(data){
        res.send(data);
    }
}

const editRemind = async(req, res) => {
    const id = JSON.parse(req.params['id']);
    if(!id) res.status(400).json({ message: 'Remind not found' });

    const { error } = await validation.validateRemind(req.body);
    if(error){
        return res.status(400).json({message: error.message});
    }

    const data = await remindsSerivce.editRemindAction(id, req.body);
    if(data){
        res.status(200).json({ message: 'Remind edited' });
    }
}
module.exports = {
    getReminds,
    deleteRemind,
    addRemind,
    editRemind,
}