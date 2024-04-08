import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// parent of other api

import { BASE_URL } from "../constants";

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

export const apiSlice = createApi({
  baseQuery,
  //Type of data fecth
  tagTypes: ["Product", "Order", "User"],
  endpoints: (builder) => ({}),
});
