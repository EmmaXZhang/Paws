import { PRODUCTS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // GET All products
    getProducts: builder.query({
      // use redux toolkit to send get query to PRODUCTS_URL -> "/api/products"
      query: () => ({
        url: PRODUCTS_URL,
      }),
      // Store unused data for 5 second
      keepUnusedDataFor: 5,
    }),

    // GET ONE product
    getProductDetails: builder.query({
      // use redux toolkit to send get query to PRODUCTS_URL -> "/api/products/:id"
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetProductsQuery, useGetProductDetailsQuery } =
  productsApiSlice;
