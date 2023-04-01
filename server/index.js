import express from "express";
import * as dotenv from "dotenv"
import cors from "cors"
import bodyParser from "body-parser"

import connect from "./db/connect.js";
import postRoutes from './routes/postRoutes.js'
import aiRoutes from './routes/aiRoutes.js'

dotenv.config();

const app = express()

const port = process.env.PORT

app.use(cors({
    " Access-Control-Allow-Origin": "*"
}))
app.use(express.json({ limit: '50mb' }))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/api/post', postRoutes)
app.use('/api/ai', aiRoutes)


app.get('/', async (req, res) => {
    res.send("Helloo")
})

try {
    connect(process.env.DB_URL)

    app.listen(port, () => {
        console.log("Server started on port", port)
    })
} catch (error) {
    console.log(error)
}




