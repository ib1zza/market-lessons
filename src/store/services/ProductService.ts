import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import IProduct from "../../models/IProduct";

export const productAPI = createApi({
  reducerPath: "productAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "https://fakestoreapi.com" }),
  endpoints: (build) => ({
    fetchAllProducts: build.query<IProduct[], number>({
      query: (limit = 5) => ({
        url: "/products",
        params: {
          limit: limit,
        },
      }),
    }),
    fetchProduct: build.query<IProduct, number>({
      query: (id: number) => ({
        url: `/products/${id}`,
        params: {},
      }),
    }),
  }),
});

export const { useFetchAllProductsQuery, useFetchProductQuery } = productAPI;
