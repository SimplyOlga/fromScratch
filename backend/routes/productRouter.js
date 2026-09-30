const express = require("express");

const {
    createProduct,
    getAllProduct,
    deleteProduct,
    getProductById,
    updateProduct
} = require("../controllers/productControllers");

const router = express.Router();

router.get("/", getAllProduct);

router.get("/:productId", getProductById);

router.post("/", createProduct);

router.delete("/:productId", deleteProduct);

router.put("/:productId", updateProduct)

module.exports = router;