import prisma from "../prisma"

const getExpenses = async (req, res) => {
    try {
    const expenses = await prisma.expenses.findMany()
    res.status(200).json({message: "Created succesfully..."})
    }catch (e){
        res.status(500).json({message: "U get all the expenses...."})
    }
}

const createExpense = async (req, res) => {
    try {

        const expenses = await prisma.expense.create({data: {
            type: req.body.type,
            value: req.body.value
        }})

        res(expenses).json()

    } catch(e){
        res.status(200).json({message: "Expense created"})
    }
}