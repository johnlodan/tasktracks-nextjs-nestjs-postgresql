import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";
import baseQueryWithAuth from "../lib/preparedHeaders";
import { IUpdateOrderTasks } from "@/types/tasks";

export const tasks = createApi({
    reducerPath: 'tasks',
    tagTypes: ['tasks'],
    refetchOnReconnect: true,
    refetchOnFocus: true,
    baseQuery: baseQueryWithAuth,


    extractRehydrationInfo(action: any, { reducerPath }) {
        if (action.type === HYDRATE) {
            return action.payload[reducerPath];
        }
    },
    endpoints: (builder) => ({
        getTasks: builder.query({
            query: (query) => ({
                url: `tasks`,
                method: 'GET',
            }),
            providesTags: ['tasks'],
        }),
        getTaskByName: builder.query({
            query: (name) => `tasks/${name}`,
            providesTags: ['tasks'],
        }),
        createTask: builder.mutation({
            query: (data: any) => ({
                url: `tasks`,
                method: 'POST',
                body: { ...data }
            }),
            invalidatesTags: ['tasks'],
        }),
        updateTask: builder.mutation({
            query: (data: any) => ({
                url: `tasks/${data?.id}`,
                method: 'PATCH',
                body: { ...data }
            }),
        }),
        updateOrderTasks: builder.mutation({
            query: (data: IUpdateOrderTasks) => ({
                url: `tasks/reorder`,
                method: 'PATCH',
                body: { ...data }
            }),
        }),
        checkTaskByName: builder.query({
            query: (taskName) => ({
                url: `tasks/${taskName}`,
                method: 'GET',
            }),
        }),
        removeTask: builder.mutation({
            query: (id: string) => ({
                url: `tasks/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

// Export hooks for usage in functional components
export const {
    useGetTasksQuery,
    useGetTaskByNameQuery,
    useLazyCheckTaskByNameQuery,
    useCreateTaskMutation,
    useUpdateOrderTasksMutation,
    useUpdateTaskMutation,
    useRemoveTaskMutation,
    util: { getRunningQueriesThunk },
} = tasks;

// export endpoints for use in SSR
export const { getTasks, getTaskByName } = tasks.endpoints;