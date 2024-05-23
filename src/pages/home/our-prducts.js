import React from "react";
import bg from "../../assets/Shop1.jpg";
import { products } from "../../constants/data";
import { Link } from "react-router-dom";

function OurPrducts() {
  return (
    <div
      style={{ backgroundImage: `url(${bg})` }}
      className="bg-no-repeat bg-cover"
    >
      <div className="container py-16 mx-auto">
        <h2 className="mt-10 text-4xl font-bold text-center">Our Products</h2>

        <div className="grid grid-cols-2 gap-4 mt-10 md:gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
          {products.slice(0, 10).map((p, i) => (
            <a href="/order-now" key={`${i}-${p}`}>
              <div className="pt-6 bg-white rounded-xl border-[1px]">
                <img
                  src={p.image}
                  alt={p.title}
                  className="aspect-[3/2] object-contain"
                />
                <div className="p-3 product__footer grid gap-1">
                  <h3 className="mt-3 text-sm font-medium line-clamp-1 sm:text-base">
                    {p.title}
                  </h3>

                  <a
                    className="py-1 px-2 w-full m-auto text-center rounded-lg bg-[var(--common-green)] text-white font-semibold"
                    href="/order-now"
                  >
                    Buy Now
                  </a>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="flex justify-center">
          <Link to="/products">
            <p className="px-12 py-3 mt-10 text-white rounded-tr-3xl main-bg">
              View more
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default OurPrducts;
