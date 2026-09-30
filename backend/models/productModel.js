const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productName: {type: String, required: true},
    category: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    inventoryCount: {type: Number, required: true},
    supplier: {
        name: { type: String, required: true},
        contactEmail: {type: String, required: true},
        contactPhone: { type: String, required: true}, 
        isVerified: {type: Boolean, default: false, required: true}
    },
    user_id: {type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    }
}, {timestamps: true}
)

const Product = mongoose.model("Product", productSchema);
module.exports = Product;