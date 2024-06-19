const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()


const getAllExpenses= async (page) => {
    let hasMoreExpenses;
    const expenses = await prisma.expenses.findMany({
        orderBy: {date: 'desc'},
        take: 10,
        skip: 10 * (page - 1),
    });

    hasMoreExpenses = await prisma.expenses.count({
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

const deleteExpense = async (id) => {
    const expense = await prisma.expenses.delete({
        where: {
            id: id,
        }
    })

    return expense;
}

module.exports = {
    getAllExpenses,
    addExpense,
    deleteExpense,
}