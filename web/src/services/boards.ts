import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";
import baseQueryWithAuth from "../lib/preparedHeaders";

export const boards = createApi({
    reducerPath: 'boards',
    tagTypes: ['boards'],
    refetchOnReconnect: true,
    refetchOnFocus: true,
    baseQuery: baseQueryWithAuth,
    extractRehydrationInfo(action: any, { reducerPath }) {
        if (action.type === HYDRATE) {
            return action.payload[reducerPath];
        }
    },
    endpoints: (builder) => ({
        getBoards: builder.query({
            query: (query) => ({
                url: `boards`,
                method: 'GET',
            }),
            providesTags: ['boards'],
        }),
        getBoardById: builder.query({
            query: (id) => `boards/${id}`,
            providesTags: ['boards'],
        }),
        createBoard: builder.mutation({
            query: (data) => ({
                url: `boards`,
                method: 'POST',
                body: { ...data }
            }),
            invalidatesTags: ['boards'],
        }),
        checkBoardByName: builder.query({
            query: (boardName) => ({
                url: `boards/${boardName}`,
                method: 'GET',
            }),
        }),
        updateBoard: builder.mutation({
            query: (data) => ({
                url: `boards/${data.id}`,
                method: 'PATCH',
                body: { ...data }
            }),
            invalidatesTags: ['boards'],
        }),
        removeBoard: builder.mutation({
            query: (id: string) => ({
                url: `boards/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['boards'],
        }),
    }),
});

// Export hooks for usage in functional components
export const {
    useGetBoardsQuery,
    useGetBoardByIdQuery,
    useLazyCheckBoardByNameQuery,
    useCreateBoardMutation,
    useRemoveBoardMutation,
    useUpdateBoardMutation,
    util: { getRunningQueriesThunk },
} = boards;

// export endpoints for use in SSR
export const { getBoards } = boards.endpoints;