import React from "react";
import { products } from "../../constants/data";
import { numberFormatter } from "../../utils/utils";

function ProductsList({ category }) {
  return (
    <div className="grid flex-1 grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((p, i) =>
        category !== undefined &&
        p.title.toLocaleLowerCase().includes(category) ? (
          <a href="/order-now">
            <div key={i} className="pt-6 bg-white border rounded-xl">
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
        ) : (
          category !== undefined &&
          category === "all" && (
            <a href="/order-now">
              <div key={i} className="pt-6 bg-white border rounded-xl">
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
          )
        )
      )}
    </div>
  );
}

export default ProductsList;
