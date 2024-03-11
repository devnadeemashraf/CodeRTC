import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001/api/v1",
  }),
  endpoints: (builder) => ({
    setAuthStatus: builder.query({
      query: () => ({
        url: "/auth/user/auth-status",
        method: "GET",
      }),
    }),
  }),
});

export const { useSetAuthStatusQuery } = userApi;
