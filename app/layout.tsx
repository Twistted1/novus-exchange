import '../styles/globals.css'
import ClientLayout from './ClientLayout'

export const metadata = {
  title: 'Novus Exchange',
  description: 'AI-powered research assistant.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Outfit:wght@100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#0a0a0a] text-white antialiased font-inter">
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
}
