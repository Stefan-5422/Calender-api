const { urlencoded, json } = require("express");
const app = require("express")()
const mongoose = require("mongoose")
const cors = require("cors")

require('dotenv').config()

const PORT = 8080;
const MONGOURI = process.env.MONGO_HOST

mongoose.connect(MONGOURI, { useNewUrlParser: true, useUnifiedTopology: true })

const backendrouter = require("./routes/backendrouter")

app.use(cors())

//Use middleware for POST requests
app.use(urlencoded({ extended: true }))
app.use(json())

//Auth middleware
app.use((req, res) => {
    if (!req.headers.authorization) {
        req.headers.authorization = []
    } else {
        req.headers.authorization = req.headers.authorization.split(' ')
    }
    req.next()
})

//Fire router
app.use("/api/", backendrouter)


console.log(`Running on Port: ${PORT}`)
app.listen(PORT);