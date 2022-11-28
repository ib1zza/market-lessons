import React, { useEffect, useState } from "react";
import { IProduct } from "../data/products";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Button from "../UI/Button";
import { useProducts, useProduct } from "../hooks/products";
import "../css/_ibg.scss";
import { Link, useParams } from "react-router-dom";

const ProductPage: React.FC = () => {
  const { id } = useParams();
  const { loading, product, error } = useProduct(
    `https://fakestoreapi.com/products/${id}`
  );

  const [similarProducts, setSimilarProducts] = useState<IProduct[]>([]);
  const { products } = useProducts(
    "https://fakestoreapi.com/products?limit=20"
  );

  useEffect(() => {
    if (!error && product && !loading) {
      setSimilarProducts(
        products
          .filter(
            (el) => el.category === product.category && el.id !== product.id
          )
          .slice(0, 5)
      );
    }
  }, [products, loading, product]);

  return (
    <div>
      {loading && (
        <div className={"text-3xl text-red-500 font-bold text-center"}>
          Loading...
        </div>
      )}

      {error && (
        <div className={"text-3xl text-red-500 font-bold text-center"}>
          An error occurred: {error}
        </div>
      )}

      {product && !loading && (
        <>
          <div className="container mx-auto max-w-6xl justify-between [&>:not(:last-child)]:mr-10 flex pt-16">
            <div className={"w-1/4"}>
              <img
                className={"w-full"}
                src={product.image}
                alt={product.title}
              />
            </div>

            <div className={"w-1/2"}>
              <h1 className={"font-bold text-2xl mb-4"}>{product.title}</h1>
              <p className={"mb-2"}>{product.description}</p>
              <p className={"text-black"}>
                Rating: {product.rating.rate} <FontAwesomeIcon icon={faStar} />
              </p>
              <div className={"text-sm"}>
                based on {product.rating.count} rates.
              </div>
            </div>

            <div className="flex flex-col w-1/6">
              <div className={"font-bold text-3xl mb-4"}>
                {product.price + "$"}
              </div>
              <Button className={"w-full "}>Buy now!</Button>
            </div>
          </div>
          <div className={"container mx-auto  max-w-6xl pt-16"}>
            <h1 className={"font-bold text-2xl text-center mb-8"}>See more:</h1>
            <div className={"flex justify-start [&>:not(:last-child)]:mr-[4%]"}>
              {similarProducts.map((el) => (
                <div
                  className={
                    "w-1/6 flex flex-col border-2  rounded-xl overflow-hidden justify-between p-2  "
                  }
                  key={el.id}
                >
                  <div>
                    <Link to={`../products/${el.id}`}>
                      <div
                        className="h-48 ibg"
                        style={{ backgroundImage: `url(${el.image})` }}
                      />

                      <h1>
                        {el.title.length > 40
                          ? el.title.slice(0, 40) + "..."
                          : el.title}
                      </h1>
                    </Link>
                  </div>
                  <div className={"flex justify-between items-center mt-2"}>
                    <Button>Add to cart</Button>
                    <p className={"font-bold text-xl "}>
                      {Math.floor(el.price) + "$"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductPage;
