"use client";
import Header from "components/header";
import Footer from "components/footer/footer";
import "./details.css";
import { useCart } from "context/CartContext";
import { use, useEffect, useState } from "react";

export default function ProductDetails({ params }) {
  const { addToCart } = useCart();
  const { id } = use(params);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);



  // useEffect(() => {
  //   fetch(`http://localhost:4000/products/${id}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setProduct(data);
  //       setLoading(false);
  //     });
  // }, [id]);

  useEffect(()=>{
    fetch("/db.json")
    .then((res) => res.json())
    .then((data)=>{
      const product = data.products.find(
        (item) => item.id === Number(id)
      )
      setProduct(product);
      setLoading(false);
    })
  })




  if (loading) {
    return <p style={{ padding: 40 }}>Loading...</p>;
  }
  if (!product) {
    return <p style={{ padding: 40 }}>Product not found</p>;
  }


 
  return (
    <div>
      <Header />
       <div className="details-container">
      <img
        src={product.thumbnail}
        alt={product.title}
        width={400}
        height={400}
        className="details-img"
      />

      <div className="details-content">
        <h1>{product.title}</h1>
        <p className="desc">{product.description}</p>

        <p><strong>Category:</strong> {product.category}</p>
        <p><strong>Rating:</strong> ⭐ {product.rating}</p>
        <p>
          <strong>Status:</strong>{" "}
          {product.stock > 0 ? "In Stock" : "Out of Stock"}
        </p>

        <h2>${product.price}</h2>

        <button onClick={() => addToCart(product)}>Add To Cart</button>
      </div>
    </div>
      <Footer />
    </div>
  );
}


