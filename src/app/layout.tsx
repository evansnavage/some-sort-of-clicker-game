import type { Metadata } from 'next'
import { Sono } from 'next/font/google'
import './globals.css'
import './library.css'

const sono = Sono({
    variable: '--font-sono',
    subsets: ['latin'],
})

export const metadata: Metadata = {
    title: 'Some Sort of Clicker Game',
    description: 'What it says on the tin.',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body className={`${sono.variable} ${sono.variable}`}>
                {children}
            </body>
        </html>
    )
}
