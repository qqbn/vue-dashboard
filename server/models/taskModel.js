const db = require('../db_config');


const getAllTasks = async () => {
    return await db.query('SELECT * FROM tasks');
}


module.exports = {
    getAllTasks,
}