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

    const deleteProduct = async (productId) => {
        const confirm = window.confirm("Do you want to delete?");
        if (!confirm) return;
        try {
            const res = await fetch(`/api/products/${productId}`, {
                method: "DELETE",
            }
        );
        navigate("/");
            if (!res.ok) throw new Error("failed to delete");

        }catch (error) {
            console.error("Error when deleting:", error);
            setError(error.message)
        }
    };


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
      <button onClick={() => deleteProduct(product._id)}>Delete</button>
      <button onClick={() => navigate(`/edit/${product._id}`)}>Edit</button>
    </div>
  );
};

export default ProductPage;