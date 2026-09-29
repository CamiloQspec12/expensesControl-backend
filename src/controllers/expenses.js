import prisma from "../prisma.js";

const getExpenses = async (req, res) => {
    try {
        const expenses = await prisma.expense.findMany({
            where: { userExpense: req.userId },
            include: {
                user: true,
                category: true
            },
            orderBy: { id: 'desc' }
        })
        res.status(200).json(expenses)
    } catch (e){
        console.log(e)
        res.status(500).json({message: "Error getting the Expenses"})
    }
}

const createExpenses = async (req, res) => {

    const { type, value, categoryId, userId } = req.body

    if(!type || typeof type !== "string" || type.trim().length <= 3 ){
        return res.status(400).json({message: "tipo debe contener mas de tres caracteres"})
    }

    if(!value || typeof value !== "number"  || value <=  0 ){
        return res.status(400).json({message: "El valor debe ser mayor a 0"})
    }

    if(!categoryId || !Number.isInteger(categoryId) || categoryId <= 0 ) {
        return res.status(400).json({message: "La categoria del id tiene que ser mayor a 0"})
    }
    try {
        const expenses = await prisma.expense.create({data: {
            type: type,
            value: value,
            userExpense: req.userId,
            categoryId: categoryId
        }})
        res.status(201).json({message: "Created succesfully..."})
    } catch(e){
        console.error(e)
        res.status(500).json({message: "Error creating the expense"})
    }
}

export { createExpenses,  getExpenses}