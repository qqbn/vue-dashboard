const dashboardModel = require('../models/dashboardModel');

const getDashboardDataAction = async (data) => {
    const idArr = data.split(',');
    const results = [];
    for (const id of idArr){
        const data = await getWidgetData(id);
        
        if(data){
            results.push({
                widgetId: Number(id),
                widgetData: data,
            })
        }
    }

    return results;
}

const getWidgetData = async (id) => {
    switch(id){
        case '1':
            return await getExpenseWidgetDataAction();
        case '2':
            return await getContactsWidgetDataAction();
        case '3':
            return await getNotesWidgetDataAction();
        case '4':
            return await getRemindsWidgetDataAction();
        case '5':
            return await getTasksWidgetDataAction();
        default:
            return null;
    }
}

const getExpenseWidgetDataAction = async () => {
    const expenses = await dashboardModel.getExpenseWidgetData();
    return expenses;
}

const getContactsWidgetDataAction = async () => {
    const contacts = await dashboardModel.getContactsWidgetData();
    return contacts;
}

const getNotesWidgetDataAction = async () => {
    const notes = await dashboardModel.getNotesWidgetData();
    return notes
}

const getRemindsWidgetDataAction = async () => {
    const reminds = await dashboardModel.getRemindsWidgetData();
    return reminds;
}

const getTasksWidgetDataAction = async () => {
    const tasks = await dashboardModel.getTasksWidgetData();
    return tasks;
}

module.exports = {
    getDashboardDataAction,
    getExpenseWidgetDataAction,
    getContactsWidgetDataAction,
    getNotesWidgetDataAction,
    getRemindsWidgetDataAction,
    getTasksWidgetDataAction
}