import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProductPage = () => {
    
    //UseState
    const [productName, setProductName] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [inventoryCount, setInventoryCount] = useState("");
    const [supplierName, setSupplierName] = useState("");
    const [contactEmail, setContactEmail] = useState("");
    const [contactPhone, setContactPhone] = useState("");
    const [isVerified, setIsVerified] = useState("");

    const navigate = useNavigate();

    const addProduct = async (newProduct) => {

        const user = JSON.parse(localStorage.getItem("user"));
        const token = user ? user.token : null;
        
        const res = await fetch("/api/products", {
            method: 'POST',
            headers: {"Content-Type": "application/json",
                Authorization: `Bearer ${token}`
             },
            body: JSON.stringify(newProduct),
        });

        return res.ok
    };

    const submitForm = async (e) => {
        e.preventDefault();

        const newProduct = {
            productName,
            category,
            description,
            price: Number(price),
            inventoryCount: Number(inventoryCount),
            supplier: {
                name: supplierName,
                contactEmail,
                contactPhone,
                isVerified
            }
        };
        const success = await addProduct(newProduct);
        if (success) navigate("/")
    };

    return (
        <div className="create">
            <h2>Add a new product</h2>

            <form onSubmit={submitForm}>
                
                <label>Product Name:</label>
                <input type="text" required value={productName} onChange={(e) => setProductName(e.target.value)}/>

                <label>Category:</label>
                <input type="text" required value={category} onChange={(e) => setCategory(e.target.value)}/>

                <label>Description:</label>
                <input type="text" required value={description} onChange={(e) => setDescription(e.target.value)}/>

                <label>Price:</label>
                <input type="number" required value={price} onChange={(e) => setPrice(e.target.value)}/>

                <label>Inventory Count:</label>
                <input type="number" required value={inventoryCount} onChange={(e) => setInventoryCount(e.target.value)}/>

                <label>Supplier Name:</label>
                <input type="text" required value={supplierName} onChange={(e) => setSupplierName(e.target.value)}/>

                <label>Supplier Email:</label>
                <input type="email" required value={contactEmail} onChange={(e) => setContactEmail(e.target.value)}/>

                <label>Supplier Phone:</label>
                <input type="tel" required value={contactPhone} onChange={(e) => setContactPhone(e.target.value)}/>

                <label>Verified Supplier:</label>
                <select value={isVerified} onChange={(e) => setIsVerified(e.target.value === "true")}>
                    <option value="false">No</option>
                    <option value="true">Yes</option>
                </select>

                <button type="submit">Add Product</button>
            </form>
        </div>
    );   
};

export default AddProductPage;