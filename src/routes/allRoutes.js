import { json, Router } from "express";
import prisma from '../prisma.js'
import { getCategories , createCategories } from '../controllers/categories.js'
import { getExpenses , createExpenses } from '../controllers/expenses.js'
import { getIncome , createIncome } from '../controllers/income.js'
import { getUser, createUser } from "../controllers/user.js"
import { login } from "../controllers/login.js";

const router = Router();


router.get('/categories', getCategories)

router.post('/categories', createCategories)

router.get('/expenses', getExpenses)

router.post('/expenses', createExpenses)

router.get('/incomes', getIncome)

router.post('/incomes', createIncome)

router.get('/users/:id', getUser)

router.post('/users', createUser)

router.post('/login', login)



export default router