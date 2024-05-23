import React, { useState } from "react";
import PageHead from "../../components/page-head";
import ProductsList from "./products-list";

function Products() {
  document.title = "Products | Stellar Dairies";
  const [category, setCategory] = useState("all");
  return (
    <div>
      <PageHead title="Our Products" />
      <div className="container flex flex-row gap-5 py-10 mx-auto">
        <div className="hidden w-80 border-e md:block">
          <p className="p-4 border-b text-[20px] font-semibold">
            Product categories
          </p>
          <div>
            <p
              onClick={() => setCategory("all")}
              className="px-4 py-2 cursor-pointer hover:bg-green-600/15 border-b"
            >
              All
            </p>
            <p
              onClick={() => setCategory("vanilla")}
              className="px-4 py-2 cursor-pointer hover:bg-green-600/15 border-b"
            >
              Vanilla
            </p>
            <p
              onClick={() => setCategory("strawberry")}
              className="px-4 py-2 cursor-pointer hover:bg-green-600/15 border-b"
            >
              Strawberry
            </p>
            <p
              onClick={() => setCategory("natural")}
              className="px-4 py-2 cursor-pointer hover:bg-green-600/15 border-b"
            >
              Natural
            </p>
            <p
              onClick={() => setCategory("mango")}
              className="px-4 py-2 cursor-pointer hover:bg-green-600/15 border-b"
            >
              Mango
            </p>
            <p
              onClick={() => setCategory("passion")}
              className="px-4 py-2 cursor-pointer hover:bg-green-600/15 border-b"
            >
              Passion
            </p>
            <p
              onClick={() => setCategory("blackcurrant")}
              className="px-4 py-2 cursor-pointer hover:bg-green-600/15 border-b"
            >
              Blackcurrant
            </p>
          </div>
        </div>
        <ProductsList category={category} />
      </div>
    </div>
  );
}

export default Products;
