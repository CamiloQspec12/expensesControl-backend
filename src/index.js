import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import allRoutes from './routes/allRoutes.js'

const app = express()
const middleware = cors()
const PORT = process.env.PORT || 3000


app.use(middleware)
app.use(express.json())

app.use('/api', allRoutes)

app.get('/', (req, res) => {
    res.json({message: "The app is running"})
})

app.listen(PORT, () => {
    console.log(`Servidor: http://localhost:${PORT}`)
})