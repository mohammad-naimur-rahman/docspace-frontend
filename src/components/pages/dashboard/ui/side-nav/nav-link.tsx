import { cn } from '@/lib/utils'
import Link from 'next/link'
import { NavLinkType } from './nav-links'

interface Props {
  link: NavLinkType
  className?: string
}

export default function NavLink({ link, className }: Props) {
  return (
    <div>
      <Link href={link.href} className={cn('flex items-center gap-3', className)}>
        <span className='w-6 h-6'>{link.icon}</span>
        <span>{link.label}</span>
      </Link>
    </div>
  )
}
