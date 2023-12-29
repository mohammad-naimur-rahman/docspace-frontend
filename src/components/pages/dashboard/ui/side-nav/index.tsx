'use client'

import defaultAvatar from '@/assets/default-avatar.png'
import logo from '@/assets/logo.png'
import { Button } from '@/components/ui/button'
import { Img } from '@/components/ui/img'
import Typography from '@/components/ui/typography'
import { useGetProfileQuery } from '@/redux/features/usersApi'
import { IUser } from '@/types/user'
import { getToken } from '@/utils/auth/getToken'
import { deleteCookie } from 'cookies-next'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import NavLink from './nav-link'
import { navLinks } from './nav-links'

export default function SideNav() {
  const { push } = useRouter()
  const { data } = useGetProfileQuery(getToken())
  const profile: IUser = data?.data
  const allNavLinks = navLinks(profile?.role)
  return (
    <aside className='w-[255px] bg-[#1C2434] min-h-screen fixed top-0 left-0 hidden lg:flex flex-col justify-between text-white'>
      <div>
        <Link href='/'>
          <Img src={logo} alt='DocSpace' className='w-1/2 mx-auto py-3' />
        </Link>

        <div className='flex flex-col gap-6 pt-6 pl-6'>
          {allNavLinks?.map(link => (
            <NavLink key={link.label} link={link} />
          ))}
        </div>
      </div>

      <div className='flex flex-col justify-center items-center pb-5'>
        <div className='flex items-center justify-center gap-3 p-2 mb-2'>
          <p className='w-16 h-16 rounded-full bg-secondary overflow-hidden'>
            {profile?.profilePicture ? (
              <Img
                src={profile?.profilePicture}
                alt={profile?.fullName}
                className='w-full h-full aspect-square object-cover'
                activePlaceholder={false}
                sizes='150px'
              />
            ) : (
              <Img src={defaultAvatar} alt={profile?.fullName} />
            )}
          </p>
          <div className='space-y-1'>
            <Typography variant='h6'>{profile?.fullName}</Typography>
            <Typography variant='body-small'>{profile?.email}</Typography>
          </div>
        </div>
        <Button
          onClick={() => {
            deleteCookie('accessToken')
            deleteCookie('refreshToken')
            deleteCookie('userData')
            push('/')
          }}>
          Logout
        </Button>
      </div>
    </aside>
  )
}
