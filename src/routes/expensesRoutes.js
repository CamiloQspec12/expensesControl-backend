import { json, Router } from "express";
import prisma from '../prisma.js'
const router = Router();


router.get('/categories', async (req, res) => {
    try{
        const categorys = await prisma.category.findMany()
        res.json(categorys)
    }catch (e){
        res.status(500).json({error: "Error fetching the categories"})
    }
})

router.post('/categories', async (req, res) => {
    try{
        const categories = await prisma.category.create({ data: {
            name: req.body.name,
            category: req.body.category
        }})
        res.status(200).json({message: "Category create successfully"})
    }catch (e){
        res.status(500).json({error: "Error fetching the categories"})
    }
})

export default router