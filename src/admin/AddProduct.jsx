import { useState } from "react";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    image: null,
    category: "",
    description: "",
    sizes: "",
    quantity: "", // new field
  });

  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProduct((prev) => ({ ...prev, image: reader.result }));
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const category = product.category.toLowerCase();
    const sizesArray =
      category === "clothing" || category === "shoes"
        ? product.sizes.split(",").map((s) => s.trim()).filter(Boolean)
        : [];

    const newProduct = {
      id: Date.now(),
      name: product.name,
      price: parseFloat(product.price),
      image: product.image,
      category: product.category,
      description: product.description,
      quantity: parseInt(product.quantity) || 1,
      sizes: sizesArray.length > 0 ? sizesArray : undefined,
    };

    const savedProducts = JSON.parse(localStorage.getItem("ngm-products")) || [];
    savedProducts.push(newProduct);
    localStorage.setItem("ngm-products", JSON.stringify(savedProducts));

    setProduct({
      name: "",
      price: "",
      image: null,
      category: "",
      description: "",
      sizes: "",
      quantity: "",
    });
    setImagePreview(null);
  };

  return (
    <section className="pt-28 px-6 pb-20 min-h-screen bg-white text-gray-800">
      <h2 className="text-3xl font-bold text-center text-pink-600 mb-10">Add New Product</h2>

      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto grid gap-6 bg-gray-50 p-6 rounded shadow"
      >
        <input
          name="name"
          value={product.name}
          onChange={handleChange}
          placeholder="Product Name"
          required
          className="border px-4 py-2 rounded"
        />

        <input
          name="price"
          value={product.price}
          onChange={handleChange}
          placeholder="Price (₦)"
          type="number"
          required
          className="border px-4 py-2 rounded"
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          required
          className="border px-4 py-2 rounded"
        />

        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            className="w-32 h-32 object-cover rounded mx-auto"
          />
        )}

        <input
          name="category"
          value={product.category}
          onChange={handleChange}
          placeholder="Category (e.g., clothing, shoes, hair, nails)"
          required
          className="border px-4 py-2 rounded"
        />

        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          placeholder="Product Description"
          rows="4"
          required
          className="border px-4 py-2 rounded"
        ></textarea>

        {(product.category.toLowerCase() === "clothing" ||
          product.category.toLowerCase() === "shoes") && (
          <input
            name="sizes"
            value={product.sizes}
            onChange={handleChange}
            placeholder="Available Sizes (e.g., S, M, L, XL)"
            className="border px-4 py-2 rounded"
          />
        )}

        <input
          name="quantity"
          value={product.quantity}
          onChange={handleChange}
          type="number"
          min="1"
          placeholder="Number of products in stock"
          required
          className="border px-4 py-2 rounded"
        />

        <button className="bg-pink-600 text-white py-2 rounded hover:bg-pink-700 transition">
          ➕ Add Product
        </button>
      </form>
    </section>
  );
};

export default AddProduct;
