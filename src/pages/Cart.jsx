import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleQtyChange = (id, size, value) => {
    const quantity = Math.max(1, parseInt(value) || 1);
    updateQuantity(id, quantity, size);
  };

  return (
    <section className="pt-28 px-4 sm:px-6 md:px-10 pb-20 min-h-screen bg-white text-gray-800">
      <h1 className="text-2xl sm:text-3xl font-bold mb-8 text-center text-pink-600">
        Your Cart
      </h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-lg">🛒 Your cart is empty.</p>
      ) : (
        <div className="max-w-5xl mx-auto space-y-10">
          {cartItems.map((item) => (
            <article
              key={item.id + (item.size || "")}
              className="flex flex-col md:flex-row items-center md:items-start gap-6 border-b pb-6"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full max-w-[120px] h-32 object-cover rounded"
              />
              <div className="flex-1 w-full">
                <h3 className="text-lg sm:text-xl font-semibold">{item.name}</h3>
                {item.size && (
                  <p className="text-sm text-gray-600 mt-1">
                    Size: <strong>{item.size}</strong>
                  </p>
                )}
                <p className="text-pink-600 font-bold mt-1">
                  ₦{item.price.toLocaleString()}
                </p>

                <div className="mt-2 flex flex-wrap items-center gap-3">
                  <label htmlFor={`qty-${item.id}-${item.size}`} className="text-sm font-medium">
                    Quantity:
                  </label>
                  <input
                    id={`qty-${item.id}-${item.size}`}
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleQtyChange(item.id, item.size, e.target.value)}
                    className="w-20 px-3 py-1 border rounded text-center text-sm"
                  />
                </div>

                <button
                  onClick={() => removeFromCart(item.id, item.size)}
                  className="mt-2 text-sm text-red-600 hover:underline"
                >
                  ❌ Remove
                </button>
              </div>
            </article>
          ))}

          {/* Total Price */}
          <div className="text-right text-lg sm:text-xl font-semibold text-gray-900">
            Total: ₦{totalPrice.toLocaleString()}
          </div>

          {/* Checkout Button */}
          <div className="text-right">
            <Link
              to="/checkout"
              className="inline-block mt-4 bg-pink-600 text-white px-6 py-3 rounded hover:bg-pink-700 transition"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </section>
  );
};

export default Cart;
