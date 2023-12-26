'use client'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { Dispatch, SetStateAction } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'
import axios from 'axios'
import auth from '@/lib/firebase'
import { AuthError, UserCredential, createUserWithEmailAndPassword } from 'firebase/auth'
import { envVars } from '@/configs'
import SpinnerIcon from '@/components/ui/icons/spinner'

const loginSchema = z.object({
  fullName: z.string({ required_error: 'Full name is required!' }).trim(),
  email: z
    .string({ required_error: 'Email is required!' })
    .email({
      message: 'Email is required!',
    })
    .trim(),
  password: z.string({ required_error: 'Password is required!' }).min(6, {
    message: 'Password must be at least 6 characters!',
  }),
  repeatPassword: z.string({ required_error: 'Type your password again!' }).min(6, {
    message: 'Password must be at least 6 characters!',
  }),
})

interface Props {
  isLoading: boolean
  setIsLoading: Dispatch<SetStateAction<boolean>>
}

export default function EmailSignupComponent({ isLoading, setIsLoading }: Props) {
  const { push } = useRouter()
  const searchParams = useSearchParams()
  const hasPrevPath = searchParams.has('prevPath')
  const prevPath = searchParams.get('prevPath')

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    const { fullName, email, password, repeatPassword } = values
    if (password !== repeatPassword) {
      toast.error('Passwords do not match!')
      return
    }

    try {
      setIsLoading(true)
      const response: UserCredential = await createUserWithEmailAndPassword(auth, email, password)
      const { user } = response
      if (user) {
        const token = await user.getIdToken()
        const result = await axios.post(
          `${envVars.apiUrl}/auth/signup`,
          { email: user.email, fullName },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        if (result?.data?.success) {
          setIsLoading(false)
          toast.success('Signed up successfully!')
          const authData = result?.data?.data
          // manageUserData(authData)
          if (hasPrevPath) {
            push(prevPath!)
          } else {
            push('/')
          }
        }
      }
    } catch (err) {
      setIsLoading(false)
      toast.error((err as AuthError).message)
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col gap-2.5 justify-center w-full sm:w-[300px] lg:w-[350px] mx-auto max-w-[350px]'>
        <FormField
          control={form.control}
          name='fullName'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder='Enter your full name' {...field} disabled={isLoading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder='Enter your email' {...field} disabled={isLoading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type='password' placeholder='Enter your password' {...field} disabled={isLoading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='repeatPassword'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type='password' placeholder='Repeat your password' {...field} disabled={isLoading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' disabled={isLoading}>
          {isLoading ? <SpinnerIcon /> : 'Signup'}
        </Button>
      </form>
    </Form>
  )
}
