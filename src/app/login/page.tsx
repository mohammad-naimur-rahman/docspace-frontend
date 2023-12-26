'use client'

import logo from '@/assets/logo.png'
import EmailLoginComponent from '@/components/pages/login/email-login-component'
import GoogleLoginComponent from '@/components/pages/login/google-login-component'
import OrSeparator from '@/components/pages/singup/or-separator'
import { Img } from '@/components/ui/img'
import Typography from '@/components/ui/typography'
import Link from 'next/link'
import { useState } from 'react'

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [rememberMe, setrememberMe] = useState<boolean>(true)
  return (
    <section className='min-h-screen flex flex-col items-center justify-center'>
      <Link href='/'>
        <Img src={logo} alt='DocSpace' className='w-48 h-auto' sizes='200px' />
      </Link>
      <Typography variant='h3'>Login to your account</Typography>
      <p className='text-muted-foreground py-5'>Welcome back to DocSpace</p>

      <EmailLoginComponent
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        rememberMe={rememberMe}
        setrememberMe={setrememberMe}
      />

      <OrSeparator />

      <GoogleLoginComponent isLoading={isLoading} setIsLoading={setIsLoading} rememberMe={rememberMe} />

      <div className='flex gap-2 text-xs'>
        <p>Don&apos;t have an account?</p>
        <Link href='/signup' className='text-sky-700'>
          Sign up
        </Link>
      </div>
    </section>
  )
}
