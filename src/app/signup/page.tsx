'use client'

import EmailSignupComponent from '@/components/pages/singup/email-signup-component'
import { Img } from '@/components/ui/img'
import Typography from '@/components/ui/typography'
import React, { useState } from 'react'
import logo from '@/assets/logo.png'
import { Separator } from '@/components/ui/separator'
import GoogleSignupComponent from '@/components/pages/singup/google-signup-component'
import Link from 'next/link'

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [rememberMe, setrememberMe] = useState<boolean>(true)
  return (
    <section className='min-h-screen flex flex-col items-center justify-center'>
      <Link href='/'>
        <Img src={logo} alt='DocSpace' className='w-48 h-auto' sizes='200px' />
      </Link>
      <Typography variant='h3'>Create an account</Typography>
      <p className='text-muted-foreground py-5'>Start your journey with our product</p>

      <EmailSignupComponent
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        rememberMe={rememberMe}
        setrememberMe={setrememberMe}
      />

      <div className='flex items-center justify-center gap-3 w-full sm:w-[300px] lg:w-[350px] max-w-[350px] mx-auto py-3.5'>
        <Separator className='max-w-36' />
        <p>Or</p>
        <Separator className='max-w-36' />
      </div>

      <GoogleSignupComponent isLoading={isLoading} setIsLoading={setIsLoading} rememberMe={rememberMe} />

      <div className='flex gap-2 text-xs'>
        <p>Already have an account?</p>
        <Link href='/login' className='text-sky-700'>
          Sign in
        </Link>
      </div>
    </section>
  )
}
