const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()


const getAllExpenses= async (page) => {
    const expenses = await prisma.expenses.findMany({
        take: 10 * page,
    });

    const hasMoreExpenses = await prisma.expenses.count({
        skip: 10 * page,
      });

    return {expenses: expenses, moreExpenses: hasMoreExpenses};
}

const addExpense = async (data) => {
    const expense = await prisma.expenses.create({
        data: {
            title: data.title,
            value: data.value,
            type: data.type,
            date: data.date,
        }
    })

    return expense;
}


module.exports = {
    getAllExpenses,
    addExpense
}