import { useEffect, useState } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("ngm-orders")) || [];
    setOrders(savedOrders);
  }, []);

  const handleDeleteOrder = (indexToDelete) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this order?");
    if (!confirmDelete) return;

    const updatedOrders = orders.filter((_, index) => index !== indexToDelete);
    setOrders(updatedOrders);
    localStorage.setItem("ngm-orders", JSON.stringify(updatedOrders));
  };

  return (
    <section className="pt-28 px-6 pb-20 min-h-screen bg-white text-gray-800">
      <h2 className="text-3xl font-bold text-center text-pink-600 mb-6">Customer Orders</h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders yet.</p>
      ) : (
        <div className="max-w-4xl mx-auto grid gap-8">
          {orders.map((order, index) => {
            const total = order.items.reduce(
              (sum, item) => sum + item.price * item.quantity,
              0
            );

            return (
              <div
                key={order.id || index}
                className="bg-gray-100 p-6 rounded shadow space-y-3 relative"
              >
                {/* Individual Delete Button */}
                <button
                  onClick={() => handleDeleteOrder(index)}
                  className="absolute top-4 right-4 bg-red-500 text-white text-sm px-3 py-1 rounded hover:bg-red-600 transition"
                >
                  🗑️ Delete Order
                </button>

                <p><strong>Name:</strong> {order.name}</p>
                <p><strong>Phone:</strong> {order.phone}</p>
                <p><strong>Address:</strong> {order.address}</p>
                {order.note && <p><strong>Note:</strong> {order.note}</p>}

                <h4 className="mt-4 font-semibold">Ordered Items:</h4>
                <ul className="space-y-1 text-sm border-t pt-2">
                  {order.items.map((item, i) => (
                    <li key={i}>
                      {item.name}
                      {item.size && (
                        <span className="ml-1 text-gray-600">({item.size})</span>
                      )}{" "}
                      × {item.quantity} —{" "}
                      <span className="text-pink-600 font-medium">
                        ₦{(item.price * item.quantity).toLocaleString()}
                      </span>
                    </li>
                  ))}
                </ul>

                {order.paymentImage && (
                  <div className="pt-4">
                    <p className="font-medium mb-2">Payment Screenshot:</p>
                    <img
                      src={order.paymentImage}
                      alt="Payment Proof"
                      className="w-64 border rounded"
                    />
                  </div>
                )}

                <p className="text-right font-bold mt-4 text-lg">
                  Total: ₦{total.toLocaleString()}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default Orders;
