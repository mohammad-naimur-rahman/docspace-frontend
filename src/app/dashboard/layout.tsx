'use client'

import SideNav from '@/components/pages/dashboard/ui/side-nav'
import MobileSideNav from '@/components/pages/dashboard/ui/side-nav/mobile-side-nav'
import TopNav from '@/components/pages/dashboard/ui/top-nav'
import { ReactNode, useState } from 'react'

interface Props {
  children: ReactNode
}

export default function DashboardLayout({ children }: Props) {
  const [mobileNavOpen, setmobileNavOpen] = useState(true)
  return (
    <main>
      <TopNav mobileNavOpen={mobileNavOpen} setmobileNavOpen={setmobileNavOpen} />
      <SideNav />
      {mobileNavOpen ? <MobileSideNav mobileNavOpen={mobileNavOpen} setmobileNavOpen={setmobileNavOpen} /> : null}
      <div className='p-0 lg:pl-[255px] mt-16'>{children}</div>
    </main>
  )
}
