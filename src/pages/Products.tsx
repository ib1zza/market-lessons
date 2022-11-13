import React, { useEffect, useState } from "react";
import Product from "../components/Product";
import { useProducts } from "../hooks/products";
import SearchBar from "../UI/SearchBar";
import Input from "../UI/Input";
import { IProduct } from "../data/products";

const Products = () => {
  const [query, setQuery] = useState("");
  const [priseMin, setPriseMin] = useState<number>(1);
  const [priseHigh, setPriseHigh] = useState<number>(0);
  const { loading, products, error } = useProducts(
    "https://fakestoreapi.com/products?limit=5"
  );
  const [sortedProducts, setSortedProducts] = useState<IProduct[]>([]);
  const getSorted = () => {
    return products.filter(
      (el) =>
        el.price >= priseMin &&
        (!priseHigh || el.price <= priseHigh) &&
        (!query || el.title.toLowerCase().includes(query.toLowerCase()))
    );
  };

  useEffect(() => {
    const n = getSorted();
    setSortedProducts(n);
  }, [priseMin, priseHigh, query, products]);

  return (
    <div className={"container mx-auto max-w-6xl pt-5 flex justify-between"}>
      {loading && (
        <div className={"font-bold text-2xl text-center"}>
          loading please wait
        </div>
      )}
      {error && <p className={"text-center text-red-600"}>{error}</p>}
      <div className={"container max-w-2xl pt-5"}>
        {sortedProducts.map((el) => (
          <Product info={el} key={el.id} />
        ))}
      </div>
      <div
        className={"container pt-5 max-w-2xl [&>:not(:last-child)]:mb-4 px-4"}
      >
        <SearchBar value={query} onChange={(e) => setQuery(e.target.value)} />
        <div
          className={
            "flex-col [&>:not(:last-child)]:mr-4 [&>:not(:last-child)]:mb-4"
          }
        >
          <div className={"flex items-center "}>
            <span className={"w-12"}>from:</span>
            <Input
              type={"text"}
              placeholder={"Min price"}
              value={priseMin}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPriseMin(Number(e.target.value) || priseMin)
              }
            />
          </div>

          <div className={"flex items-center"}>
            <span className={"w-12"}>to:</span>
            <Input
              type={"text"}
              placeholder={"Max price"}
              value={priseHigh}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPriseHigh(Number(e.target.value) || priseHigh)
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
