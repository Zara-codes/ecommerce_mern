import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { shopDataContext } from "../context/ShopContext";
import { generateUniqueId } from "esewajs";
import { AuthDataContext } from "../context/AuthContext";
import { toast } from 'react-toastify';
import { useLocation } from "react-router-dom";

const PaymentForm = () => {
  const { cartItem, products, getCartAmount, getSingleCartAmount, delivery_fee, setCartItem } = useContext(shopDataContext);

  const [amount, setAmount] = useState("");

  const location = useLocation()
  const { productId, size } = location.state || {}

  const serverUrl = "http://localhost:8000";

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    state: '',
    city: '',
    pinCode: '',
    country: '',
    phone: '',
  });

  // Calculate total amount on component mount
  useEffect(() => {
    console.log("productId, size, cartItem", productId, size, cartItem)
    if (!productId || !size) return; // skip if undefined

    const total = getSingleCartAmount(productId, size) + delivery_fee;
    console.log("Calculated total:", total)
    setAmount(total);
  }, [cartItem, getSingleCartAmount, delivery_fee, productId, size]);

  const handlePayment = async (e) => {
    e.preventDefault();

    try {
      let orderItems = [];
      if (productId && size) {
        const quantity = cartItem[productId][size]
        const itemInfo = structuredClone(products.find(p => p._id === productId))
        if (itemInfo) {
          itemInfo.size = size
          itemInfo.quantity = quantity
          orderItems.push(itemInfo) // Only push the product being paid
        }
      }

      // Order data
      const orderData = {
        address: formData,
        items: orderItems,
        amount: getSingleCartAmount(productId, size) + delivery_fee, // calculate total
      };

      // Send order to backend
      const res = await axios.post(
        `${serverUrl}/api/order/placeorderbyesewa`,
        orderData,
        { withCredentials: true }
      );

      // Backend returns: { url, transactionId }
      if (res.data.url) {
        window.location.href = res.data.url; // Redirect to eSewa payment page
      } else {
        console.error("Payment URL not returned from backend");
        toast.error("Payment Error")
      }

    } catch (error) {
      toast.error("Payment Error")
      console.error("Payment error:", error);
    }
  };


  return (
    <div className="w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-green-600 mb-6">
          ESewa Payment Integration
        </h1>

        <form onSubmit={handlePayment} className="space-y-5">
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700">Amount</label>
            <input
              type="number"
              value={amount}
              readOnly
              className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 outline-none cursor-not-allowed bg-gray-200"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg text-lg font-semibold hover:bg-green-700 transition"
          >
            Pay with eSewa
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentForm;