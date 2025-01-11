import './globals.css'
import { Inter } from 'next/font/google'
import { SearchProvider } from '@/components/SearchProvider'
import { Navbar } from '@/components/Navbar'
import { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Finder",
  description: "Find courses and resources to help you learn and grow",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SearchProvider>
          <Navbar />
          <main className='pt-4 pb-8'>
            {children}
          </main>
        </SearchProvider>
      </body>
    </html>
  )
}

