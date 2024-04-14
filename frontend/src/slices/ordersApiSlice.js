import { apiSlice } from "./apiSlice";

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: "/api/orders",
        method: "POST",
        //spread the properties of the order object. create a copy of order
        body: { ...order },
      }),
    }),
    getOrderById: builder.query({
      query: (orderId) => ({
        url: `/api/orders/${orderId}`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useCreateOrderMutation, useGetOrderByIdQuery } = ordersApiSlice;
