import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const productsApi = createApi({
//   reducerPath: "productsApi",
//   baseQuery: fetchBaseQuery({ baseUrl: "https://fakestoreapi.com" }),
//   endpoints: (build: any) => ({
//     getAllProducts: build.query({
//       query: () => {
//         "/products";
//       },
//     }),
//     addToCart: build.mutation({
//       query: (body: { id: number }) => ({
//         url: "/cart",
//         method: "POST",
//         body,
//       }),
//     }),
//     getProductsFromCart: build.query({
//       query: () => {
//         "/cart";
//       },
//     }),
//   }),
// });

// export const {
//   useGetAllProductsQuery,
//   useGetProductsFromCartQuery,
//   useAddToCartMutation,
// } = productsApi;
