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
  }),
});

export const { useCreateOrderMutation } = ordersApiSlice;
