import React from "react";
import { useProductsByIds } from "../hooks/products";
import { useAppSelector } from "../hooks/redux";
import Product from "../components/Product";
import { Link } from "react-router-dom";
import {
  useGetProductsFromCartQuery,
  useGetProductsFromFavouritesQuery,
} from "../store/services/ProductService";

const FavouritesPage = () => {
  const { data: ids } = useGetProductsFromFavouritesQuery(Infinity);
  const { data: Favourites } = useGetProductsFromFavouritesQuery(Infinity);
  const { data: Cart } = useGetProductsFromCartQuery(Infinity);
  // const ids: string[] = useAppSelector((state) => state.likesReducer.products);
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
        <Product
          product={el}
          key={el.id}
          isLiked={Favourites?.includes(el.id) || false}
          isInCart={Cart?.includes(el.id) || false}
        />
      ))}
    </div>
  );
};

export default FavouritesPage;
