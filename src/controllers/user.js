import bcrypt from "bcryptjs";

const getUser = async (req, res) => {
    try {
        const user = prisma.user.findMany({
            select: {
                name: true,
                email: true,
                dob: true,
                gender: true,
                id: true,
                income: true,
                expense: true
            }
        })
    } catch (e){
        res.status(500).json({message: "Error to get user"})
    }
}



const createUser = async (req, res) => {
    try {
        const hashpassword = await bcrypt.hash(req.body.password, 10)
        const user = prisma.user.create({data: {
            name: req.body.name,
            email: req.body.email,
            dob: req.body.dob,
            gender: req.body.gender ,
            password: hashpassword
        }})
        const { password, ...userWithoutPass} = user
        res.status(201).json(userWithoutPass)

    } catch (e){
        res.status(500).json({message: "Error to create user"})
    }
}

export {getUser, createUser}