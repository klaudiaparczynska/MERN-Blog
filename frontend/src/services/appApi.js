//managing post requests, fetching data  - service providing data menagement
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const appApi = createApi({
    reducerPath: 'appApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000',
        prepareHeaders: (headers, {getState}) => {
            const token = getState().user.token
            if(token) {
                headers.set('Authorization', `Bearer ${token}`)
            }
            return headers;
        },
    }),
    tagTypes: ['Post', 'User'],
    endpoints: (builder) => ({
        signupUser: builder.mutation({
            query: (user) => ({
                url: "/users",
                method: "POST",
                body: user  //replacing axios
            })

        }),
        loginUser: builder.mutation({ //tags
            query: (user) => ({
                url: "/users/login",
                method: "POST",
                body: user  //replacing axios
            })
        }),
        logoutUser: builder.mutation({
            query: () => ({
                url: "/users/logout",
                method: "DELETE",
            })
        }),
        //post routes - article
        createPost: builder.mutation({
            query: (article) => ({
                url: '/posts',
                method: 'POST',
                body: article

            }),
            invalidatesTags: ["Post"],
        }),
        getAllPosts: builder.query({
            query: () => ({
                url: '/posts'

            }),
            providesTags: ["Post"],
        }),
        getOnePost: builder.query({
            query: (id) => ({
                url: `/posts/${id}`
            }),
        }),
        getAllUserPosts: builder.query({
            query: () => ({
                url: '/posts/me'
            }),
            providesTags: ["Post"],
        }),
               
        updatePost: builder.mutation({
            query: ({id, ...post}) => ({
                url: `/posts/${id}`,
                method: 'PATCH',
                body: post
            }),
            invalidatesTags: ["Post"],
        }),
        deletePost: builder.mutation({
            query: (id) => ({
                url: `/posts/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ["Post"],
        }),
        
    }),
})

export const {useSignupUserMutation, useLoginUserMutation, useLogoutUserMutation, useCreatePostMutation, useGetAllPostsQuery, useGetOnePostQuery, useGetAllUserPostsQuery, useUpdatePostMutation, useDeletePostMutation } = appApi

export default appApi