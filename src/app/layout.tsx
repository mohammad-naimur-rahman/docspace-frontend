import { Toaster } from '@/components/ui/sonner'
import ReduxProvider from '@/lib/redux-provider'
import { ThemeProvider } from '@/lib/theme-provider'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../styles/global.scss'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DocSpace',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <ReduxProvider>
          <ThemeProvider attribute='class' defaultTheme='light' enableSystem themes={['light', 'dark']}>
            <main>{children}</main>
            <Toaster />
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  )
}
