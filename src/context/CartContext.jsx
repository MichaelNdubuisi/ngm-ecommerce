import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem("ngm-cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // Save cart to localStorage on every change
  useEffect(() => {
    localStorage.setItem("ngm-cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Add to cart with size support
  const addToCart = (product) => {
    setCartItems((prev) => {
      const exists = prev.find(
        (item) => item.id === product.id && item.size === product.size
      );
      if (exists) {
        return prev.map((item) =>
          item.id === product.id && item.size === product.size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  // Remove from cart (based on id and size)
  const removeFromCart = (id, size = null) => {
    setCartItems((prev) =>
      prev.filter((item) =>
        size ? item.id !== id || item.size !== size : item.id !== id
      )
    );
  };

  // Update quantity by id and size
  const updateQuantity = (id, qty, size = null) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.size === size
          ? { ...item, quantity: Math.max(1, qty) }
          : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        setCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
