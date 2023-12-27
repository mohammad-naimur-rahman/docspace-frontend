import api from '../api/apiSlice'

const rootApi = '/folders'

const foldersApi = api.injectEndpoints({
  endpoints: build => ({
    getFolder: build.query({
      query: ({ id, token }) => ({
        url: `${rootApi}/${id}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ['folder'],
    }),
    createFolder: build.mutation({
      query: ({ payload, token }) => ({
        url: rootApi,
        method: 'POST',
        body: payload,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['folder'],
    }),
    updateFolder: build.mutation({
      query: ({ id, token, payload }) => ({
        url: `${rootApi}/${id}`,
        method: 'PATCH',
        body: payload,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['folder'],
    }),
    deleteFolder: build.mutation({
      query: ({ id, token }) => ({
        url: `${rootApi}/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['folder'],
    }),
  }),
})

export const { useCreateFolderMutation, useGetFolderQuery, useUpdateFolderMutation, useDeleteFolderMutation } =
  foldersApi
