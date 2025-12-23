"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

// =====================
// Create Context
// =====================
const CartContext = createContext(null);

// =====================
// Provider
// =====================
export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // =====================
  // Load cart from localStorage
  // =====================
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    } catch (error) {
      console.error("Invalid cart data", error);
      localStorage.removeItem("cart");
    }
  }, []);

  // =====================
  // Save cart to localStorage
  // =====================
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // =====================
  // Add to cart
  // =====================
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }

      return [...prev, { ...product, qty: 1 }];
    });
  };

  // =====================
  // Remove item
  // =====================
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // =====================
  // Increment quantity
  // =====================
  const incrementQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  // =====================
  // Decrease quantity (remove if qty === 0)
  // =====================
  const decreaseQty = (id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, qty: item.qty - 1 } : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  // =====================
  // Total Price
  // =====================
  const totalPrice = useMemo(() => {
    return cart.reduce(
      (acc, item) => acc + item.price * item.qty,
      0
    );
  }, [cart]);



  const totalItems = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.qty, 0);
  }, [cart]);

  // =====================
  // Context value
  // =====================
  const value = {
    cart,
    addToCart,
    removeFromCart,
    incrementQty,
    decreaseQty,
    totalPrice,
    totalItems
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

// =====================
// Custom Hook
// =====================
export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }

  return context;
};
