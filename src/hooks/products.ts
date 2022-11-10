import { useEffect, useState } from "react";
import { IProduct } from "../data/products";
import axios, { AxiosError } from "axios";

export const useProducts = (link: string) => {
  const [error, setError] = useState("");
  const [products, setProducts] = useState<IProduct[]>([]);

  const [loading, setLoading] = useState<boolean>(false);

  async function fetchProducts() {
    try {
      setError("");
      setLoading(true);
      const response = await axios.get<IProduct[]>(link);
      setProducts(response.data);
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
  }, []);

  return { products, loading, error };
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
