import React from "react";
import HomePage from "./pages/HomePage/HomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Layout from "./pages/Layout/Layout";
import About from "./pages/About/About";
import Products from "./pages/Products/Products";
import ProductDetails from "./pages/Products/ProductDetails/ProductDetails";

const App = () => {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route element={<Layout />}>
            <Route path='/' element={<HomePage />} />
            <Route path='/about' element={<About />} />
            <Route path='/products' element={<Products />} />
            <Route path='/products/:id' element={<ProductDetails />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
