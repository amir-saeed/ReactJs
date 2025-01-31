import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useNavigate } from "react-router-dom";
import { ShoppingBag, User, Mail, Home, CreditCard } from "lucide-react";

interface CheckoutForm {
  name: string;
  email: string;
  address: string;
}

const CheckoutPage: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const navigate = useNavigate();

  const [formData, setFormData] = useState<CheckoutForm>({
    name: "",
    email: "",
    address: "",
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.address) {
      setError("All fields are required.");
      return;
    }

    // Navigate to the Stripe Payment Page (Future Implementation)
    navigate("/payment", { state: { formData, total } });
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <ShoppingBag className="w-6 h-6 mr-2" /> Checkout
      </h2>

      {/* Cart Preview */}
      <div className="border rounded-lg p-4 bg-white shadow-md mb-6">
        <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
        {cartItems.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className="flex items-center border-b py-2">
              <img
                src={item.image}
                alt={item.title}
                className="w-16 h-16 object-contain mr-4"
              />
              <div className="flex-grow">
                <h4 className="font-semibold">{item.title}</h4>
                <p className="text-gray-600">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
                <span className="text-sm text-gray-500">
                  Qty: {item.quantity}
                </span>
              </div>
            </div>
          ))
        )}
        <div className="flex justify-between font-bold text-lg mt-4">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      {/* User Information Form */}
      <div className="border rounded-lg p-4 bg-white shadow-md">
        <h3 className="text-xl font-semibold mb-4">Shipping Information</h3>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
            <User className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-transparent outline-none px-2"
            />
          </div>

          <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
            <Mail className="w-5 h-5 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-transparent outline-none px-2"
            />
          </div>

          <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
            <Home className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              name="address"
              placeholder="Shipping Address"
              value={formData.address}
              onChange={handleChange}
              className="w-full bg-transparent outline-none px-2"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center justify-center hover:bg-blue-700 transition"
          >
            Proceed to Payment <CreditCard className="w-5 h-5 ml-2" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
