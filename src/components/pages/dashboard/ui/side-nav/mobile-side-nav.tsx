import logo from '@/assets/logo.png'
import { Img } from '@/components/ui/img'
import { cn } from '@/lib/utils'
import { X } from 'lucide-react'
import Link from 'next/link'
import { Dispatch, SetStateAction } from 'react'
import NavLink from './nav-link'
import { NavLinks } from './nav-links'

interface Props {
  mobileNavOpen: boolean
  setmobileNavOpen: Dispatch<SetStateAction<boolean>>
}

export default function MobileSideNav({ mobileNavOpen, setmobileNavOpen }: Props) {
  return (
    <div
      className={cn(
        { '-right-full': !mobileNavOpen },
        'fixed top-0 right-0 w-56 h-screen bg-primary z-50 transition-all duration-300'
      )}>
      <div className='flex justify-between p-5 text-white'>
        <Link href='/'>
          <Img src={logo} alt='DocSpace' className='w-auto mx-auto py-3' />
        </Link>
        <X className='cursor-pointer' onClick={() => setmobileNavOpen(false)} />
      </div>
      <div className='flex flex-col gap-6 pt-6 pl-6'>
        {NavLinks.map(link => (
          <NavLink key={link.label} link={link} className='text-white' />
        ))}
      </div>
    </div>
  )
}
