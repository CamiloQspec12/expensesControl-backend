import bcrypt from "bcryptjs";
import prisma from "../prisma.js";

const getUser = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: Number(req.params.id) },
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
        res.status(200).json(user)
    } catch (e){
        res.status(500).json({message: "Error to get user"})
    }
}



const createUser = async (req, res) => {
    try {
        const hashpassword = await bcrypt.hash(req.body.password, 10)
        const user = await prisma.user.create({data: {
            name: req.body.name,
            email: req.body.email,
            dob: req.body.dob,
            gender: req.body.gender ,
            password: hashpassword
        }})
        console.log('RAW RESULT:', user)
        const { password, ...userWithoutPass} = user
        res.status(201).json(userWithoutPass)

    } catch (e){
        console.log(e)
        res.status(500).json({message: "Error to create user"})
    }
}

export {getUser, createUser}