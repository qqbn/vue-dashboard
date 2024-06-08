const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()


const getAllExpenses= async (page) => {
    const expenses = await prisma.expenses.findMany({
        take: 10 * page,
    });

    return expenses;
}


module.exports = {
    getAllExpenses,
}