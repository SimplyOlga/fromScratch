import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ProductPage = () => {

    const {id} = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [ispending, setIsPending ] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`/api/products/${id}`);
                if(!res.ok) throw new Error("Product not found");
                const data = await res.json();
                setProduct(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsPending(false)
            }
        };

        fetchProduct();
    }, [id]);

    if (ispending) return <p>Loading...</p>
    if (error) return <p>{error}</p>

    return (
    <div className="product-details">

    <h2>Product: {product.productName}</h2>
      <p>Category: {product.category}</p>
      <p>Description: {product.description}</p>
      <p>Price: {product.price}</p>
      <p>Inventory Count: {product.inventoryCount}</p>
      <p>Supplier Name: {product.supplier.name}</p>
      <p>Contact Email: {product.supplier.contactEmail}</p>
      <p>Contact Phone: {product.supplier.contactPhone}</p>
      <p>Verified: {product.supplier.isVerified ? "Yes" : "No"}</p>

      <button onClick={()=> navigate("/") }>Back</button>
    </div>
  );
};

export default ProductPage;