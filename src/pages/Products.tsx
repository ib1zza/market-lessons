import React, { useCallback, useEffect, useState } from "react";
import Product from "../components/Product";
import { useProducts, useSort } from "../hooks/products";
import SearchBar from "../UI/SearchBar";
import Input from "../UI/Input";
import { useFetchAllProductsQuery } from "../store/services/ProductService";
import IProduct from "../models/IProduct";

const Products = () => {
  // const { productsLoading, products, productsError } = useProducts(
  //   "https://fakestoreapi.com/products?limit=50"
  // );
  const [currentData, setCurrentData] = useState<IProduct[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState("");

  const {
    isLoading,
    isError,
    refetch,
    currentData: fetchdatacurrent,
  } = useFetchAllProductsQuery(currentPage * 5 <= 20 ? currentPage * 5 : 20);

  // const {
  //   query,
  //   priseMin,
  //   priseHigh,
  //   setQuery,
  //   setPriseHigh,
  //   setPriseMin,
  //   sortedProducts,
  // } = useSort(currentData);

  //при монтировании компонента начинаем запрос на получение данных о первой странице
  useEffect(() => {
    setFetching(true);
  }, []);

  const scrollHandler = useCallback((e: any) => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
      100
    ) {
      console.log("scroll");
      setFetching(true);
    }
  }, []);

  // useEffect(() => {
  //   if (fetchdatacurrent) setCurrentData(fetchdatacurrent);
  // }, [fetchdatacurrent]);

  useEffect(() => {
    if (fetching) {
      console.log("fetching " + currentPage * 5);

      refetch()
        .then((res) => {
          setCurrentPage((prev) => (prev > 4 ? 4 : ++prev));
          return res;
        })
        .then((res) => {
          if (res.data) {
            setFetching(false);
            setCurrentData(res.data);
          }
        });
    }
  }, [fetching]);

  useEffect(() => console.log(error), [error]);

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);
    return function () {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  if (!currentData && !isLoading) {
    return null;
  }

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
          {currentData &&
            currentData.map((el) => <Product id={el.id} key={el.id} />)}
          {fetching && (
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
