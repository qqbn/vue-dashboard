const expensesModel = require('../models/expensesModel');
const helpers = require('../helpers/helpers');

exports.getExpensesAll = async (page) => {
    const results = await expensesModel.getAllExpenses(page);

    results.expenses.forEach(result => {
        result.date = helpers.formatDate(result.date);
    })

    results.moreExpenses = !!results.moreExpenses;

    return {expenses: results.expenses, moreExpenses: results.moreExpenses};
}

exports.addExpenseAction = async (data) => {
    const results = await expensesModel.addExpense(data);
    results.date = helpers.formatDate(results.date);
    return results;
}