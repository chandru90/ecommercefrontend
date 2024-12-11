// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CartPage from "./pages/CartPage";
import OrdersPage from "./pages/OrdersPage"; // Import the new OrdersPage
import Cart from "./components/Cart";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Cart />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/orders" element={<OrdersPage />} />{" "}
          {/* Add new route for OrdersPage */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
