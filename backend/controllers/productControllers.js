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

const getAllProduct = async (req, res) => {
    try {
        const products = await Product.find({}).sort({ createdAt: -1})
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Failed to get all products"});
    }
};


module.exports = {
    createProduct,
    getAllProduct
};