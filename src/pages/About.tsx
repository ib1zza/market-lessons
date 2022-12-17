import React from "react";
import Product from "../components/Product";
import {
  useFetchProductQuery,
  useGetProductsFromCartQuery,
  useGetProductsFromFavouritesQuery,
} from "../store/services/ProductService";
const About = () => {
  // const { data: products, isLoading } = useFetchAllProductsQuery(5);
  const { data, isLoading } = useFetchProductQuery(11);
  const { data: Favourites } = useGetProductsFromFavouritesQuery(Infinity);
  const { data: Cart } = useGetProductsFromCartQuery(Infinity);

  return (
    <div>
      <h1 className={"font-bold text-2xl"}>this is about page</h1>
      {isLoading && (
        <h1 className={"font-bold text-2xl text-red-600"}>Loading</h1>
      )}
      {data && (
        <div>
          <Product
            product={data}
            key={data.id}
            isLiked={Favourites?.includes(data.id) || false}
            isInCart={Cart?.includes(data.id) || false}
          />
        </div>
      )}
    </div>
  );
};

export default About;
