const expensesService = require('../services/expensesService');

const getExpenses = async (req, res) => {
    const page = JSON.parse(req.query.page);
    if(!page) res.status(400).json({ message: 'Expenses not found' });
    const results = await expensesService.getExpensesAll(page);

    const obj = {
        expenses: results.expenses,
        moreExpenses: results.moreExpenses,
        page: page,
    }

    res.json(obj);
}

module.exports = {
    getExpenses,
}