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
  role: string
}

export interface IAuthUser {
  user: IUser
  token: {
    accessToken: string
    refreshToken: string
  }
}
