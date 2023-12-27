import { CookieValueTypes, getCookie } from 'cookies-next'

export const getToken = (): CookieValueTypes => {
  return getCookie('accessToken')
}
