const express = require('express');
const router = express.Router();
const expensesController = require('../controllers/expensesController');

router.get('/:page', expensesController.getExpenses);


module.exports = router;