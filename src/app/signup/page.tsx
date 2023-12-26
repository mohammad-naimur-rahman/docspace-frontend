'use client'

import logo from '@/assets/logo.png'
import EmailSignupComponent from '@/components/pages/singup/email-signup-component'
import GoogleSignupComponent from '@/components/pages/singup/google-signup-component'
import OrSeparator from '@/components/pages/singup/or-separator'
import { Img } from '@/components/ui/img'
import Typography from '@/components/ui/typography'
import Link from 'next/link'
import { useState } from 'react'

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [rememberMe, setrememberMe] = useState<boolean>(true)
  return (
    <section className='min-h-screen flex flex-col items-center justify-center'>
      <Link href='/'>
        <Img src={logo} alt='DocSpace' className='w-48 h-auto' sizes='200px' />
      </Link>
      <Typography variant='h3'>Create an account</Typography>
      <p className='text-muted-foreground py-5'>Start organizing your documents</p>

      <EmailSignupComponent
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        rememberMe={rememberMe}
        setrememberMe={setrememberMe}
      />

      <OrSeparator />

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
