import { Checkbox } from '@/components/ui/checkbox'
import { Dispatch, SetStateAction } from 'react'

interface Props {
  rememberMe: boolean
  setrememberMe: Dispatch<SetStateAction<boolean>>
}

export default function RememberMe({ rememberMe, setrememberMe }: Props) {
  return (
    <div className='flex justify-between items-center'>
      <div className='flex items-center space-x-2 pt-4 pb-3'>
        <Checkbox id='signup-remember-me' onChange={() => setrememberMe(!rememberMe)} />
        <label
          htmlFor='signup-remember-me'
          className='text-sm font-medium leading-none text-muted-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
          Remember Me
        </label>
      </div>
      <p className='cursor-pointer text-sky-700 text-sm' title='Dummy link'>
        Forgot password?
      </p>
    </div>
  )
}
