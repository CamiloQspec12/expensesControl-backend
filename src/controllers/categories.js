import prisma from "../prisma.js";


const createCategories = async (req, res) => {

    const { name, category } = req.body
    const validCategoryTypes  = ['FIXED', 'DEBT', 'HORMIGA', 'OTHER']


    if(!name || typeof name !== 'string' || name.trim().length <= 3){
        return res.status(400).json({message: "Name debe tener mas de 3 caracteres"})
    }

    if(!category ||  typeof category !== 'string' || !validCategoryTypes.includes(category) ) {
        return res.status(400).json({message: "La categoria debe ser, FIXED, DEBT, HORMIGA, OTHER"})
    }

    try{
        const categories = await prisma.category.create({ data: {
            name: name,
            category: category
        }})
        res.status(201).json({message: "Category create successfully"})
    }catch (e){
        console.error(e)
        res.status(500).json({message: "Error creating the category"})
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
