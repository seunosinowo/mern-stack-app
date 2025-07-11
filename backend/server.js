//Entry point for API

import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.route.js'
import path from 'path'


dotenv.config()

const app = express();
const PORT = process.env.PORT || 5000
const __dirname = path.resolve()
 
//middle ware to accept json data
app.use(express.json()); //allow us to accept json data in req.body

app.use('/api/products', productRoutes)


app.listen(PORT, () => {
    connectDB();
    console.log("Server started at http://localhost:" + PORT)
})

//To configure with Frontend
if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.resolve(__dirname, 'frontend', 'dist')))

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
    })
}