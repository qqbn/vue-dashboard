const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()


const getAllExpenses= async () => {
    const expenses = await prisma.expenses.findMany();

    return expenses;
}


module.exports = {
    getAllExpenses,
}