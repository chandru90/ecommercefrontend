import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa"; 
const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);


  const totalAmount = cartItems
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <div className="flex items-center space-x-6 p-4 bg-white shadow-md rounded-lg">
      <Link
        to="/cart"
        className="flex items-center text-lg text-gray-700 hover:text-blue-500 space-x-2"
      >
        <FaShoppingCart className="text-2xl text-gray-700" />
        <span>Cart</span>
        {cartItems.length > 0 && (
          <>
            <span className="text-sm text-gray-500">({cartItems.length})</span>
            <span className="text-sm text-gray-500"> - ${totalAmount}</span>
          </>
        )}
      </Link>

      <Link
        to="/orders"
        className="text-lg text-gray-700 hover:text-blue-500 font-semibold"
      >
        Order History
      </Link>
    </div>
  );
};

export default Cart;
