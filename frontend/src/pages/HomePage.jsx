import ProductListings from "../components/ProductListings";
import { useState } from "react";
import { useEffect } from "react";

const Home = () => {

  const [products, setProducts] = useState();
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        if (!res.ok) throw new Error("Could not fetch");
        const data = await res.json();
        setProducts(data);  
        setIsPending(false);
        

        
      } catch (error) {
        setError(error.message);
        setIsPending(false);
      }
    };
    fetchProducts();
  }, [])
  return (
    <div className="home">
      {products && <ProductListings products={products} />}
    </div>
  );
};

export default Home;