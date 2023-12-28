import SideNav from '@/components/pages/dashboard/files/side-nav'
import TopNav from '@/components/pages/dashboard/ui/top-nav'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <TopNav />
      <SideNav />
      <div className='pl-[255px] mt-16'>{children}</div>
    </main>
  )
}
