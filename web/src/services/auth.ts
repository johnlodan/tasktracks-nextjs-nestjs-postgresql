import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";

export const auth = createApi({
    reducerPath: 'auth',
    tagTypes: ['auth'],
    refetchOnReconnect: true,
    refetchOnFocus: true,
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.BASE_API,
    }),
    extractRehydrationInfo(action: any, { reducerPath }) {
        if (action.type === HYDRATE) {
            return action.payload[reducerPath];
        }
    },
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `auth/login`,
                method: 'POST',
                body: { ...data }
            }),
            invalidatesTags: ['auth'],
        }),
        register: builder.mutation({
            query: (data) => ({
                url: `auth/register`,
                method: 'POST',
                body: { ...data }
            }),
            invalidatesTags: ['auth'],
        }),
    }),
});

// Export hooks for usage in functional components
export const {
    useLoginMutation,
    useRegisterMutation,
    util: { getRunningQueriesThunk },
} = auth;

// export endpoints for use in SSR
export const { } = auth.endpoints;