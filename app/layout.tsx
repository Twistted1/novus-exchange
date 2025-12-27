import '../styles/globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import NoveeAssistant from '../components/NoveeAssistant'

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
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Outfit:wght@100..900&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-[#0a0a0a] text-white antialiased font-inter">
        <Header />

        {/* I removed "pt-28" and "flex". 
            Now it just renders your page exactly how it was before. */}
        <main>
          {children}
        </main>

        <Footer />
        <NoveeAssistant />
      </body>
    </html>
  )
}