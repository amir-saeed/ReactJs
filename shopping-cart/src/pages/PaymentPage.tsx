import React from "react";
import { useLocation } from "react-router-dom";

const PaymentPage: React.FC = () => {
  const location = useLocation();
  const { formData, total } = location.state || {};

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Payment</h2>
      <div className="border rounded-lg p-4 bg-white shadow-md mb-6">
        <h3 className="text-xl font-semibold mb-4">Order Details</h3>
        <p>
          <strong>Name:</strong> {formData?.name}
        </p>
        <p>
          <strong>Email:</strong> {formData?.email}
        </p>
        <p>
          <strong>Address:</strong> {formData?.address}
        </p>
        <p className="font-bold text-lg mt-4">Total: ${total?.toFixed(2)}</p>
      </div>

      {/* Stripe Checkout Button (to be integrated) */}
      <button className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
        Pay with Stripe
      </button>
    </div>
  );
};

export default PaymentPage;
