// import { PRODUCTS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // GET All products
    getProducts: builder.query({
      // use redux toolkit to send get query to PRODUCTS_URL -> "/api/products"
      query: () => ({
        url: `/api/products`,
      }),
      // Store unused data for 5 second
      keepUnusedDataFor: 5,
    }),

    // GET products by category
    getProductsByCategory: builder.query({
      // Define query function with category parameter
      query: (petCategory) => ({
        url: `/api/products`,
        //giving query string
        params: { petCategory },
      }),
      keepUnusedDataFor: 5,
    }),

    // GET ONE product
    getProductDetails: builder.query({
      // use redux toolkit to send get query to PRODUCTS_URL -> "/api/products/:id"
      query: (productId) => ({
        url: `/api/products/${productId}`,
      }),
      keepUnusedDataFor: 5,
    }),

    // CREAT product
    createProduct: builder.mutation({
      // query: (product) => ({
      //   url: `/api/products/new`,
      //   method: "POST",
      //   body: { ...product },
      // }),
      query: () => ({
        url: `/api/products/new`,
        method: "POST",
      }),
      //ensure that any cached data associated with tags is refreshed or removed from the cache
      invalidatesTags: ["Product"],
    }),

    // UPDATE product
    updateProduct: builder.mutation({
      query: (product) => ({
        url: `/api/products/${product._id}`,
        method: "PUT",
        body: product,
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductsByCategoryQuery,
  useGetProductDetailsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
} = productsApiSlice;
