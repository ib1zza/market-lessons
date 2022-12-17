import React from "react";
import { useProductsByIds } from "../hooks/products";
import { useAppSelector } from "../hooks/redux";
import Product from "../components/Product";
import { Link } from "react-router-dom";
import {
  useGetProductsFromCartQuery,
  useGetProductsFromFavouritesQuery,
} from "../store/services/ProductService";

const CartPage = () => {
  const { data: ids } = useGetProductsFromCartQuery(Infinity);
  const { data: Favourites } = useGetProductsFromFavouritesQuery(Infinity);
  const { data: Cart } = useGetProductsFromCartQuery(Infinity);

  // const ids: string[] = useAppSelector((state) => state.cartReducer.products);
  const { products, productsError, productsLoading } = useProductsByIds(
    "https://fakestoreapi.com/products",
    ids?.map((el) => String(el)) || []
  );
  return (
    <div className={"container mx-auto max-w-6xl"}>
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
          You dont add anything to your cart. Search for something new on our
          <Link
            className={"underline text-red-600 ml-2" + ""}
            to={"../products"}
          >
            Products Page
          </Link>
        </div>
      )}
      {products && (
        <div className={"flex pt-16"}>
          <div className={"flex flex-col w-2/3 mr-3"}>
            {products.map((el) => (
              <Product
                product={el}
                key={el.id}
                isLiked={Favourites?.includes(el.id) || false}
                isInCart={Cart?.includes(el.id) || false}
              />
            ))}
          </div>
          <div className={"rounded-2xl bg-gray-300 w-1/3"}>
            <h1 className={"text-3xl font-bold text-center"}>Buy</h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
