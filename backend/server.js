import 'dotenv/config'
import app from "./app.js"
import connectDb from "./config/dbConfig.js"


connectDb().then(() => {
    console.log("mongodb connected")
    app.listen(3000, () => {
        console.log('Server is listening at port 3000...')
    })
}).catch((err) => {
    console.log("error connecting database: ", err)
})
