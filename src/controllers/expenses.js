
const getExpenses = async (req, res) => {
    try {
    const expenses = await prisma.expenses.findMany({
        user: true,
        category: true
    })
    res(expenses).json()
    }catch (e){
        res.status(500).json({message: "U get all the expenses...."})
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
        res.status(200).json({message: "Created succesfully..."})


    } catch(e){
        res.status(200).json({message: "Expense created"})
    }
}

export { createExpenses,  getExpenses}