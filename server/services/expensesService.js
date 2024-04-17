const expensesModel = require('../models/expensesModel');

exports.getExpensesAll = async (data) => {
    const results = await expensesModel.getAllExpenses();

    return results;
}