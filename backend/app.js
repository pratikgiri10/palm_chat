import express from 'express'
import cors from 'cors'
import authRoutes from './routes/authRoutes.js'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/v1/users', authRoutes)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

export default app