import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import prisma from "../prisma.js";

const login = async (req, res) => {
    try{
        const user = await prisma.user.findUnique({where: {email: req.body.email }})
        if(!user) {
           return res.status(401).json({message: "Invalid credentials"})
        }

        const pass = await bcrypt.compare(req.body.password, user.password)
        if(!pass) {
           return res.status(401).json({message: "Invalid credentials"})
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' })
        res.status(200).json({token})
    }
    catch {
        res.status(500).json({message: "Error Login in..."})
    }
}

 export { login }