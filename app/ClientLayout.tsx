"use client";

import Header from '../components/Header'
import Footer from '../components/Footer'
// import NoveeAssistant from '../components/NoveeAssistant'

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      {children}
      <Footer />
      {/* <NoveeAssistant /> */}
    </>
  )
}
