import { FileStack, UserRoundCheck, Users } from 'lucide-react'

export interface NavLinkType {
  label: string
  href: string
  icon: JSX.Element
}

export const navLinks = (role: 'user' | 'admin'): NavLinkType[] | undefined => {
  if (role === 'user')
    return [
      {
        label: 'Profile',
        href: '/dashboard/profile',
        icon: <UserRoundCheck />,
      },
      {
        label: 'Files',
        href: '/dashboard/files',
        icon: <FileStack />,
      },
    ]
  if (role === 'admin')
    return [
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
}
