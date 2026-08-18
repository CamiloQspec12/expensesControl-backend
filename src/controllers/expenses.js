import prisma from "../prisma.js";

const getExpenses = async (req, res) => {
    try {
        const expenses = await prisma.expense.findMany({
            include: {
                user: true,
                category: true
            }
        })
        res.status(200).json(expenses)
    } catch (e){
        console.log(e)
        res.status(500).json({message: "Error getting the Expenses"})
    }
}

const createExpenses = async (req, res) => {
    try {
        const expenses = await prisma.expense.create({data: {
            type: req.body.type,
            value: req.body.value,
            userExpense: req.body.userExpense,
            categoryId: req.body.categoryId
        }})
        res.status(201).json({message: "Created succesfully..."})
    } catch(e){
        console.log(e)
        res.status(500).json({message: "Erro creating the expense"})
    }
}

export { createExpenses,  getExpenses}