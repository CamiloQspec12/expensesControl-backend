import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'

const isProduction = process.env.NODE_ENV === 'production'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL, ssl: isProduction ? {rejectUnauthorized: false} : false })
const prisma = new PrismaClient({ adapter })

export default prisma