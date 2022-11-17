import React from "react";
import { useProductsByIds } from "../hooks/products";
import { useAppSelector } from "../hooks/redux";
import Product from "../components/Product";
import { Link } from "react-router-dom";

const CartPage = () => {
  const ids: string[] = useAppSelector((state) => state.cartReducer.products);
  const { products, productsError, productsLoading } = useProductsByIds(
    "https://fakestoreapi.com/products",
    ids
  );
  return (
    <div>
      {productsLoading && (
        <div
          className={
            "w-full text-2xl h-screen flex items-center justify-center"
          }
        >
          loading please wait
        </div>
      )}
      {!productsLoading && !products.length && (
        <div
          className={
            "w-full text-2xl h-screen flex items-center justify-center"
          }
        >
          You dont add anything to favourites. Search for something new on our
          <Link
            className={"underline text-red-600 ml-2" + ""}
            to={"../products"}
          >
            Products Page
          </Link>
        </div>
      )}
      {products.map((el) => (
        <Product product={el} key={el.id} />
      ))}
    </div>
  );
};

export default CartPage;
