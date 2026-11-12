import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {getTmdbErrorMessage, handleErrors} from '../common/utils/handleErrors';
import {showErrorAC} from './app-slice';

export const baseApi = createApi({
    reducerPath: 'baseApi',
    keepUnusedDataFor: 86400,
    catchSchemaFailure: (error, info) => ({
        status: 'CUSTOM_ERROR',
        error: `${error.schemaName} validation failed for "${info.endpoint}".`,
        data: {status_code: 0},
    }),
    baseQuery: async (args, api, extraOptions) => {
        const result = await fetchBaseQuery({
            baseUrl: import.meta.env.VITE_BASE_URL,
            headers: {
                // "Api-Key": import.meta.env.VITE_API_KEY,
                "Authorization": `Bearer ${import.meta.env.VITE_AUTH_TOKEN}`
            },
        })(args, api, extraOptions);

        if (result.error) {
            handleErrors(result.error, (message) => api.dispatch(showErrorAC(message)));
        } else if (
            typeof result.data === 'object'
            && result.data !== null
            && 'status_code' in result.data
            && typeof result.data.status_code === 'number'
            && result.data.status_code !== 1
        ) {
            const message = getTmdbErrorMessage(result.data);
            api.dispatch(showErrorAC(message));
            return {
                error: {
                    status: 'CUSTOM_ERROR',
                    error: message,
                    data: result.data,
                },
            };
        }

        return result;
    },
    endpoints: () => ({}),
});
