import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"

import todoRoute from "../backend/routes/todo.route.js"
import userRoute from "../backend/routes/user.route.js"

const app = express()
dotenv.config()

const PORT = process.env.PORT || 4001
const DB_URI = process.env.MONGODB_URI

// middelwares
app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin:process.env.FRONTEND_URL,
  credentials: true,
  methods:"GET, POST, PUT, DELETE",
  allowedHeaders: ["Content-Type", "Authorization"] //Add other headers you want to allow here.
}))

// Database connection code
try {
    await mongoose.connect(DB_URI)
    console.log("Connected to DB")
} catch (error) {
    console.log(error)
}

//routes
app.use("/todo", todoRoute)
app.use("/user", userRoute)


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
