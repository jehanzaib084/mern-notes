import express from "express"
import cors from "cors"
import dotenv from "dotenv"

import notesRoutes from "./routes/notesRoutes.js"
import { connectDB } from "./config/db.js"


dotenv.config()

const app = express()


app.use(cors({ origin: "http://localhost:5173" }))
app.use(express.json())

app.use("/api/notes", notesRoutes)

connectDB().then(() => {
    app.listen(5000, () => {
        console.log("server started on port 5000")
    })    
})
