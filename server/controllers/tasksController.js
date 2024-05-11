const tasksServices = require('../services/tasksService');
const validation = require('../validations/validations');

const getTasks = async (req, res) => {
    const data = await tasksServices.getTasksAll();

    return res.json(data);
}

const setTask = async (req, res) => {
    const id = JSON.parse(req.params['id']);
    if(!id) res.status(400).json({ message: 'Task not found' });

    const data = await tasksServices.setTaskAction(id, req.body);
    
    if(data){
        res.status(200).json({ message: 'Task set as done' });
    }
}

const deleteTask = async (req, res) => {
    const id = JSON.parse(req.params['id']);
    if(!id) res.status(400).json({ message: 'Task not found' });

    const data = await tasksServices.deleteTaskAction(id, req.body);

    if(data){
        res.status(200).json({ message: 'Task deleted' });
    }
}

const addTask = async (req,res) => {
    const { error } = await validation.validateTask(req.body);
    if(error){
        return res.status(400).json({message: error.message});
    }

    const data = await tasksServices.addTaskAction(req.body);
    if(data){
        res.status(200).json({ message: 'Task added' });
    }
}

const editTask = async (req, res) => {
    const id = JSON.parse(req.params['id']);
    if(!id) res.status(400).json({ message: 'Task not found' });

    const { error } = await validation.validateEditingTask(req.body);
    if(error){
        return res.status(400).json({message: error.message});
    }

    const data = await tasksServices.editTaskAction(id, req.body);
    if(data){
        res.status(200).json({ message: 'Task edited' });
    }
}

module.exports = {
    getTasks,
    setTask,
    deleteTask,
    addTask,
    editTask
}