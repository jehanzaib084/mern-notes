import express from "express"
import dotenv from "dotenv"
import path from "path"

import notesRoutes from "./routes/notesRoutes.js"
import { connectDB } from "./config/db.js"


dotenv.config()

const app = express()
const __dirname = path.resolve()


app.use(express.json())

app.use("/api/notes", notesRoutes)

connectDB().then(() => {
    app.listen(5000, () => {
        console.log("server started on port 5000")
    })    
})
