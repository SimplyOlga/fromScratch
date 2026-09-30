const Product = require("../models/productModel");
const mongoose = require("mongoose");


const createProduct = async (req, res) => {
    try { 
        const newProduct = await Product.create({...req.body});
        res.status(201).json(newProduct);

    } catch (error) {
        res.status(400).json({ message: "Failed to create a product", error: error.message});
    }
};

module.exports = {
    createProduct
};