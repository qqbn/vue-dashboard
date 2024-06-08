const expensesModel = require('../models/expensesModel');
const helpers = require('../helpers/helpers');

exports.getExpensesAll = async (page) => {
    const results = await expensesModel.getAllExpenses(page);

    results.forEach(result => {
        result.date = helpers.formatDate(result.date);
    })

    return results;
}