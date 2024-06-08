const expensesService = require('../services/expensesService');

const getExpenses = async (req, res) => {
    const page = JSON.parse(req.params['page']);
    if(!page) res.status(400).json({ message: 'Expenses not found' });
    const data = await expensesService.getExpensesAll(page);

    res.json(data);
}

module.exports = {
    getExpenses,
}