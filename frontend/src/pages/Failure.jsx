import React from "react";
import { useNavigate } from "react-router-dom";

const Failure = () => {
  const navigate = useNavigate();

  return (
    <div className="w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        
        <h1 className="text-3xl font-bold text-red-600 mb-4">Payment Failed!</h1>
        <p className="text-gray-700 mb-6">
          There was an issue with your payment. Please try again.
        </p>

        <button
          onClick={() => navigate("/")}
          className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition"
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
};

export default Failure;
