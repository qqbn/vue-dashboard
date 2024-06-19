const express = require('express');
const router = express.Router();
const expensesController = require('../controllers/expensesController');

router.get('/list', expensesController.getExpenses);
router.post('/addExpense', expensesController.addExpense);
router.delete('/delete/:id', expensesController.deleteExpense);


module.exports = router;