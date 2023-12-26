import { FileStack, UserRoundCheck, Users } from 'lucide-react'

export interface NavLinkType {
  label: string
  href: string
  icon: JSX.Element
}

export const NavLinks: NavLinkType[] = [
  {
    label: 'Profile',
    href: '/dashboard/profile',
    icon: <UserRoundCheck />,
  },
  {
    label: 'Users',
    href: '/dashboard/users',
    icon: <Users />,
  },
  {
    label: 'Files',
    href: '/dashboard/files',
    icon: <FileStack />,
  },
]
