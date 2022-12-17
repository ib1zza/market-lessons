import React, { useCallback, useEffect, useState } from "react";
import { notFoundProduct } from "../data/products";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faHeart } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { addLike, removeLike } from "../store/reducers/LikesSlice";
import {
  useAddToCartMutation,
  useFetchProductQuery,
  useGetProductsFromCartQuery,
  useRemoveFromCartMutation,
  useAddToFavouritesMutation,
  useRemoveFromFavouritesMutation,
} from "../store/services/ProductService";
import IProduct from "../models/IProduct";
import { AppRoutes } from "../types/routes";

interface ProductProps {
  product: IProduct;
  isLiked: boolean;
  isInCart: boolean;
}

const Product: React.FC<ProductProps> = ({ product, isInCart, isLiked }) => {
  const [addToCart, { error }] = useAddToCartMutation();
  const [removeFromCart, { error: removeeroor }] = useRemoveFromCartMutation();

  const [addToFavourites] = useAddToFavouritesMutation();
  const [removeFromFavourites] = useRemoveFromFavouritesMutation();

  const likeBtnCol = isLiked
    ? "bg-red-500 text-white"
    : "bg-gray-200 text-gray-700";

  const cartBtnCol = isInCart
    ? "bg-red-500 text-white"
    : "bg-gray-200 text-gray-700";

  const likesHandler = useCallback(() => {
    if (!isLiked) {
      addToFavourites(product.id);
      console.log(product.id + "added");
    } else {
      removeFromFavourites(product.id);
      console.log(product.id + "removed");
    }
  }, [isLiked, product]);
  const cartHandler = useCallback(() => {
    if (!isInCart) {
      addToCart(product.id);
      console.log(product.id + "added");
    } else {
      removeFromCart(product.id);
      console.log(product.id + "removed");
    }
  }, [isInCart, product]);

  return (
    <div
      className={
        "w-full border-2 py-2 px-4 rounded flex items-start mb-2 [&>:not(:last-child)]:mr-4 justify-between"
      }
    >
      <div className={"w-1/4"}>
        <Link to={`${AppRoutes.allProductsPage}/${product.id}`}>
          <img src={product.image} className={""} alt={product.title} />
        </Link>
      </div>
      <div className={"w-1/2"}>
        <p className={"font-bold"}>{product.title}</p>
        <p className={"font-bold"}>{product.price + "$"}</p>

        <div className={"w-full"}>
          <span>{product.description}</span>
          <p>
            Rate:{" "}
            <span style={{ fontWeight: "bold" }}>{product.rating.rate}</span>
          </p>
        </div>
      </div>
      <div
        className={
          "flex flex-col items-center justify-self-end [&>:not(:last-child)]:mb-2"
        }
      >
        <button
          className={"flex items-center p-3 rounded-full " + likeBtnCol}
          onClick={likesHandler}
        >
          <FontAwesomeIcon icon={faHeart} />
        </button>
        <button
          className={"flex items-center p-3 rounded-full " + cartBtnCol}
          onClick={cartHandler}
        >
          <FontAwesomeIcon icon={faCartShopping} />
        </button>
      </div>
    </div>
  );
};

export default Product;
