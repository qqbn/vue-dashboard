const tasksServices = require('../services/tasksService');

const getTasks = async (req, res) => {
    const data = await tasksServices.getTasksAll();

    return res.json(data);
}

const setTask = async (req, res) => {
    const data = await tasksServices.setTaskAction(req.body);
    
    if(data){
        res.sendStatus(200);
    }
}

module.exports = {
    getTasks,
    setTask
}