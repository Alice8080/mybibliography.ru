import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();
const {headers, credentials} = {
    headers: {'Content-Type': 'application/json', "X-CSRFToken": cookies.get('csrftoken')},
    credentials: "same-origin"
};

/**
 * Конфигурация асинхронных запросов к API сайта для получения данных с сервера 
 * и преобразовывания этих данных для рендеринга компонентов, использующих полученные данные.
 */

export const apiSlice = createApi({
    reducerPath: 'api', 
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8000/api/'}), // localhost указан только для локального запуска приложения
    tagTypes: ['Sources', 'List', 'User', 'Statistics'], 
    endpoints: builder => ({  
        getSources: builder.query({ 
            query: () => 'sources/', 
            providesTags: ['Sources']
        }),
        getSource: builder.query({
            query: (source) => ({
                url: `sources/?q=${source}`,
                headers, 
                credentials
            }),
            transformResponse: (source) => ({
                sourceTitle: source.title,
                sourceName: source.name,
                sourceHaveAuthors: source.fields.some((field) => field.name === 'third_surname'),
                sourceHaveOptionals: source.fields.some((field) => field.isRequired === 'optional'),
                sourceFields: source.fields
            })
        }),
        postSource: builder.mutation({
            query: ({type, data}) => ({
                url: `sources/?q=${type}`,
                method: 'POST',
                headers, 
                credentials,
                body: data
            }),
            invalidatesTags: ['List']
        }),
        getList: builder.query({ 
            query: () => ({
                url: `list/`,
                headers, 
                credentials
            }),
            providesTags: ['List']
        }),
        postList: builder.mutation({
            query: () => ({
                url: 'list/',
                method: 'POST',
                headers, 
                credentials
            }),
            invalidatesTags: ['List']
        }),
        getSearchResults: builder.query({
            query: ({query, offset}) => ({
                url: `search/?q=${query}&offset=${offset}`,
                headers, 
                credentials
            }),
        }),
        getUserInfo: builder.query({ 
            query: () => ({
                url: 'user/',
                headers, 
                credentials
            }),
            providesTags: ['User', 'List', 'Order']
        }),
        getOrder: builder.query({
            query: (id) => ({
                url: `order/?q=${id}`,
                headers, 
                credentials
            }),
            providesTags: ['Order']
        }),
        postOrder: builder.mutation({
            query: (data) => ({
                url: 'order/',
                method: 'POST',
                headers, 
                credentials,
                body: data
            }),
            transformErrorResponse: (response, meta, arg) => response.originalStatus,
            invalidatesTags: ['Order']
        }),
        getStatistics: builder.query({ 
            query: () => `statistics/`,
            providesTags: ['Statistics']
        }),
    })
});

export const {
    useGetSourcesQuery, 
    useGetSourceQuery, 
    usePostSourceMutation, 
    useGetListQuery,
    usePostListMutation,
    useLazyGetSearchResultsQuery,
    useGetUserInfoQuery,
    useLazyGetOrderQuery,
    usePostOrderMutation,
    useGetStatisticsQuery
} = apiSlice;