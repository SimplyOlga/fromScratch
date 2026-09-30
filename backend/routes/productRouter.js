const express = require("express");

const {
    createProduct,
} = require("../controllers/productControllers");

const router = express.Router();

router.post("/", createProduct);

module.exports = router;