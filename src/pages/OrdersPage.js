import React, { useState } from "react";
import axios from "axios";

const OrdersPage = () => {
  const [email, setEmail] = useState("");
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleFetchOrders = async () => {
    try {
      const response = await axios.get(
        `https://ecommercestore-yxcj.onrender.com/api/orders/orders/${email}`
      );
      setOrders(response.data);
      setError(null);
    } catch (err) {
      setError("Error fetching orders. Please try again.");
      setOrders([]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Your Orders
      </h2>

      <div className="mb-6">
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Enter your email"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleFetchOrders}
          className="w-full mt-4 p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Fetch Orders
        </button>
      </div>

      {error && (
        <p className="text-red-600 text-center font-semibold">{error}</p>
      )}

      {orders.length > 0 ? (
        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Order History
          </h3>
          <ul className="space-y-4">
            {orders.map((order) => (
              <li
                key={order._id}
                className="p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition duration-300"
              >
                <p className="font-semibold text-gray-800">
                  Order ID: {order._id}
                </p>
                <p className="text-gray-600">
                  Total Amount: Rs.{order.totalAmount}
                </p>
                <p className="text-gray-600">
                  Date: {new Date(order.orderDate).toLocaleDateString()}
                </p>

                <div className="mt-3">
                  <h4 className="text-lg font-semibold text-gray-700">Items</h4>
                  <ul className="space-y-2">
                    {order.items.map((item, index) => (
                      <li
                        key={index}
                        className="flex justify-between text-gray-600 text-sm"
                      >
                        <span>
                          Product ID: {item.productId}, {item.title} (Quantity:{" "}
                          {item.quantity})
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-center text-gray-600">
          No orders found for this email.
        </p>
      )}
    </div>
  );
};

export default OrdersPage;
