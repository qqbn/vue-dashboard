const expensesService = require('../services/expensesService');
const validation = require('../validations/validations');

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

const addExpense = async (req, res) => {
    const { error } = await validation.validateExpense(req.body);
    if(error){
        return res.status(400).json({message: error.message});
    }

    const data = await expensesService.addExpenseAction(req.body);
    if(data){
        res.send(data);
    }
}

module.exports = {
    getExpenses,
    addExpense
}