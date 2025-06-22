import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";

import hoodieImg from "../assets/images/Unisexhoodie.jpg";
import tshirtImg from "../assets/images/LuxuryT-shirt.jpg";
import joggersImg from "../assets/images/Stylish Joggers.jpg";

const staticProducts = [
  {
    id: 1,
    name: "Unisex Hoodie",
    price: 15000,
    image: hoodieImg,
    category: "clothing",
    description: "Stay cozy and stylish with our Unisex Hoodie...",
    material: "Cotton Blend",
    fit: "Relaxed Fit",
    care: "Machine wash cold, tumble dry low",
    sizes: ["S", "M", "L", "XL"],
    quantity: 10,
  },
  {
    id: 2,
    name: "Luxury T-Shirt",
    price: 10000,
    image: tshirtImg,
    category: "clothing",
    description: "Experience luxury with our soft, breathable T-Shirt...",
    material: "100% Organic Cotton",
    fit: "Slim Fit",
    care: "Hand wash recommended",
    sizes: ["S", "M", "L", "XL", "XXL"],
    quantity: 8,
  },
  {
    id: 3,
    name: "Stylish Joggers",
    price: 18000,
    image: joggersImg,
    category: "clothing",
    description: "These Stylish Joggers offer fashion and comfort...",
    material: "Poly-Cotton Blend",
    fit: "Tapered",
    care: "Wash inside out in cold water",
    sizes: ["M", "L", "XL"],
    quantity: 6,
  },
];

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("ngm-products")) || [];
    const all = [...staticProducts, ...saved];
    const found = all.find((item) => item.id === parseInt(id));
    setProduct(found);
    if (found?.sizes?.length && found.category !== "hair") {
      setSelectedSize(found.sizes[0]);
    }
  }, [id]);

  if (!product) return <p className="pt-28 text-center">Product not found.</p>;

  const isOutOfStock = product.quantity !== undefined && product.quantity <= 0;

  const handleAddToCart = () => {
    const productToAdd = {
      ...product,
      ...(selectedSize && { size: selectedSize }), // only add size if selected
    };

    addToCart(productToAdd);
  };

  return (
    <section className="pt-28 px-4 sm:px-6 md:px-10 pb-20 min-h-screen bg-white text-gray-800">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start gap-10">
        <div className="w-full md:w-1/2">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto max-h-[450px] object-cover rounded shadow"
          />
        </div>

        <div className="flex-1 space-y-5">
          <h2 className="text-2xl sm:text-3xl font-bold text-pink-600">{product.name}</h2>
          <p className="text-xl font-semibold text-gray-800">
            ₦{parseInt(product.price).toLocaleString()}
          </p>

          <p className="text-sm text-gray-500 capitalize">Category: {product.category}</p>
          <p className="text-gray-700 text-base">{product.description}</p>

          <ul className="text-sm sm:text-base text-gray-600 list-disc list-inside">
            <li><strong>Material:</strong> {product.material}</li>
            <li><strong>Fit:</strong> {product.fit}</li>
            <li><strong>Care Instructions:</strong> {product.care}</li>
          </ul>

          {product.quantity !== undefined && (
            <p className={`text-sm font-medium ${isOutOfStock ? "text-red-600" : "text-green-600"}`}>
              {isOutOfStock ? "Out of Stock" : `In Stock: ${product.quantity}`}
            </p>
          )}

          {/* Optional Size Selector */}
          {product.category !== "hair" && product.sizes?.length > 0 && (
            <div>
              <label htmlFor="size" className="block mb-2 font-medium">
                Select Size:
              </label>
              <select
                id="size"
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="border px-4 py-2 rounded w-full max-w-xs focus:outline-pink-500"
              >
                {product.sizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="flex flex-wrap gap-4 pt-4">
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`px-6 py-2 rounded transition duration-300 ${
                isOutOfStock
                  ? "bg-gray-400 cursor-not-allowed text-white"
                  : "bg-pink-600 hover:bg-pink-700 text-white"
              }`}
            >
              Add to Cart
            </button>

            <Link
              to="/"
              className="inline-block px-6 py-2 border border-gray-400 text-gray-600 rounded hover:bg-gray-100 transition duration-300"
            >
              Back to Products
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
