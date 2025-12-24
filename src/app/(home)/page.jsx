
import Products from "./products";
import Header from "../../components/header";
import Footer from "../../components/footer/footer";
import Loading from "./loading";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import path from "path";
import fs from "fs";


async function getData() {
  const filePath = path.join(process.cwd(), "public", "db.json");
  const jsonData = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(jsonData);
  return data;
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
          <Products data={data.products} />
        </Suspense>
      </main>

      <Footer />
    </main>
  );
}