import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import Home from "./pages/HomePage";
import AddProductPage from "./pages/AddProductPage";
import Navbar from "./components/Navbar";
import NotFoundPage from "./pages/NotFoundPage";
import ProductPage from "./pages/ProductPage";
import EditProductPage from "./pages/EditProductPage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";


const App = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(
    () => !!localStorage.getItem("user")
  )

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/products/:id" element={<ProductPage isAuthenticated={isAuthenticated} />} />
            <Route path="/edit/:id" element={ isAuthenticated ? <EditProductPage/> : <Navigate to="/signup"/>} />
            <Route path="/add-product" element={ isAuthenticated ? <AddProductPage/> : <Navigate to="/signup"/>} />
            <Route path="*" element={<NotFoundPage />} />

            <Route path="/signup" element={ isAuthenticated ? <Navigate to="/"/> : <Signup isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>}></Route>
            <Route path="/login" element={ isAuthenticated ? <Navigate to="/"/> : <Login isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;