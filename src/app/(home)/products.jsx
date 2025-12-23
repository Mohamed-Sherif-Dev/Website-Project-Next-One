"use client";

import Link from "next/link";
import { useCart } from "context/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";

// ⭐ helper لرسم النجوم
function renderStars(rating) {
  const stars = Math.round(rating);
  return "⭐".repeat(stars);
}

export default function Products({ data }) {
  const { addToCart } = useCart();

  return (
    <section className="products flex">
      {data.map((item) => (
        <article key={item.id} className="card">
          <Link href={`/product-details/${item.id}`}>
            <img
              width={286}
              height={286}
              src={item.thumbnail}
              alt={item.title}
            />
          </Link>

          <div style={{ width: 286 }} className="content">
            <h1 className="title">
              {item.title.slice(0, 10)}...
            </h1>

            <p className="description">
              {item.description.slice(0, 80)}
            </p>

            <p className="category">
              Category: <strong>{item.category}</strong>
            </p>

            <p className="rating">
              {renderStars(item.rating)} ({item.rating})
            </p>

            <p className={item.stock > 0 ? "in-stock" : "out-stock"}>
              {item.stock > 0
                ? `In Stock (${item.stock})`
                : "Out of Stock"}
            </p>

            <div className="flex" style={{ justifyContent: "space-between" }}>
              <div className="price">${item.price}</div>

              <button
                className="add-to-cart flex"
                disabled={item.stock === 0}
                onClick={() => addToCart(item)}
              >
                <i className="fa-solid fa-cart-plus" />
                <FontAwesomeIcon 
                 icon={faCartPlus}
                 style={{ width: "2.8rem",   }}
                 />
                Add To Cart
              </button>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}