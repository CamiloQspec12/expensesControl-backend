import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import allRoutes from './routes/allRoutes.js'

const app = express()
const PORT = process.env.PORT || 3000


const configCors = {
    origin: (origin, callback) => {
    if (!origin) return callback(null, true) // permite Postman, curl, health checks sin origin
    const allowed = origin === 'http://localhost:5173' ||
                     /^https:\/\/expenses-control-frontend.*\.vercel\.app$/.test(origin)
    callback(allowed ? null : new Error('No permitido por CORS'), allowed)
  }
}


app.use(cors(configCors))
app.use(express.json())
app.use('/api', allRoutes)
app.get('/', (req, res) => {
    res.json({message: "The app is running"})
})

app.listen(PORT, () => {
    console.log(`Servidor: http://localhost:${PORT}`)
})