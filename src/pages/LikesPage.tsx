import React from "react";
import { useProductsByIds } from "../hooks/products";
import { useAppSelector } from "../hooks/redux";
import Product from "../components/Product";

const LikesPage = () => {
  const ids: string[] = useAppSelector((state) => state.likesReducer.products);
  const { products, productsError, productsLoading } = useProductsByIds(
    "https://fakestoreapi.com/products",
    ids
  );
  return (
    <div>
      {products.map((el) => (
        <Product product={el} key={el.id} />
      ))}
    </div>
  );
};

export default LikesPage;
