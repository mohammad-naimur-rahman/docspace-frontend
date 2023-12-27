import SideNav from '@/components/pages/dashboard/ui/side-nav'
import TopNav from '@/components/pages/dashboard/ui/top-nav'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <TopNav />
      <SideNav />
      <div className='pl-[265px] mt-16'>{children}</div>
    </main>
  )
}
