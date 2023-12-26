'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { Switch } from '@/components/ui/switch'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const [currentTheme, setcurrentTheme] = useState<string | null>(null)

  useEffect(() => {
    if (theme) {
      setcurrentTheme(theme)
    }
  }, [theme])

  return (
    <div className='flex items-center gap-1'>
      <Sun className='h-4 w-4' />
      {currentTheme ? (
        <Switch onCheckedChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')} checked={theme === 'dark'} />
      ) : (
        <Skeleton className='w-8 h-4 m-[2px]' />
      )}
      <Moon className='w-4 h-4' />
    </div>
  )
}
