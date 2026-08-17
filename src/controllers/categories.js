import prisma from "../prisma.js";


const createCategories = async (req, res) => {
    try{
        const categories = await prisma.category.create({ data: {
            name: req.body.name,
            category: req.body.category
        }})
        res.status(201).json({message: "Category create successfully"})
    }catch (e){
        console.log(e)
        res.status(500).json({error: "Error fetching the categories"})
    }
}

const getCategories = async (req, res) => {
    try{
        const categorys = await prisma.category.findMany()
        res.json(categorys)
    }catch (e){
        res.status(500).json({error: "Error fetching the categories"})
    }
}

export { createCategories, getCategories }
