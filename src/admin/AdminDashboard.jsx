import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <section className="pt-28 px-6 min-h-screen bg-white text-gray-800">
      <h2 className="text-3xl font-bold text-center text-pink-600 mb-10">Admin Dashboard</h2>

      <div className="max-w-2xl mx-auto grid gap-6">
        <Link
          to="/admin/add-product"
          className="bg-pink-100 border border-pink-300 p-6 rounded text-center hover:bg-pink-200 transition"
        >
          ➕ Add Product
        </Link>
        <Link
          to="/admin/manage-products"
          className="bg-pink-100 border border-pink-300 p-6 rounded text-center hover:bg-pink-200 transition"
        >
          🛍️ View & Manage Products
        </Link>
        <Link
          to="/admin/orders"
          className="bg-pink-100 border border-pink-300 p-6 rounded text-center hover:bg-pink-200 transition"
        >
          📦 View Orders
        </Link>
      </div>
    </section>
  );
};

export default AdminDashboard;
