import app from "./app.js"
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

    socket.on('joinChatRoom', (roomId) => {
        socket.join(roomId)
        console.log(`User joined room - ${roomId}`);

    })
    socket.on('disconnect', () => {
        console.log('User disconnected: ', socket.id);

    })
})

export { io, httpServer }