import React from "react";
import Product from "../components/Product";
import { useProducts } from "../hooks/products";

const Products = () => {
  const { loading, products, error } = useProducts(
    "https://fakestoreapi.com/products?limit=5"
  );
  return (
    <div className={"container mx-auto max-w-2xl pt-5"}>
      {loading && (
        <div className={"font-bold text-2xl text-center"}>
          loading please wait
        </div>
      )}
      {error && <p className={"text-center text-red-600"}>{error}</p>}
      {products.map((el) => (
        <Product info={el} key={el.id} />
      ))}
    </div>
  );
};

export default Products;
