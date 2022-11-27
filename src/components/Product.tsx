import React, { useCallback, useEffect, useState } from "react";
import { notFoundProduct } from "../data/products";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faHeart } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { addLike, removeLike } from "../store/reducers/LikesSlice";
import { addToCart, removeFromCart } from "../store/reducers/CartSlice";
import { useFetchProductQuery } from "../store/services/ProductService";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import IProduct from "../models/IProduct";
import { AppRoutes } from "../types/routes";

interface ProductProps {
  id: number;
}

const Product: React.FC<ProductProps> = ({ id }) => {
  const [product, setProduct] = useState<IProduct>(notFoundProduct);
  const [error, setError] = useState<
    FetchBaseQueryError | SerializedError | undefined
  >();
  const [isDescriptionOpened, setIsDescriptionOpened] =
    useState<boolean>(false);

  const {
    data: productFromFetch,
    isError,
    error: fetchError,
  } = useFetchProductQuery(id);

  useEffect(() => setError(fetchError), [fetchError]);
  useEffect(() => {
    setProduct(productFromFetch || notFoundProduct);
  }, [productFromFetch, error]);

  const liked = useAppSelector((state) => state.likesReducer.products);
  const inCart = useAppSelector((state) => state.cartReducer.products);
  const dispatch = useAppDispatch();

  const likeBtnCol = liked.includes(String(product.id))
    ? "bg-red-500 text-white"
    : "bg-gray-200 text-gray-700";

  const cartBtnCol = inCart.includes(String(product.id))
    ? "bg-red-500 text-white"
    : "bg-gray-200 text-gray-700";

  const likesHandler = useCallback(() => {
    if (!liked.includes(String(product.id))) {
      dispatch(addLike(String(product.id)));
      console.log(product.id + "added");
    } else {
      dispatch(removeLike(String(product.id)));
      console.log(product.id + "removed");
    }
  }, [liked, product]);

  const cartHandler = useCallback(() => {
    if (!inCart.includes(String(product.id))) {
      dispatch(addToCart(String(product.id)));
      console.log(product.id + "added");
    } else {
      dispatch(removeFromCart(String(product.id)));
      console.log(product.id + "removed");
    }
  }, [inCart, product]);

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
        <Link to={`${AppRoutes.allProductsPage}/${product.id}`}>
          <img src={product.image} className={""} alt={product.title} />
        </Link>
      </div>
      <div className={"w-1/2"}>
        <p>{product.title}</p>
        <p className={"font-bold"}>{product.price + "$"}</p>

        {isDescriptionOpened && (
          <div className={"w-full"}>
            <span className={"font-bold"}>{product.description}</span>
            <p>
              Rate:{" "}
              <span style={{ fontWeight: "bold" }}>{product.rating.rate}</span>
            </p>
          </div>
        )}
      </div>
      <div className={"flex flex-col items-center"}>
        <button
          className={btnClassName}
          onClick={() => setIsDescriptionOpened(!isDescriptionOpened)}
        >
          {isDescriptionOpened ? "Hide description" : " Show description"}
        </button>
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
