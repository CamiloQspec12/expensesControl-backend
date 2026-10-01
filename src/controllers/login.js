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
    catch(e) {
        console.log(e)
        res.status(500).json({message: "Error Login in..."})
    }
}


const signUp = async(req, res) => {

    const { name, email, gender, dob, password  } = req.body

    if(!name || typeof name !== 'string' || name.trim().length <= 3){
        return res.status(400).json({message: "El nombre debe tener mas de 3 caracteres"})
    }

    if(!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
        return res.status(400).json({message: 'El email no tiene un formato valido'})
    }

    if(!password || password.trim().length < 6 ){
      return res.status(400).json({message:"La contraseña debe tener al menos 6 caracteres"})  
    }

    if(!gender || typeof gender !== 'string'){
        return res.status(400).json({message:"El campo genero es obligatorio"})
    }

    if(!dob){
        return res.status(400).json({message:"la fecha de nacimineto es obligatoria"})
    }
    

    try{

        const emailUsed = await prisma.user.findUnique({ where: { email } })
        if(emailUsed){
            return res.status(400).json({message: "El correo ya esta en uso..."})
        }

        const hashedPassword = await bcrypt.hash(password, 10)


        await prisma.user.create({ data: {
            name,
            email,
            password: hashedPassword,
            gender,
            dob: new Date(dob)
         }})
         res.status(201).json({message: "User created succesfully"})
    }
    catch(e){
        console.log(e)
        res.status.json({message: "Error creating the user"})
    }



}




 export { login, signUp }