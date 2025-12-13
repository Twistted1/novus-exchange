export default function Solutions() {
  const products = [
    { title: 'AI Media Suite', description: 'The all-in-one creative powerhouse. Generate high-fidelity images, edit video, and leverage our advanced AI chat for content ideation.', icon: (<svg className="w-8 h-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>), cta: 'Join Waitlist', status: 'COMING SOON', statusColor: 'text-purple-400 bg-purple-400/10', link: '#contact' },
    { title: 'Media Hub Enterprise', description: 'End-to-end content automation. Script generation, voice cloning in 30+ languages, and automated social scheduling.', icon: (<svg className="w-8 h-8 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>), cta: 'Request Beta Access', status: 'PRIVATE BETA', statusColor: 'text-cyan-400 bg-cyan-400/10', link: '#contact' },
    { title: 'Novus CMS Pro', description: 'A professional-grade headless CMS designed for speed and flexibility. Perfect for high-traffic news and media sites.', icon: (<svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>), cta: 'View Features', status: 'TESTING', statusColor: 'text-yellow-400 bg-yellow-400/10', link: '#contact' },
    { title: 'CMS Enterprise', description: 'The ultimate publishing engine. Advanced roles, multi-site management, and dedicated support for large-scale organizations.', icon: (<svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>), cta: 'Contact Sales', status: 'IN DEVELOPMENT', statusColor: 'text-gray-400 bg-gray-400/10', link: '#contact' }
  ]
  return (
    <section id="solutions" className="min-h-screen relative reveal scroll-mt-0 py-32 z-10 flex items-center justify-center snap-start">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black text-white mb-4 drop-shadow-lg">The Novus Ecosystem</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light">We don&apos;t just report the news. We build the engines that power the next generation of media companies.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div key={index} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col transition-all duration-300 group relative overflow-hidden neon-card shine-hover hover:-translate-y-2 hover:border-cyan-500/50">
              <div className={`absolute top-4 right-4 text-[10px] font-bold px-2 py-1 rounded uppercase ${product.statusColor}`}>{product.status}</div>
              <div className="bg-black/40 w-14 h-14 rounded-xl flex items-center justify-center mb-6 border border-white/5 group-hover:scale-110 transition-transform">{product.icon}</div>
              <h3 className="text-xl font-bold text-white mb-3 neon-text">{product.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-8 flex-grow">{product.description}</p>
              <a href={product.link} className="inline-block text-center w-full py-3 rounded-lg border border-white/20 text-sm font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-colors">{product.cta}</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
