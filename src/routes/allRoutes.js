import { json, Router } from "express";
import prisma from '../prisma.js'
import { getCategories , createCategories } from '../controllers/categories.js'
import { getExpenses , createExpenses } from '../controllers/expenses.js'
import { getIncome , createIncome } from '../controllers/income.js'
import { getUser, createUser } from "../controllers/user.js"
import { auth } from "../middleware/auth.js";
import { login } from "../controllers/login.js";

const router = Router();


router.get('/categories', auth, getCategories)

router.post('/categories', auth, createCategories)

router.get('/expenses', auth, getExpenses)

router.post('/expenses', auth, createExpenses)

router.get('/incomes', auth, getIncome)

router.post('/incomes', auth, createIncome)

router.get('/users/:id', auth, getUser)

router.post('/users', createUser)

router.post('/login', login)



export default router