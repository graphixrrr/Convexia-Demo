import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AIProvider } from '@/lib/ai-context'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Convexia Execution Risk',
  description: 'Clinical Trial Execution Risk Assessment Platform',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AIProvider>
          {children}
        </AIProvider>
      </body>
    </html>
  )
} 