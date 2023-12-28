'use client'

import logo from '@/assets/logo.png'
import { Img } from '@/components/ui/img'
import Typography from '@/components/ui/typography'
import { getCookie } from 'cookies-next'
import Link from 'next/link'
import NavLink from './nav-link'
import { NavLinks } from './nav-links'

export default function SideNav() {
  const userData = getCookie('userData')
  const userDataParsed = userData && JSON.parse(userData)
  return (
    <aside className='w-[255px] bg-[#1C2434] min-h-screen fixed top-0 left-0 flex flex-col justify-between text-white'>
      <div>
        <Link href='/'>
          <Img src={logo} alt='DocSpace' className='w-1/2 mx-auto py-3' />
        </Link>

        <div className='flex flex-col gap-6 pt-6 pl-6'>
          {NavLinks.map(link => (
            <NavLink key={link.label} link={link} />
          ))}
        </div>
      </div>

      <div className='flex items-center justify-center gap-3 p-2 mb-5'>
        <p className='w-16 h-16 rounded-full bg-secondary'>NA</p>
        <div className='space-y-1'>
          <Typography variant='h6'>{userDataParsed?.name}</Typography>
          <Typography variant='body-small'>{userDataParsed?.email}</Typography>
        </div>
      </div>
    </aside>
  )
}
