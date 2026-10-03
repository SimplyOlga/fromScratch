import { Link } from "react-router-dom";


const Navbar = ({ isAuthenticated, setIsAuthenticated}) => {

  const user = JSON.parse(localStorage.getItem("user"))

  const onClick = () => {
    localStorage.removeItem("user");
    setIsAuthenticated(false)
  }

  return (



    <nav className="navbar">
      <h1>Product ABC</h1>
      <div className="links">
        <Link to="/">Home</Link> <br />

        {isAuthenticated ? (
          <>
        <Link to="/add-product">Add Product</Link>
        <button onClick={onClick}>Logout</button>
            
          </>
        ): (
          <>
        <Link to="/signup">Signup</Link>
        <Link to="/login">Login</Link>
          </>
        )}

      </div>
    </nav>
  );
};

export default Navbar;