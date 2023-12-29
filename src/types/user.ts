import { CookieValueTypes } from 'cookies-next'

export interface ITokenData {
  iat: number
  exp: number
  role: 'user' | 'admin'
  userId: string
}

export interface IUser {
  _id: string
  fullName: string
  email: string
  role: 'user' | 'admin'
  profilePicture?: string
}

export interface IAuthUser {
  user: IUser
  token: {
    accessToken: string
    refreshToken: string
  }
}
export interface IUpdateIdData<T> {
  payload: Partial<T>
  id?: string
  token: CookieValueTypes
}
