
const getIncome = async (req, res) => {
    try {
        const income = prisma.income.findMany({
            include: {
                user: true
            }
        })
        res.json(income)
    }
    catch (e) {
        res.status(500).json({message: 'Not getting anything...'})
    }
}


const createIncome = async (req, res) => {
    try {
        const income = prisma.income.create({data: {
            qt: req.body.qt,
            frequency: req.body.frequency,
            userIncome: req.body.userIncome
        }})
    }
    catch(e) {
        res.status(500).json({message: 'Error creating income'})
    }
}

export {getIncome, createIncome}