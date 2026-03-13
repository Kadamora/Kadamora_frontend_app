import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import type {RootState} from '../index'
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://kadamora-test-app-38pdp.ondigitalocean.app';

export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders: (headers, {getState}) => {
            const token = (getState() as RootState).auth.accessToken;
            if(token){
                headers.set('authorization', `Bearer ${token}`);
            }

            return headers;
        }
    }),
    tagTypes: [
        'Account', 'AdminAgent', 'AgentProfile', 'Property', 'Location', 'Notification', 'PropertyMgt', 'Favorites', 'Subscription', 'ServiceMarket', 'Timeline', 'Messages'
    ],
    endpoints: () => ({})
})