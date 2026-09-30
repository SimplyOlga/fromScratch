import { Link } from "react-router-dom";

const ProductListing = ({ product }) => {
  return (
    <div className="product-preview">
        <Link to={`products/${product._id}`}>
      <h2>Product : {product.productName}</h2>
        </Link>
      <p>Category: {product.category}</p>
      <p>Description: {product.description}</p>
      <p>Price: {product.price}</p>
      <p>Inventory Count: {product.inventoryCount}</p>
      <p>Supplier Name: {product.supplier.name}</p>
      <p>Contact Email: {product.supplier.contactEmail}</p>
      <p>Contact Phone: {product.supplier.contactPhone}</p>
      <p>Verified: {product.supplier.isVerified}</p>
    </div>
  );
};

export default ProductListing;