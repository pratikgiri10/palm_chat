import 'dotenv/config'
import connectDb from "./config/dbConfig.js"
import { httpServer } from './socket.js'

connectDb().then(() => {
    console.log("mongodb connected")
    httpServer.listen(3000, () => {
        console.log('Server is listening at port 3000...')
    })
}).catch((err) => {
    console.log("error connecting database: ", err)
})
