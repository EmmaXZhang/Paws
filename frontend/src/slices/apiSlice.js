/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const BASE_URL = process.env.NODE_ENV === "development" ? "http://localhost:5173" : "";
// parent of other api

// import { BASE_URL } from "../constants";

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

export const apiSlice = createApi({
  baseQuery,
  //Type of data fecth
  tagTypes: ["Product", "Order", "User"],
  endpoints: (builder) => ({}),
});
