import { envVars } from '@/configs'
import { ITokenData } from '@/types/user'
import { calculateTokenExpiration } from '@/utils/auth/calculateTokenExpiration'
import { BaseQueryApi, FetchArgs, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import axios from 'axios'
import { getCookie, setCookie } from 'cookies-next'
import { jwtDecode } from 'jwt-decode'
import { toast } from 'sonner'

const baseQuery = fetchBaseQuery({
  baseUrl: envVars.apiUrl,
})

const baseQueryWithReauth = async (args: FetchArgs, api: BaseQueryApi, extraOptions: {}) => {
  const refreshToken = getCookie('refreshToken')
  let result = await baseQuery(args, api, extraOptions)

  if (result?.error?.status === 401) {
    const refreshResult = await axios.get(`${envVars.apiUrl}/auth/access-token`, {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    })

    if (refreshResult?.data?.success) {
      const newAccessToken = refreshResult.data.data.accessToken
      const accessTokenData: ITokenData = jwtDecode(newAccessToken)
      const accessTokenExpiration = calculateTokenExpiration(accessTokenData)
      setCookie('accessToken', newAccessToken, {
        maxAge: accessTokenExpiration,
      })
      result = await baseQuery(args, api, extraOptions)
    } else {
      toast.error('Please login again!')
    }
  }

  return result
}

const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['folder', 'folders'],
  endpoints: () => ({}),
})

export default api
