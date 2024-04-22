import React from "react";
import { products } from "../../constants/data";
import { numberFormatter } from "../../utils/utils";

function ProductsList() {
  return (
    <div className="grid flex-1 grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((p, i) => (
        <div key={i} className="pt-6 bg-white border rounded-xl">
          <img
            src={p.image}
            alt={p.title}
            className="aspect-[3/2] object-contain"
          />
          <div className="p-3 text-sm ">
            <h3 className="mt-3 font-medium line-clamp-1">{p.title}</h3>
            <p className="font-medium main-color">
              KES. {numberFormatter(p.price)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductsList;
