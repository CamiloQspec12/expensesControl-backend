import prisma from "../prisma.js";


const getIncome = async (req, res) => {
    try {
        const income = await prisma.income.findMany({
            where: { userIncome: req.userId },
            include: {
                user: true
            },
            orderBy: { id: 'desc' }
        })
        res.status(200).json(income)
    }
    catch (e) {
        res.status(500).json({message: 'Not getting anything...'})
    }
}


const createIncome = async (req, res) => {

    const { qt, source, frequency } = req.body

    const validFrequency = ['WEEKLY', 'MONTHLY']

    if(!qt || typeof qt !== "number" || qt <= 0  ) {
        return res.status(400).json({message: "La cantidad tiene que ser mayor a 0"})
    }

    if(!source || typeof source !== "string" || source.trim().length <= 3 ){
        return res.status(400).json({message: "El nombre del ingreso tiene que ser mayor a 3 "})
    }

    if(!frequency || !validFrequency.includes(frequency)){
        return res.status(400).json({message: "La frecuencia del ingreso solo puede ser WEEKLY o MONTHLY"})
    }


    try {
        const income = await prisma.income.create({data: {
            qt: qt,
            source: source,
            frequency: frequency,
            userIncome: req.userId
        }})
        res.status(201).json({ message: "Income create succesfully"})
    }
    catch(e) {
        console.log(e)
        res.status(500).json({message: 'Error creating income...'})
    }
}

export {getIncome, createIncome}