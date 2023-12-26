'use client'

import EmailSignupComponent from '@/components/pages/singup/email-signup-component'
import Typography from '@/components/ui/typography'
import React, { useState } from 'react'

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  return (
    <div className='min-h-screen flex flex-col items-center justify-center'>
      <Typography variant='h3'>Create an account</Typography>
      <p>Start your journey with our product</p>

      <EmailSignupComponent isLoading={isLoading} setIsLoading={setIsLoading} />
    </div>
  )
}
