import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import { useContext } from "react";
import { AuthDataContext } from "../context/AuthContext";


const Success = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  let { serverUrl } = useContext(AuthDataContext)
  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const orderId = params.get("orderId");

        if (orderId) {
          await axios.post(
            `${serverUrl}/api/order/verify-esewa`,
            { orderId },
            { withCredentials: true }
          );
        }
      } catch (error) {
        console.error("Payment verification failed:", error);
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [serverUrl]);
  return (
    <div className="w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">

        <h1 className="text-3xl font-bold text-green-600 mb-4">Payment Successful!</h1>
        <p className="text-gray-700 mb-6">
          Thank you for your payment. Your transaction has been successfully processed.
        </p>

        {loading ? (
          <p className="text-gray-500">Verifying payment...</p>
        ) : (
          <button
            onClick={() => navigate("/")}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Go to Homepage
          </button>
        )}
      </div>
    </div>
  );
};

export default Success;