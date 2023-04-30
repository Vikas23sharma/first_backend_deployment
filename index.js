const express = require('express')
const jwt = require('jsonwebtoken');
const { connection } = require("./db")
const { userRouter } = require('./routes/User.routes')
const {notesRouter}=require("./routes/Note.routes")
const cors=require("cors")
const { auth } = require("./middleware/auth.middleware")
require("dotenv").config()

const app = express()
app.use(cors())

app.use(express.json())
app.use("/users", userRouter)

//PROTECTED ROUTES
app.use(auth)
app.use("/notes",notesRouter)
// app.get("/products", (req, res) => {
//     res.status(200).send("Products Page")
// })

app.listen(process.env.port, async () => {
    try {
        await connection
        console.log("connected to the DB successfully")
    } catch (error) {
        console.log(error)
        console.log("something went wrong while connecting to the DB")
    }
    console.log(`server is running at port ${process.env.port}`)
})