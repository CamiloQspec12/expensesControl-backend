import prisma from "../prisma.js";


const getIncome = async (req, res) => {
    try {
        const income = await prisma.income.findMany({
            include: {
                user: true
            }
        })
        res.status(200).json(income)
    }
    catch (e) {
        res.status(500).json({message: 'Not getting anything...'})
    }
}


const createIncome = async (req, res) => {
    try {
        const income = await prisma.income.create({data: {
            qt: req.body.qt,
            frequency: req.body.frequency,
            userIncome: req.body.userIncome
        }})
        res.status(201).json({ message: "Income create succesfully"})
    }
    catch(e) {
        console.log(e)
        res.status(500).json({message: 'Error creating income...'})
    }
}

export {getIncome, createIncome}