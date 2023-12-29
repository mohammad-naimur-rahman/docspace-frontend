import api from '../api/apiSlice'

const rootApi = '/users'

const usersApi = api.injectEndpoints({
  endpoints: build => ({
    getProfile: build.query({
      query: token => ({
        url: rootApi,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ['user'],
    }),
    updateProfile: build.mutation({
      query: ({ payload, token }) => ({
        url: rootApi,
        method: 'PATCH',
        body: payload,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['user', 'users'],
    }),
    getAllUsers: build.query({
      query: token => ({
        url: `${rootApi}/all-users`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ['users'],
    }),
    makeAdmin: build.mutation({
      query: ({ id, token }) => ({
        url: `${rootApi}/make-admin/${id}`,
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['users', 'user'],
    }),
  }),
})

export const { useGetProfileQuery, useUpdateProfileMutation, useGetAllUsersQuery, useMakeAdminMutation } = usersApi
