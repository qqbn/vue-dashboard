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


module.exports = {
    getAllExpenses,
}