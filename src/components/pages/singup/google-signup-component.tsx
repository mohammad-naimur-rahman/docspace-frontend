import { Button } from '@/components/ui/button'
import GoogleIcon from '@/components/ui/icons/google'
import SpinnerIcon from '@/components/ui/icons/spinner'
import { envVars } from '@/configs'
import auth from '@/lib/firebase'
import { IAuthUser } from '@/types/user'
import { manageUserData } from '@/utils/auth/manageUserData'
import axios from 'axios'
import { AuthError, GoogleAuthProvider, UserCredential, signInWithPopup } from 'firebase/auth'
import { useRouter, useSearchParams } from 'next/navigation'
import { Dispatch, SetStateAction } from 'react'
import { toast } from 'sonner'

interface Props {
  isLoading: boolean
  setIsLoading: Dispatch<SetStateAction<boolean>>
  rememberMe: boolean
}

export default function GoogleSignupComponent({ isLoading, setIsLoading, rememberMe }: Props) {
  const { push } = useRouter()
  const searchParams = useSearchParams()
  const hasPrevPath = searchParams.has('prevPath')
  const prevPath = searchParams.get('prevPath')

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider()
    try {
      setIsLoading(true)
      const response: UserCredential = await signInWithPopup(auth, provider)
      const { user } = response
      if (user) {
        const token = await user.getIdToken()
        const result = await axios.post(
          `${envVars.apiUrl}/auth/signup`,
          { email: user.email, fullName: user.displayName },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        if (result?.data?.success) {
          setIsLoading(false)
          toast.success('Signed up successfully!')
          const authData: IAuthUser = result?.data?.data
          manageUserData(authData, rememberMe)
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
    <Button
      type='button'
      variant='outline'
      className='w-full sm:w-[300px] lg:w-[350px] mx-auto max-w-[350px] mb-3'
      disabled={isLoading}
      onClick={handleGoogleLogin}>
      {isLoading ? (
        <SpinnerIcon />
      ) : (
        <div className='flex items-center gap-3'>
          <GoogleIcon />
          <p>Signup with Google</p>
        </div>
      )}
    </Button>
  )
}
