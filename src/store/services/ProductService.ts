import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import IProduct from "../../models/IProduct";

const baseQuery = "http://localhost:3001";

const tagTypes = ["Products", "Cart", "Favourites"];
export const productAPI = createApi({
  reducerPath: "productAPI",
  tagTypes: tagTypes,
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
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }: { id: number }) => ({
                type: "Products",
                id,
              })),
              { type: "Products" as const, id: "LIST" },
            ]
          : [{ type: "Products" as const, id: "LIST" }],
    }),
    fetchProduct: build.query<IProduct, number>({
      query: (id: number) => ({
        url: `/products/${id}`,
      }),
    }),
    addToCart: build.mutation({
      query: (id: number) => ({
        url: "/cart",
        method: "POST",
        body: {
          id,
        },
      }),
      invalidatesTags: [{ type: "Cart" as const, id: "LIST" }],
    }),

    getProductsFromCart: build.query<number[], number>({
      query: (limit) => ({
        url: "/cart",
        params: {
          page: 1,
          limit: limit,
        },
      }),
      transformResponse: (res: Array<{ id: number }>): number[] => {
        return res.map((el) => el.id);
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map((id: number) => ({
                type: "Cart",
                id,
              })),
              { type: "Cart" as const, id: "LIST" },
            ]
          : [{ type: "Cart" as const, id: "LIST" }],
    }),

    removeFromCart: build.mutation({
      query: (id: number) => ({
        url: `/cart/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Cart" as const, id: "LIST" }],
    }),

    addToFavourites: build.mutation({
      query: (id: number) => ({
        url: "/favourites",
        method: "POST",
        body: {
          id,
        },
      }),
      invalidatesTags: [{ type: "Favourites" as const, id: "LIST" }],
    }),

    getProductsFromFavourites: build.query<number[], number>({
      query: (limit) => ({
        url: "/favourites",
        params: {
          page: 1,
          limit: limit,
        },
      }),

      transformResponse: (res: Array<{ id: number }>): number[] => {
        return res.map((el) => el.id);
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map((id: number) => ({
                type: "Favourites",
                id,
              })),
              { type: "Favourites" as const, id: "LIST" },
            ]
          : [{ type: "Favourites" as const, id: "LIST" }],
    }),

    removeFromFavourites: build.mutation({
      query: (id: number) => ({
        url: `/favourites/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Favourites" as const, id: "LIST" }],
    }),
  }),
});

export const {
  useFetchAllProductsQuery,
  useFetchProductQuery,
  useGetProductsFromCartQuery,
  useAddToCartMutation,
  useRemoveFromCartMutation,
  useAddToFavouritesMutation,
  useRemoveFromFavouritesMutation,
  useGetProductsFromFavouritesQuery,
} = productAPI;
