const express = require("express");

const {
    createProduct,
    getAllProduct,
    deleteProduct
} = require("../controllers/productControllers");

const router = express.Router();

router.get("/", getAllProduct);


router.post("/", createProduct);

router.delete("/:productId", deleteProduct);

module.exports = router;