const dashboardModel = require('../models/dashboardModel');

exports.getDashboardDataAction = async (data) => {
    const arr = data.split(',');
    const results = await dashboardModel.getData(data);

    if(arr.includes('1')){
        const expenses = await dashboardModel.getExpenseWidgetData();
        console.log('expenses:', expenses);
    }

    //create getting contact
    // if(arr.includes('2')){
    //     contacts
    // }

    //id 3
    const notes = await dashboardModel.getNotesWidgetData();
    console.log('notes:',notes)

    //id 4
    const reminds = await dashboardModel.getRemindsWidgetData();
    console.log('reminds:', reminds);

    const tasks = await dashboardModel.getTasksWidgetData();
    console.log('tasks', tasks);
    return results;
}