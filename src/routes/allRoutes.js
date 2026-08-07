import { json, Router } from "express";
import prisma from '../prisma.js'
import { getCategories , createCategories } from '../controllers/categories.js'
import { getExpenses , createExpense } from '../controllers/expenses.js'

const router = Router();


router.get('/categories', getCategories)

router.post('/categories', createCategories)

router.get('/expenses', getExpenses)

router.post('/expenses', createExpense)


export default router