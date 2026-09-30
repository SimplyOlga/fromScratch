import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditProductPage = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const [productName, setProductName] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [inventoryCount, setInventoryCount] = useState("");
    const [supplierName, setSupplierName] = useState("");
    const [contactEmail, setContactEmail] = useState("");
    const [contactPhone, setContactPhone] = useState("");
    const [isVerified, setIsVerified] = useState(false);

    useEffect(() => {
        const fetchProduct = async() => {
            try {
                const res = await fetch(`/api/products/${id}`);
                const data = await res.json();

                setProductName(data.productName);
                setCategory(data.category);
                setDescription(data.description);
                setPrice(data.price);
                setInventoryCount(data.inventoryCount);
                setSupplierName(data.supplier.name);
                setContactEmail(data.supplier.contactEmail);
                setContactPhone(data.supplier.contactPhone);
                setIsVerified(data.supplier.isVerified);
            } catch (err) { 
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id] );

    const updateProduct = async (product) => {
        const res = await fetch(`/api/products/${id}`, {
            method: 'PUT',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(product),
        });

        return res.ok
    }

    const submitForm = async (e) => {
        e.preventDefault();
        const updated = {
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
            },
        };
        const success = await updateProduct(updated);
        if (success) navigate(`/products/${id}`);
    };

    if(loading) return <p>Loading...</p>
    
    return (
        <div className="update">
            <h2>Update Product</h2>
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

                <button type="submit">Edit Product</button>
            </form>
        </div>
    )
}

export default EditProductPage;