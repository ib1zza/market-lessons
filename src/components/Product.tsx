import React, { useState } from "react";
import { IProduct, products } from "../data/products";

interface ProductProps {
  info: IProduct;
}

const Product: React.FC<ProductProps> = ({ info }) => {
  const [isDescriptionOpened, setIsDescriptionOpened] =
    useState<boolean>(false);

  const btnClassName =
    "py-2 px-4 border rounded" +
    " " +
    (isDescriptionOpened ? "bg-blue-400" : "bg-yellow-400");
  return (
    <div
      className={
        "border-2 py-2 px-4 rounded flex items-start mb-2 [&>:not(:last-child)]:mr-4"
      }
    >
      <div className={"w-1/4"}>
        <img src={info.image} className={""} alt={info.title} />
      </div>
      <div className={"w-1/2"}>
        <p>{info.title}</p>
        <p className={"font-bold"}>{info.price + "$"}</p>

        {isDescriptionOpened && (
          <div className={"w-full"}>
            <span className={"font-bold"}>{info.description}</span>
            <p>
              Rate:{" "}
              <span style={{ fontWeight: "bold" }}>{info.rating.rate}</span>
            </p>
          </div>
        )}
      </div>

      <button
        className={btnClassName}
        onClick={() => setIsDescriptionOpened(!isDescriptionOpened)}
      >
        {isDescriptionOpened ? "Hide description" : " Show description"}
      </button>
    </div>
  );
};

export default Product;
