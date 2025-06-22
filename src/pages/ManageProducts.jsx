import { useEffect, useState } from "react";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedProduct, setEditedProduct] = useState({});

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("ngm-products")) || [];
    setProducts(saved);
  }, []);

  const handleDelete = (id) => {
    const updated = products.filter((item) => item.id !== id);
    setProducts(updated);
    localStorage.setItem("ngm-products", JSON.stringify(updated));
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setEditedProduct({ ...product });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const updated = products.map((item) =>
      item.id === editingId ? editedProduct : item
    );
    setProducts(updated);
    localStorage.setItem("ngm-products", JSON.stringify(updated));
    setEditingId(null);
    setEditedProduct({});
  };

  return (
    <section className="pt-28 px-6 pb-20 min-h-screen bg-white text-gray-800">
      <h2 className="text-3xl font-bold text-center text-pink-600 mb-10">Manage Products</h2>

      {products.length === 0 ? (
        <p className="text-center text-lg">No products added yet.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {products.map((product) => (
            <div key={product.id} className="border rounded p-4 shadow relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded"
              />

              {editingId === product.id ? (
                <>
                  <input
                    name="name"
                    value={editedProduct.name}
                    onChange={handleChange}
                    className="border px-2 py-1 w-full mt-2 rounded"
                  />
                  <input
                    name="price"
                    type="number"
                    value={editedProduct.price}
                    onChange={handleChange}
                    className="border px-2 py-1 w-full mt-2 rounded"
                  />
                  <input
                    name="category"
                    value={editedProduct.category}
                    onChange={handleChange}
                    className="border px-2 py-1 w-full mt-2 rounded"
                  />
                  <textarea
                    name="description"
                    value={editedProduct.description}
                    onChange={handleChange}
                    rows={3}
                    className="border px-2 py-1 w-full mt-2 rounded"
                  ></textarea>
                  {(editedProduct.category?.toLowerCase() === "clothing" ||
                    editedProduct.category?.toLowerCase() === "shoes") && (
                    <input
                      name="sizes"
                      value={editedProduct.sizes?.join(", ") || ""}
                      onChange={(e) =>
                        setEditedProduct((prev) => ({
                          ...prev,
                          sizes: e.target.value.split(",").map((s) => s.trim()),
                        }))
                      }
                      placeholder="Sizes (e.g., S, M, L)"
                      className="border px-2 py-1 w-full mt-2 rounded"
                    />
                  )}
                </>
              ) : (
                <>
                  <h3 className="mt-2 text-lg font-bold">{product.name}</h3>
                  <p className="text-pink-600 font-semibold">
                    ₦{parseInt(product.price).toLocaleString()}
                  </p>
                  <p className="text-gray-500 text-sm capitalize">
                    {product.category}
                  </p>
                  <p className="text-sm text-gray-700 mt-1">{product.description}</p>
                  {product.sizes?.length > 0 && (
                    <p className="text-xs text-gray-600 mt-1">
                      Sizes: {product.sizes.join(", ")}
                    </p>
                  )}
                </>
              )}

              <div className="mt-3 flex gap-3">
                {editingId === product.id ? (
                  <button
                    onClick={handleSave}
                    className="text-white bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-sm"
                  >
                    ✅ Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEdit(product)}
                    className="text-white bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded text-sm"
                  >
                    ✏️ Edit
                  </button>
                )}
                <button
                  onClick={() => handleDelete(product.id)}
                  className="text-white bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
                >
                  ❌ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default ManageProducts;
