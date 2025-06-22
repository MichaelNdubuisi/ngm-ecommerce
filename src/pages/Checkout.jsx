import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Checkout = () => {
  const { cartItems, setCartItems } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    note: "",
    paymentImage: null,
  });

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({ ...prev, paymentImage: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const confirm = window.confirm(
      "Have you made the bank payment?\nOnce you confirm, your order will be recorded."
    );
    if (!confirm) return;

    const newOrder = {
      id: Date.now(),
      name: form.name,
      phone: form.phone,
      address: form.address,
      note: form.note,
      items: cartItems,
      total: total,
      date: new Date().toLocaleString(),
      paymentImage: form.paymentImage || null,
    };

    const existingOrders = JSON.parse(localStorage.getItem("ngm-orders")) || [];
    existingOrders.push(newOrder);
    localStorage.setItem("ngm-orders", JSON.stringify(existingOrders));

    localStorage.removeItem("ngm-cart");
    setCartItems([]);

    alert("✅ Order received! We'll confirm your payment and process your delivery.");
    navigate("/success");
  };

  return (
    <section className="pt-28 px-4 sm:px-6 lg:px-12 pb-20 min-h-screen bg-white text-gray-800">
      <h1 className="text-2xl sm:text-3xl font-bold mb-8 text-center text-pink-600">Checkout</h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-lg">🛒 Your cart is empty.</p>
      ) : (
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8">
          {/* Order Summary */}
          <div className="bg-gray-100 p-6 rounded-lg shadow space-y-4">
            <h2 className="text-lg sm:text-xl font-semibold">Order Summary</h2>
            <ul className="space-y-2 text-sm sm:text-base">
              {cartItems.map((item) => (
                <li key={item.id + item.size} className="flex justify-between">
                  <span>
                    {item.name} × {item.quantity}
                    {item.size && <span className="ml-1 text-gray-500">(Size: {item.size})</span>}
                  </span>
                  <span>₦{(item.price * item.quantity).toLocaleString()}</span>
                </li>
              ))}
            </ul>
            <hr />
            <p className="text-right font-bold text-lg">
              Total: ₦{total.toLocaleString()}
            </p>
          </div>

          {/* Bank Payment Info */}
          <div className="bg-pink-50 p-6 rounded-lg shadow border border-pink-200 space-y-2">
            <h2 className="text-lg sm:text-xl font-semibold text-pink-600">Bank Payment Info</h2>
            <p><strong>Bank:</strong> Opay</p>
            <p><strong>Account Name:</strong> Gift Onyinyechi Eze</p>
            <p><strong>Account Number:</strong> 8114592027</p>
            <p className="text-sm text-gray-600">
              Please complete payment and upload your screenshot below to confirm your order.
            </p>
          </div>

          {/* Customer Information */}
          <div className="bg-gray-100 p-6 rounded-lg shadow space-y-4">
            <h2 className="text-lg sm:text-xl font-semibold">Your Information</h2>
            <input
              name="name"
              type="text"
              placeholder="Full Name"
              required
              value={form.name}
              onChange={handleInput}
              className="w-full border px-4 py-2 rounded focus:outline-pink-500"
            />
            <input
              name="phone"
              type="tel"
              placeholder="Phone Number"
              required
              value={form.phone}
              onChange={handleInput}
              className="w-full border px-4 py-2 rounded focus:outline-pink-500"
            />
            <input
              name="address"
              type="text"
              placeholder="Delivery Address"
              required
              value={form.address}
              onChange={handleInput}
              className="w-full border px-4 py-2 rounded focus:outline-pink-500"
            />
            

            {/* Screenshot Upload */}
            <div>
              <label className="block mb-2 font-medium text-sm sm:text-base">
                Upload Payment Screenshot
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full border px-4 py-2 rounded"
              />
              {form.paymentImage && (
                <img
                  src={form.paymentImage}
                  alt="Payment Screenshot Preview"
                  className="mt-4 w-full max-w-xs sm:max-w-sm border rounded"
                />
              )}
            </div>
          </div>

          {/* Confirm Button */}
          <div className="text-right">
            <button
              type="submit"
              className="bg-pink-600 text-white px-6 py-3 rounded hover:bg-pink-700 transition"
            >
              I Have Made Payment
            </button>
          </div>
        </form>
      )}
    </section>
  );
};

export default Checkout;
