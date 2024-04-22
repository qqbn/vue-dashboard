const tasksServices = require('../services/tasksService');

const getTasks = async (req, res) => {
    const data = await tasksServices.getTasksAll();

    return res.json(data);
}

const setTask = async (req, res) => {
    const id = JSON.parse(req.params['id']);
    if(!id) res.sendStatus(404);

    const data = await tasksServices.setTaskAction(id, req.body);
    
    if(data){
        res.status(200).json({ message: 'Task set as done' });
    }
}

const deleteTask = async (req, res) => {
    const id = JSON.parse(req.params['id']);
    if(!id) res.sendStatus(404);

    const data = await tasksServices.deleteTaskAction(id, req.body);

    if(data){
        res.status(200).json({ message: 'Task deleted' });
    }
}

module.exports = {
    getTasks,
    setTask,
    deleteTask
}