import jwt from "jsonwebtoken"

const auth =  async (req, res, next) => {
    const authHeader = req.headers.authorization
    if(!authHeader) return res.status(401).json({message: "Error in auth"})
    const tk =  authHeader.split(" ")[1]
    try {
        const verify = await jwt.verify(tk, process.env.JWT_SECRET)
        req.userId = verify.userId
        next()
    } catch(e){
        res.status(401).json({message: "Invalid"})
    }
}

export { auth }