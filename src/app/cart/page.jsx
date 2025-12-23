"use client";

import { useCart } from "context/CartContext";
import Link from "next/link";
import "./cart.css";

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    incrementQty,
    decreaseQty,
    totalPrice,
  } = useCart();

  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Your cart is empty 🛒</h2>
        <Link href="/">Go shopping</Link>
      </div>
    );
  }

  return (
    <section className="cart">
      <h1>Shopping Cart</h1>

      <div className="cart-wrapper">
        {/* Items */}
        <div className="cart-items">
          {cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <img src={item.thumbnail} alt={item.title} />

              <div className="info">
                <h3>{item.title}</h3>
                <p className="category">{item.category}</p>

                <div className="qty flex">
                  <button onClick={() => decreaseQty(item.id)}>-</button>
                  <span>{item.qty}</span>
                  <button onClick={() => incrementQty(item.id)}>+</button>
                </div>
              </div>

              <div className="price">
                ${(item.price * item.qty).toFixed(2)}
              </div>

              <button
                className="remove"
                onClick={() => removeFromCart(item.id)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="cart-summary">
          <h2>Order Summary</h2>

          <div className="row">
            <span>Items</span>
            <span>{cart.length}</span>
          </div>

          <div className="row">
            <span>Total</span>
            <span className="total">${totalPrice.toFixed(2)}</span>
          </div>

          <button className="checkout">Proceed to Checkout</button>
        </div>
      </div>
    </section>
  );
}