import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProductGrid from "./components/ProductGrid";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";
import AdminDashboard from "./admin/AdminDashboard";
import AddProduct from "./admin/AddProduct";
import Orders from "./admin/Orders";
import AdminLogin from "./pages/AdminLogin";
import ProtectedRoute from "./utils/ProtectedRoute";
import ProductDetails from "./components/ProductDetails";
import ManageProducts from "./pages/ManageProducts";
import RegisterLogin from "./pages/RegisterLogin";
import UserProtectedRoute from "./utils/UserProtectedRoute";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
}

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            <>
              <Hero />
              <ProductGrid searchTerm={searchTerm} />
            </>
          }
        />
        <Route path="/cart" element={<Cart />} />
        <Route path="/success" element={<Success />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/login" element={<RegisterLogin />} />

        {/* Protected User Route */}
        <Route
          path="/checkout"
          element={
            <UserProtectedRoute>
              <Checkout />
            </UserProtectedRoute>
          }
        />

        {/* Protected Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/add-product"
          element={
            <ProtectedRoute>
              <AddProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/manage-products"
          element={
            <ProtectedRoute>
              <ManageProducts />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
