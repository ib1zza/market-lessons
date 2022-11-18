import React from "react";
import Product from "../components/Product";
import {
  useFetchAllProductsQuery,
  useFetchProductQuery,
} from "../store/services/ProductService";
const About = () => {
  // const { data: products, isLoading } = useFetchAllProductsQuery(5);
  const { data: products, isLoading } = useFetchProductQuery(11);

  console.log(products);
  return (
    <div>
      <h1 className={"font-bold text-2xl"}>this is about page</h1>
      {isLoading && (
        <h1 className={"font-bold text-2xl text-red-600"}>Loading</h1>
      )}
      {products && (
        <div>
          {/*{products.map((el) => (*/}
          {/*  <Product product={el} key={el.id} />*/}
          {/*))}*/}
          <Product product={products} />
        </div>
      )}
    </div>
  );
};

export default About;
