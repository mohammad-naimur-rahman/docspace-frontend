import SideNav from '@/components/pages/dashboard/ui/side-nav'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <SideNav />
      <div className='pl-[255px]'>{children}</div>
    </main>
  )
}
