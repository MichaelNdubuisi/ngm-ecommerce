import { FaShoppingCart, FaSearch, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useEffect, useState } from "react";

const Navbar = ({ searchTerm, setSearchTerm }) => {
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("ngm-authenticated") === "true"
  );

  useEffect(() => {
    // Listen to login/logout events
    const handleAuthChange = () => {
      const auth = localStorage.getItem("ngm-authenticated") === "true";
      setIsLoggedIn(auth);
    };

    window.addEventListener("authChange", handleAuthChange);
    return () => window.removeEventListener("authChange", handleAuthChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("ngm-authenticated");
    window.dispatchEvent(new Event("authChange")); // Trigger auth change
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const section = document.getElementById("products");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow z-50 px-6 py-4 flex items-center justify-between">
      <Link
        to="/"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="text-2xl font-bold text-pink-600"
      >
        NGM and Luxury 🛍️
      </Link>

      <form onSubmit={handleSearch} className="hidden md:flex flex-grow max-w-md mx-6">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search products..."
          className="w-full px-4 py-1 rounded-l border border-pink-600 text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-600"
        />
        <button
          type="submit"
          className="bg-pink-600 px-3 rounded-r hover:bg-pink-700 transition flex items-center justify-center"
          aria-label="Search"
        >
          <FaSearch className="text-white" />
        </button>
      </form>

      <div className="flex items-center gap-6">
        {!isLoggedIn ? (
          <Link to="/login">
            <FaUser className="text-xl text-gray-600 hover:text-pink-600 transition" title="Login" />
          </Link>
        ) : (
          <button
            onClick={handleLogout}
            className="text-sm text-gray-700 hover:text-red-600 font-medium"
          >
            Logout
          </button>
        )}

        <Link to="/cart" className="relative">
          <FaShoppingCart className="text-2xl text-pink-600" />
          <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {totalItems}
          </span>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
