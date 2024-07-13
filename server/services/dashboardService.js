const dashboardModel = require('../models/dashboardModel');
const helpers = require('../helpers/helpers');

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
    expenses.forEach(expense => {
        expense.date = helpers.formatDate(expense.date);
    })
    return expenses;
}

const getContactsWidgetDataAction = async () => {
    const contacts = await dashboardModel.getContactsWidgetData();
    return contacts;
}

const getNotesWidgetDataAction = async () => {
    const notes = await dashboardModel.getNotesWidgetData();
    notes.forEach(note => {
        note.date = helpers.formatDate(note.date);
    })
    return notes
}

const getRemindsWidgetDataAction = async () => {
    const reminds = await dashboardModel.getRemindsWidgetData();
    reminds.forEach(remind => {
        remind.date = helpers.formatDate(remind.date);
    })
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