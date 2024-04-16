const expensesService = require('../services/expensesService');

const getExpenses = async (req, res) => {
    const data = expensesService.getExpensesAll();

    res.json(data);
}

module.exports = {
    getExpenses,
}