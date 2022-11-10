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
    <div className={"border py-2 px-4 rounded flex flex-col items-center mb-2"}>
      <img src={info.image} className={"w-1/6"} alt={info.title} />
      <p>{info.title}</p>
      <button
        className={btnClassName}
        onClick={() => setIsDescriptionOpened(!isDescriptionOpened)}
      >
        {isDescriptionOpened ? "Hide description" : " Show description"}
      </button>
      {isDescriptionOpened && (
        <div>
          <span className={"font-bold"}>{info.description}</span>
          <p>
            Rate: <span style={{ fontWeight: "bold" }}>{info.rating.rate}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default Product;
