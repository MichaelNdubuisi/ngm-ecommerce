import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("ngm-products")) || [];
    setProducts(saved);
  }, []);

  return (
    <section
      id="products"
      className="pt-28 px-4 sm:px-6 md:px-10 pb-20 bg-white min-h-screen text-gray-800"
    >
      {/* ✅ SEO Meta Tags */}
      <Helmet>
        <title>Our Products | NGM and Luxury 🛍️</title>
        <meta
          name="description"
          content="Browse unisex fashion, hair, and beauty products from NGM and Luxury. Discover hoodies, t-shirts, joggers, and more!"
        />
        <meta name="keywords" content="NGM and Luxury, unisex fashion, hoodies, t-shirts, hair, joggers, beauty products" />
        <meta property="og:title" content="Our Products | NGM and Luxury 🛍️" />
        <meta property="og:description" content="Explore our wide range of unisex clothing and beauty items." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com/products" />
      </Helmet>

      <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-pink-600 text-center">
        Our Products
      </h2>

      {products.length === 0 ? (
        <p className="text-center text-lg">No products available yet.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((item) => (
            <div
              key={item.id}
              className="border p-4 rounded shadow hover:shadow-lg transition flex flex-col"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 sm:h-56 object-cover rounded"
              />
              <div className="mt-3">
                <h3 className="text-lg sm:text-xl font-bold">{item.name}</h3>
                <p className="text-pink-600 font-semibold text-sm sm:text-base">
                  ₦{parseInt(item.price).toLocaleString()}
                </p>
                <p className="text-xs sm:text-sm text-gray-500 capitalize">
                  {item.category}
                </p>

                {item.sizes && item.category !== "hair" && (
                  <p className="text-xs text-gray-700 mt-1">
                    Sizes: {item.sizes.join(", ")}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Products;
