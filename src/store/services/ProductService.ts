import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import IProduct from "../../models/IProduct";

const baseQuery = "https://637b3dc210a6f23f7fa31124.mockapi.io";
export const productAPI = createApi({
  reducerPath: "productAPI",
  baseQuery: fetchBaseQuery({ baseUrl: baseQuery }),
  endpoints: (build) => ({
    fetchAllProducts: build.query<IProduct[], number>({
      query: (limit) => ({
        url: "/products",
        params: {
          page: 1,
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
