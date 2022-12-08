import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://fakestoreapi.com" }),
  endpoints: (build: any) => ({
    getAllProducts: build.query({
      query: () => {
        "/products";
      },
    }),
  }),
});

export const { useGetAllProductsQuery } = productsApi;
