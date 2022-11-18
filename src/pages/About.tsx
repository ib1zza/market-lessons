import React from "react";
import Product from "../components/Product";
import { useFetchAllProductsQuery } from "../store/services/ProductServise";
const About = () => {
  const { data: products, isLoading } = useFetchAllProductsQuery(5);
  console.log(products);
  return (
    <div>
      <h1 className={"font-bold text-2xl"}>this is about page</h1>
      {isLoading && (
        <h1 className={"font-bold text-2xl text-red-600"}>Loading</h1>
      )}
      {products && (
        <div>
          {products.map((el) => (
            <Product product={el} key={el.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default About;
