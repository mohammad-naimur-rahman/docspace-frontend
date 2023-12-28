import Link from 'next/link'
import { NavLinkType } from './nav-links'

interface Props {
  link: NavLinkType
}

export default function NavLink({ link }: Props) {
  return (
    <div>
      <Link href={link.href} className='flex items-center gap-3'>
        <span className='w-6 h-6'>{link.icon}</span>
        <span>{link.label}</span>
      </Link>
    </div>
  )
}
