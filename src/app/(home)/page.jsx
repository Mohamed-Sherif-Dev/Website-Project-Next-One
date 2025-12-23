
import Products from "./products";
import Header from "../../components/header";
import Footer from "../../components/footer/footer";
import Loading from "./loading";
import { Suspense } from "react";
import { notFound } from "next/navigation";

async function getData() {
  const res = await fetch("http://localhost:4000/products", {
    cache: "no-store",
  });

  if (!res.ok) {
    notFound();
  }

  return res.json();
}

export default async function Page() {
  const data = await getData();

  return (
    <main>
      <div className="top-img">
        <Header />
        <section className="content">
          <p className="lifestyle">Lifestyle collection</p>
          <p className="men">MEN</p>
          <p className="sale">
            SALE UP TO <span>30% OFF</span>
          </p>
          <p className="free-shipping">
            Get Free Shipping on orders over $99.00
          </p>
          <button>Shop Now</button>
        </section>
      </div>

      <main>
        <h1 className="recommended flex">Recommended for you</h1>

        <Suspense fallback={<Loading />}>
          <Products data={data} />
        </Suspense>
      </main>

      <Footer />
    </main>
  );
}