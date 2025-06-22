import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProductGrid = ({ searchTerm }) => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("ngm-products")) || [];
    setProducts(saved);
  }, []);

  const categories = ["all", ...new Set(products.map((item) => item.category))];

  const filtered = products.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section className="pt-28 px-4 sm:px-6 md:px-10 pb-20 bg-white min-h-screen text-gray-800">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-pink-600 text-center">
        Our Products
      </h2>

      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full border ${
              selectedCategory === cat
                ? "bg-pink-600 text-white"
                : "bg-white text-pink-600 border-pink-600"
            } hover:bg-pink-600 hover:text-white transition`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      {filtered.length === 0 ? (
        <p className="text-center text-lg">No matching products found.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="border p-4 rounded shadow hover:shadow-lg transition flex flex-col"
            >
              <Link to={`/product/${item.id}`} className="flex flex-col gap-2 mb-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover rounded"
                />
                <h3 className="text-lg sm:text-xl font-bold">{item.name}</h3>
                <p className="text-pink-600 font-semibold text-sm sm:text-base">
                  ₦{parseInt(item.price).toLocaleString()}
                </p>
                <p className="text-xs sm:text-sm text-gray-500 capitalize">
                  {item.category}
                </p>
                <p className="text-xs text-gray-500 line-clamp-2">
                  {item.description}
                </p>

                {/* Conditionally show sizes if not hair */}
                {item.sizes && item.category !== "hair" && (
                  <div className="text-xs text-gray-700 mt-1">
                    Sizes: {item.sizes.join(", ")}
                  </div>
                )}
              </Link>

              <button
                onClick={() => addToCart(item)}
                className="mt-auto bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 transition"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default ProductGrid;
