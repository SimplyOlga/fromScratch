const express = require("express");

const {
    createProduct,
    getAllProduct,
    deleteProduct,
    getProductById
} = require("../controllers/productControllers");

const router = express.Router();

router.get("/", getAllProduct);

router.get("/:productId", getProductById);

router.post("/", createProduct);

router.delete("/:productId", deleteProduct);

module.exports = router;