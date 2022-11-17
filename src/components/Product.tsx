import React, { useState } from "react";
import { IProduct } from "../data/products";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faHeart } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { addLike, removeLike } from "../store/reducers/LikesSlice";
import { addToCart, removeFromCart } from "../store/reducers/CartSlice";

interface ProductProps {
  product: IProduct;
}

const Product: React.FC<ProductProps> = ({ product }) => {
  const liked = useAppSelector((state) => state.likesReducer.products);
  const inCart = useAppSelector((state) => state.cartReducer.products);
  const dispatch = useAppDispatch();
  const likeBtnCol = liked.includes(String(product.id))
    ? "bg-red-500 text-white"
    : "bg-gray-100 text-gray-700";

  const cartBtnCol = inCart.includes(String(product.id))
    ? "bg-red-500 text-white"
    : "bg-gray-100 text-gray-700";

  const likesHandler = () => {
    if (!liked.includes(String(product.id))) {
      dispatch(addLike(String(product.id)));
      console.log(product.id + "added");
    } else {
      dispatch(removeLike(String(product.id)));
      console.log(product.id + "removed");
    }
  };

  const cartHandler = () => {
    if (!inCart.includes(String(product.id))) {
      dispatch(addToCart(String(product.id)));
      console.log(product.id + "added");
    } else {
      dispatch(removeFromCart(String(product.id)));
      console.log(product.id + "removed");
    }
  };
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
        <Link to={`${product.id}`}>
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
          className={
            "flex items-center p-3 bg-red-400 rounded-full " + likeBtnCol
          }
          onClick={likesHandler}
        >
          {/*<span className={"mr-2"}>like</span>*/}
          <FontAwesomeIcon icon={faHeart} />
        </button>
        <button
          className={
            "flex items-center p-3 bg-red-400 rounded-full " + cartBtnCol
          }
          onClick={cartHandler}
        >
          {/*<span className={"mr-2"}>like</span>*/}
          <FontAwesomeIcon icon={faCartShopping} />
        </button>
      </div>
    </div>
  );
};

export default Product;
