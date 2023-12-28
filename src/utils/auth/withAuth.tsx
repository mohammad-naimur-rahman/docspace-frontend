'use client'

/* eslint-disable react/display-name */
import { CookieValueTypes, getCookie } from 'cookies-next'
import { redirect, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const withAuth = (WrappedComponent: any) => {
  return (props: any) => {
    const [accessToken, setaccessToken] = useState<CookieValueTypes | null>(null)
    const [isLoading, setisLoading] = useState(true)

    useEffect(() => {
      setaccessToken(getCookie('accessToken'))
      setisLoading(false)
    }, [])

    const pathname = usePathname()

    if (isLoading) {
      return <p>Loading...</p>
    }

    if (!accessToken) {
      return redirect(`/login?prevPath=${pathname}`)
    }

    return <WrappedComponent {...props} />
  }
}

export default withAuth
