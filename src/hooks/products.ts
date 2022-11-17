import { useEffect, useState } from "react";
import { IProduct, notFoundProduct } from "../data/products";
import axios, { AxiosError } from "axios";

export const useProducts = (link: string) => {
  const [productsError, setProductsError] = useState("");
  const [products, setProducts] = useState<IProduct[]>([]);

  const [productsLoading, setProductsLoading] = useState<boolean>(true);

  async function fetchProducts() {
    try {
      setProductsError("");
      setProductsLoading(true);
      const response = await axios.get<IProduct[]>(link);
      setProducts(response.data);
    } catch (e) {
      const error = e as AxiosError;
      console.log(error.message);
      setProductsError(error.message);
    } finally {
      setProductsLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, productsLoading, productsError };
};

export const useProductsByIds = (link: string, ids: Array<string>) => {
  const [productsError, setProductsError] = useState("");
  const [products, setProducts] = useState<IProduct[]>([]);
  const [productsLoading, setProductsLoading] = useState<boolean>(true);

  async function fetchProducts() {
    try {
      setProductsError("");
      setProductsLoading(true);
      Promise.allSettled(
        ids.map((el) => axios.get<IProduct>(link + "/" + el))
      ).then((results) => {
        setProducts(
          results
            .filter((el) => el.status === "fulfilled")
            .map((el) =>
              el.status === "fulfilled" ? el.value.data : notFoundProduct
            )
        );
      });
    } catch (e) {
      const error = e as AxiosError;
      console.log(error.message);
      setProductsError(error.message);
    } finally {
      // setProductsLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
    setProductsLoading(false);
  }, [link, ids]);

  return { products, productsLoading, productsError };
};

export const useProduct = (link: string) => {
  const [error, setError] = useState("");
  const [product, setProduct] = useState<IProduct>();

  const [loading, setLoading] = useState<boolean>(true);

  async function fetchProducts() {
    try {
      setError("");
      setLoading(true);
      const response = await axios.get<IProduct>(link);
      setProduct(response.data);
    } catch (e) {
      const error = e as AxiosError;
      console.log(error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, [link]);

  return { product, loading, error };
};

export const useSort = (mas: IProduct[]) => {
  const [sortedProducts, setSortedProducts] = useState<IProduct[]>([]);
  const [query, setQuery] = useState("");
  const [priseMin, setPriseMin] = useState<number>(0);
  const [priseHigh, setPriseHigh] = useState<number>(0);

  useEffect(() => {
    setSortedProducts(
      mas.filter(
        (el) =>
          el.price >= priseMin &&
          (!priseHigh || el.price <= priseHigh) &&
          (!query || el.title.toLowerCase().includes(query.toLowerCase()))
      )
    );
  }, [priseMin, priseHigh, query, mas]);

  return {
    query,
    priseMin,
    priseHigh,
    setQuery,
    setPriseHigh,
    setPriseMin,
    sortedProducts,
  };
};

// export const useFetch = (url: string) => {
//   const [error, setError] = useState<string>("");
//   const [data, setData] = useState();
//
//   async function fetch() {
//     setError("");
//     const response = await axios.get(url);
//     setData(response.data);
//   }
//   try {
//     fetch();
//   } catch (e) {
//     const error = e as AxiosError;
//     setError(error.message);
//   }
//
//   return { data, error };
// };
