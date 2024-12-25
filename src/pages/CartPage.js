import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, clearCart } from "../features/cartSlice";
import { Link } from "react-router-dom";
import axios from "axios";

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const totalAmount = cartItems
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleCheckout = async () => {
    if (!customerName || !email || !address) {
      alert("Please fill in all fields.");
      return;
    }

    const orderDetails = {
      customerName,
      email,
      address,
      items: cartItems.map((item) => ({
        productId: item.id,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
      })),
      totalAmount: parseFloat(totalAmount),
    };

    try {
      const response = await axios.post(
        "https://ecommercestore-yxcj.onrender.com/api/orders/checkout",
        orderDetails
      );

      console.log("Order placed successfully:", response.data);
      alert("Order placed successfully!");
      dispatch(clearCart());
    } catch (error) {
      console.error("Error placing order:", error);
      alert("There was an error placing your order. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-center text-lg text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center p-4 border rounded-lg shadow-md space-x-4"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-24 h-24 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-gray-600">Price: Rs{item.price}</p>
                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="text-red-500 hover:text-red-700 font-semibold"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Enter Your Details</h3>
              <input
                type="text"
                placeholder="Your Name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full p-2 border rounded-md mb-4"
              />
              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded-md mb-4"
              />
              <input
                type="text"
                placeholder="Your Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-2 border rounded-md mb-4"
              />
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4">Total Amount</h3>
              <p className="text-xl font-bold mb-4">Rs{totalAmount}</p>
              <button
                onClick={handleCheckout}
                className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
      <Link
        to="/"
        className="inline-block mt-6 text-blue-500 hover:text-blue-700"
      >
        Go Back to Products
      </Link>
    </div>
  );
};

export default CartPage;
