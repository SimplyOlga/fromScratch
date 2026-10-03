import { Link } from "react-router-dom";


const Navbar = () => {
  const onClick = () => {
    localStorage.removeItem("user");
  }
  return (
    <nav className="navbar">
      <h1>Product ABC</h1>
      <div className="links">
        <Link to="/">Home</Link> <br />
        <Link to="/add-product">Add Product</Link>
        <Link to="/signup">Signup</Link>
        <Link to="/login">Login</Link>

        {}
      </div>
    </nav>
  );
};

export default Navbar;