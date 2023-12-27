import { Search } from 'lucide-react'
import ThemeSwitcher from './theme-switcher'

export default function TopNav() {
  return (
    <nav className='fixed top-0 left-[255px] w-[calc(100%_-_255px)] h-16 flex items-center justify-between px-6'>
      <div className='rounded-full border border-muted-foreground border-opacity-50 flex items-center gap-3 p-2'>
        <Search />
        <input placeholder='Type to search' className='border-none outline-none bg-transparent w-96' />
      </div>

      <ThemeSwitcher />
    </nav>
  )
}
