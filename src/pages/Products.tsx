import React, { useCallback, useEffect, useState } from "react";
import Product from "../components/Product";
import { useProducts, useSort } from "../hooks/products";
import SearchBar from "../UI/SearchBar";
import Input from "../UI/Input";
import { useFetchAllProductsQuery } from "../store/services/ProductService";
import IProduct from "../models/IProduct";

const Products = () => {
  const [currentData, setCurrentData] = useState<IProduct[]>([]);
  const [currentPage, setCurrentPage] = useState(0);

  const [error, setError] = useState("");

  const {
    isLoading,
    isError,
    refetch,
    currentData: fetchdatacurrent,
    data,
    isFetching,
  } = useFetchAllProductsQuery(currentPage * 5);

  useEffect(() => {}, [isFetching]);

  //при монтировании компонента начинаем запрос на получение данных о первой странице
  useEffect(() => {
    setCurrentPage((prevState) => prevState + 1);
  }, []);

  const scrollHandler = (e: any) => {
    if (isFetching) return;
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
      100
    ) {
      setCurrentPage((prevState) =>
        prevState > 4 ? prevState : prevState + 1
      );
    }
  };

  useEffect(() => console.log(error), [error]);

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);
    return function () {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, [isFetching]);

  return (
    <>
      <div className={"container mx-auto max-w-6xl pt-5 flex justify-between"}>
        {isLoading && (
          <div className={"font-bold text-2xl text-center w-full"}>
            loading please wait
          </div>
        )}
        {isError && <p className={"text-center text-red-600"}>{"Error"}</p>}
        <div className={"container max-w-2xl pt-5"}>
          {data && data.map((el) => <Product product={el} key={el.id} />)}
          {isLoading && (
            <div className={"font-bold text-2xl text-center w-full"}>
              loading please wait
            </div>
          )}
        </div>
        {/*<div*/}
        {/*  className={"container pt-5 max-w-2xl [&>:not(:last-child)]:mb-4 px-4"}*/}
        {/*>*/}
        {/*  <SearchBar value={query} onChange={(e) => setQuery(e.target.value)} />*/}
        {/*  <div*/}
        {/*    className={*/}
        {/*      "flex-col [&>:not(:last-child)]:mr-4 [&>:not(:last-child)]:mb-4"*/}
        {/*    }*/}
        {/*  >*/}
        {/*    <div className={"flex items-center "}>*/}
        {/*      <span className={"w-12"}>from:</span>*/}
        {/*      <Input*/}
        {/*        type={"text"}*/}
        {/*        placeholder={"Min price"}*/}
        {/*        value={priseMin}*/}
        {/*        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>*/}
        {/*          setPriseMin(Number(e.target.value) || 0)*/}
        {/*        }*/}
        {/*      />*/}
        {/*    </div>*/}

        {/*    <div className={"flex items-center"}>*/}
        {/*      <span className={"w-12"}>to:</span>*/}
        {/*      <Input*/}
        {/*        type={"text"}*/}
        {/*        placeholder={"Max price"}*/}
        {/*        value={priseHigh}*/}
        {/*        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>*/}
        {/*          setPriseHigh(Math.abs(Number(e.target.value)) || 0)*/}
        {/*        }*/}
        {/*      />*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</div>*/}
      </div>
    </>
  );
};

export default Products;
