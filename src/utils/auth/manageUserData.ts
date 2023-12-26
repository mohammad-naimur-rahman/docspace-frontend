import { setCookie } from 'cookies-next'
import { jwtDecode } from 'jwt-decode'
import { calculateTokenExpiration } from './calculateTokenExpiration'
import { IAuthUser, ITokenData, IUser } from '@/types/user'

export const manageUserData = (authData: IAuthUser, rememberMe: boolean) => {
  const accessToken = authData?.token?.accessToken
  const refreshToken = authData?.token?.refreshToken

  // Decode jwt token
  const accessTokenData: ITokenData = jwtDecode(accessToken)
  const refreshTokenData: ITokenData = jwtDecode(refreshToken)

  const accessTokenExpiration = calculateTokenExpiration(accessTokenData)
  const refreshTokenExpiration = calculateTokenExpiration(refreshTokenData)

  // Taking only the necessary data
  const userData: IUser = authData?.user
  const userDataToSave = {
    _id: userData?._id,
    email: userData?.email,
    name: userData?.fullName,
  }

  if (rememberMe) {
    setCookie('accessToken', accessToken, {
      maxAge: accessTokenExpiration / 1000,
    })
    setCookie('refreshToken', refreshToken, {
      maxAge: refreshTokenExpiration / 1000,
    })

    // Saving usee data with refresh token expiration because when refresh token will expire, user needs to login again
    setCookie('userData', JSON.stringify(userDataToSave), {
      maxAge: refreshTokenExpiration / 1000,
    })
  } else {
    setCookie('accessToken', accessToken)
    setCookie('refreshToken', refreshToken)

    // Saving usee data with refresh token expiration because when refresh token will expire, user needs to login again
    setCookie('userData', JSON.stringify(userDataToSave))
  }
}
