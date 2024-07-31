require("dotenv").config()
require("./dbconnect/connect")
const express = require("express")
const app = express()
const cors = require("cors")
const path = require("path")

const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({ limit: "500mb", extended: true, parameterLimit: 500000 }))
app.use(bodyParser.json())
app.use(cors({ origin: "*" }))

let pathUrl
app.use((req, res, next) => {
    pathUrl = `Route Path ${req.method} = http://${req.hostname}:${process.env.PORT}${req.path} `
    console.log(pathUrl)
    next()
})

const PORT = process.env.PORT

app.use("/uploads", express.static(path.resolve(__dirname, "uploads")))

//set route
app.use("/api", require("./routers/fileRouter"))

app.use(express.static(path.resolve(__dirname, "../frontend/build")))

app.use("*", (req, res) => {
    console.log("admin-------------12", path.join(__dirname, "../frontend/build", "index.html"))
    res.sendFile(path.join(__dirname, "../frontend/build", "index.html"))
})

app.listen(PORT, () => {
    console.log("Server starting on ", PORT)
})
