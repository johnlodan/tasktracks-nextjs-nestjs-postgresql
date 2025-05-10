import baseQueryWithAuth from "@/lib/preparedHeaders";
import { createApi } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";

export const stages = createApi({
    reducerPath: 'stages',
    tagTypes: ['stages'],
    refetchOnReconnect: true,
    refetchOnFocus: true,
    baseQuery: baseQueryWithAuth,
    extractRehydrationInfo(action: any, { reducerPath }) {
        if (action.type === HYDRATE) {
            return action.payload[reducerPath];
        }
    },
    endpoints: (builder) => ({
        getStagesByBoardId: builder.query({
            query: (boardId: any) => ({
                url: `stages/${boardId}`,
                method: 'GET',
            }),
            providesTags: ['stages'],
        }),
        getStageByName: builder.query({
            query: (name) => `stages/${name}`,
            providesTags: ['stages'],
        }),
        createStage: builder.mutation({
            query: (data) => ({
                url: `stages`,
                method: 'POST',
                body: { ...data }
            }),
            invalidatesTags: ['stages'],
        }),
        updateStage: builder.mutation({
            query: (data: any) => ({
                url: `stages/${data?.id}`,
                method: 'PATCH',
                body: { ...data }
            }),
        }),
        updateOrderStages: builder.mutation({
            query: (ids) => ({
                url: `stages`,
                method: 'PUT',
                body: { ids }
            }),
        }),
        checkStageByName: builder.query({
            query: (stageName) => ({
                url: `stages/${stageName}`,
                method: 'GET',
            }),
        }),
        removeStage: builder.mutation({
            query: (id: string) => ({
                url: `stages/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['stages'],
        }),
    }),
});

// Export hooks for usage in functional components
export const {
    useGetStagesByBoardIdQuery,
    useGetStageByNameQuery,
    useLazyCheckStageByNameQuery,
    useCreateStageMutation,
    useUpdateOrderStagesMutation,
    useUpdateStageMutation,
    useRemoveStageMutation,
    util: { getRunningQueriesThunk },
} = stages;

// export endpoints for use in SSR
export const { getStagesByBoardId, getStageByName } = stages.endpoints;