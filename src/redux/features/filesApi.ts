import api from '../api/apiSlice'

const rootApi = '/files'

const filesApi = api.injectEndpoints({
  endpoints: build => ({
    getFile: build.query({
      query: ({ id, token }) => ({
        url: `${rootApi}/${id}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ['folder'],
    }),
    getFiles: build.query({
      query: ({ search, token }) => ({
        url: `${rootApi}/search?search=${search}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    createFile: build.mutation({
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
    updateFile: build.mutation({
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
    deleteFile: build.mutation({
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

export const {
  useCreateFileMutation,
  useGetFilesQuery,
  useGetFileQuery,
  useUpdateFileMutation,
  useDeleteFileMutation,
} = filesApi
