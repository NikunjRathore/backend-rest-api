const express = require("express")
const { connectDB } = require("./view/userConnect")
const userRoutes = require("./routes/userRoutes")
const app = express()

connectDB()

// Middleware to parse JSON request bodies
app.use(express.json())

app.use("/users", userRoutes)

app.listen(8000,()=> console.log("Server connected"))
