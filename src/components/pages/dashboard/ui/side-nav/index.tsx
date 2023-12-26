import logo from '@/assets/logo.png'
import { Img } from '@/components/ui/img'
import Link from 'next/link'
import NavLink from './nav-link'
import { NavLinks } from './nav-links'

export default function SideNav() {
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
    </aside>
  )
}
