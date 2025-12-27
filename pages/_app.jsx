import '../styles/globals.css'
import Header from '../components/Header'
import NoveeAssistant from '../components/NoveeAssistant'

export default function MyApp({ Component, pageProps }) {
  return (
    <div className="theme-bg text-white min-h-screen">
      <Header />
      <div className="pt-24">
        <Component {...pageProps} />
      </div>
      <NoveeAssistant />
      <div id="novee-root" />
    </div>
  )
}
