const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const shortid = require("shortid");

const app = express();

connectDB();

//app.use(bodyParser.json());
//express inbuilt bodyparser
app.use(express.json({exteded:false}))

//product model
const Product = mongoose.model("products", new mongoose.Schema({
    _id : {
        type: String, default: shortid.generate
    },
    title: String,
    description: String,
    image: String,
    price: Number,
    availableSizes: [String]
}))

//get all products from the db
app.get("/api/products", async (req, res) => {
    const products = await Product.find({});
    res.send(products);
})

//post or create product into the db
app.post("/api/products", async (req, res) => {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.send(savedProduct);
})

//delete product
app.delete("/api/products/:id", async (req, res) => {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    res.send(deletedProduct);
})

const port = process.env.PORT || 5000;

app.listen(port, () => console.log("server listening on port 5000"));