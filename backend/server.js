import 'dotenv/config'
import app from "./app.js"
import connectDb from "./config/dbConfig.js"
import { createServer } from 'http'
import { Server } from 'socket.io'

const httpServer = createServer(app)

const io = new Server(httpServer, {
    cors: {
        origin: 'http://localhost:5173'
    }
})

io.on('connection', async (socket) => {
    console.log('socket connection established: ', socket.id)
})

connectDb().then(() => {
    console.log("mongodb connected")
    httpServer.listen(3000, () => {
        console.log('Server is listening at port 3000...')
    })
}).catch((err) => {
    console.log("error connecting database: ", err)
})
