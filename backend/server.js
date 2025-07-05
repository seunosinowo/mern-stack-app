import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js';
import Product from './models/product.model.js'
import mongoose from 'mongoose';
dotenv.config()

const app = express();

//middle ware to accept json data
app.use(express.json()); //allow us to accept json data in req.body

//Test Get Endpoints
app.get("/api/products", async (req, res) => {
    try{
        const products = await Product.find({});
        res.status(200).json({success: true, data: products})
    }catch(error){
        res.status(500).json({success: false, message: "Server Error"})
        console.log("error in fetching products:", error.message)
    }
})

//Set a post endpoint
app.post("/api/products", async (req, res) => {
    const product = req.body; //user will send this data

    if(!product.name || !product.price || !product.image){
        return res.status(400).json({success:false, message: "Please provide all fields"});
    }

    const newProduct = new Product(product)
    try{
        await newProduct.save()
        res.status(201).json({success:true, data:newProduct})
    }catch(error){
        console.log("Error in creating product", error.message)
        res.status(500).json({success: false, message: "Server Error"})
    }
})

//Setting up Delete Endpoints
app.delete("/api/products/:id", async (req, res) => {
    const {id} = req.params;
    try{
        await Product.findByIdAndDelete(id);
        res.status(200).json({success:true, message: "Product deleted"}) 
    }catch(error){
        res.status(404).json({success:false, message: "Product not found"})
        console.log("error in deleting product: ", error.message)
    }
})

//Update Endpoint
app.put('/api/products/:id', async (req, res) => {
    const {id} = req.params
    const product = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({success:false, message: "Invalid Product id"})
    }

    try{
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new: true});
        res.status(200).json({success: true, data: updatedProduct})
    }catch(error){
        res.status(500).json({success: false, message: "Server error"})
    }
})


app.listen(5000, () => {
    connectDB();
    console.log("Server started at http://localhost:5000")
})





//Entry point for API