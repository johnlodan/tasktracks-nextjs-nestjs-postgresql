import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
const rawBaseQuery = fetchBaseQuery({
    baseUrl: process.env.BASE_API,
    prepareHeaders: (headers) => {
        if (typeof window !== "undefined") {
            const token = Cookies.get("userToken");
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
        }
        return headers;
    },
});

const baseQueryWithAuth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
    args,
    api,
    extraOptions
) => {
    const result = await rawBaseQuery(args, api, extraOptions);

    if (result.error?.status === 401 && typeof window !== "undefined") {
        Cookies.remove("userToken");
        window.location.href = "/login";
    }

    return result;
};

export default baseQueryWithAuth;
