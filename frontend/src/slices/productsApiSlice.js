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
      provideTags: ["Product"],
    }),

    // GET products by category
    getProductsByCategory: builder.query({
      // Define query function with category parameter
      query: (petCategory) => ({
        url: `/api/products`,
        //giving query string
        params: { petCategory },
      }),
      provideTags: ["Product"],
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
      query(product) {
        return {
          url: `/api/products/new`,
          method: "POST",
          body: { ...product },
        };
      },
      //ensure that any cached data associated with tags is refreshed or removed from the cache
      // don't need to refresh page then can get up to date data
      invalidatesTags: ["Product"],
    }),

    // UPDATE product
    updateProduct: builder.mutation({
      query: (product) => ({
        // productId coming from productId passed from frontend page
        url: `/api/products/${product.productId}`,
        method: "PUT",
        body: product,
      }),
      invalidatesTags: ["Product"],
    }),

    uploadProductImage: builder.mutation({
      query: (data) => ({
        url: `/api/images/upload`,
        method: "POST",
        body: data,
      }),
    }),

    deleteProduct: builder.mutation({
      query: (productId) => ({
        // productId coming from productId passed from frontend page
        url: `/api/products/${productId}`,
        method: "DELETE",
      }),
    }),

    deleteProductImage: builder.mutation({
      query: (cloudinaryId) => ({
        url: `/api/images/${cloudinaryId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductsByCategoryQuery,
  useGetProductDetailsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useUploadProductImageMutation,
  useDeleteProductMutation,
  useDeleteProductImageMutation,
} = productsApiSlice;
