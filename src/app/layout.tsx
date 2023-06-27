import './globals.css'
import Wrapper from "@/components/shared/wrapper"
import Navbar from "@/components/views/navbar"
import { Maven_Pro } from 'next/font/google'
import Footer from "@/components/views/Footer"
import TopLabel from '@/components/views/TopLabel'

const inter = Maven_Pro({
  subsets: ['latin'],
  weight: ["400", "500", "600", "700", "800", "900"]
})

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <div className='overflow-hidden'>
          <TopLabel />
        </div>
        <Wrapper>
          <Navbar/>
        {children}
        <Footer/> 
        </Wrapper>
        </body>
    </html>
  )
}
