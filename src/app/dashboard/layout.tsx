import SideNav from '@/components/pages/dashboard/ui/side-nav'
import TopNav from '@/components/pages/dashboard/ui/top-nav'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function DashboardLayout({ children }: Props) {
  return (
    <main>
      <TopNav />
      <SideNav />
      <div className='pl-[255px] mt-16'>{children}</div>
    </main>
  )
}
