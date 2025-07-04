import express from 'express'
import dotenv from 'dotenv'
dotenv.config()

const app = express();

app.get('products', (req, res) => {})

console.log(process.env.MONGO_URL)

app.get("/", (req, res) => {
    res.send("Server is ready11")
})

app.listen(5000, () => {
    console.log("Server started at http://localhost:5000")
})





//Entry point for API