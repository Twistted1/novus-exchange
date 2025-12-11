export default function Contact() {
  return (
    <section id="contact" className="relative reveal scroll-mt-24 mb-32">
      <div className="container mx-auto px-6">
        <div className="liquid-glass border border-white/20 rounded-3xl p-8 md:p-12 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">

            {/* Contact Form */}
            <div className="flex flex-col h-full">
              <h2 className="text-4xl md:text-5xl font-black mb-6 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">Get in touch</h2>
              <p className="text-gray-300 text-base mb-8 font-light">We value your feedback and inquiries.</p>
              <form action="https://formspree.io/f/mdkwzpjv" method="POST" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-cyan-400 text-[10px] uppercase tracking-widest font-bold mb-2">Name</label>
                    <input type="text" id="name" name="name" className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 placeholder-white/20 transition-all" placeholder="Name" required />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-cyan-400 text-[10px] uppercase tracking-widest font-bold mb-2">Email</label>
                    <input type="email" id="email" name="email" className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 placeholder-white/20 transition-all" placeholder="Email" required />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-cyan-400 text-[10px] uppercase tracking-widest font-bold mb-2">Message</label>
                  <textarea id="message" name="message" rows={5} className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white text-sm resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500/50 placeholder-white/20 transition-all" placeholder="How can we help?" required></textarea>
                </div>
                <button type="submit" className="bg-cyan-600 text-white font-bold text-xs uppercase tracking-widest py-4 px-10 rounded-xl hover:bg-cyan-500 transition-all shadow-[0_0_20px_rgba(34,211,238,0.2)] hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] w-full md:w-auto">Send Message</button>
              </form>
            </div>

            {/* Sidebar info */}
            <div className="flex flex-col gap-10 justify-between">

              <div className="bg-white/5 rounded-2xl p-8 border border-white/10 relative overflow-hidden group">
                <div className="absolute inset-0 bg-cyan-500/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <h2 className="text-2xl font-bold mb-3 text-white relative z-10">Newsletter</h2>
                <p className="text-gray-400 text-sm mb-6 font-light relative z-10">Stay ahead with our latest articles.</p>
                <form action="https://formspree.io/f/xnngvoyw" method="POST" className="flex flex-col gap-4 relative z-10">
                  <input type="email" name="email" placeholder="email@example.com" required className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 placeholder-white/20" />
                  <button type="submit" className="bg-red-600 text-white font-bold text-xs uppercase tracking-widest py-4 px-6 rounded-xl hover:bg-red-500 transition-all shadow-lg w-full flex items-center justify-center">Subscribe</button>
                </form>
              </div>

              <div>
                <h3 className="text-xs font-bold text-cyan-400 mb-6 tracking-[0.2em] uppercase">Connect With Us</h3>
                <div className="flex flex-wrap gap-6">
                  <a href="https://www.youtube.com/@NovusExchange" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#FF0000] hover:scale-110 transition-all duration-300"><svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.377.505 9.377.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg></a>
                  <a href="https://x.com/novusexchange" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/80 hover:scale-110 transition-all duration-300"><svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H4.68l4.71 6.23L13.89 2.25h4.354zm-1.491 17.25h2.336L7.015 4.022H4.58l12.173 15.478z" /></svg></a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#E4405F] hover:scale-110 transition-all duration-300"><svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.069-4.85.069s-3.584-.011-4.85-.069c-3.225-.149-4.771-1.664-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85C2.163 3.854 3.708 2.309 6.93 2.163 8.181 2.105 8.559 2.094 12 2.094m0-2.094c-3.264 0-3.66.014-4.944.072C2.69 0.402 0.402 2.69 0.072 7.056 0.014 8.34 0 8.736 0 12s.014 3.66.072 4.944C0.402 21.31 2.69 23.598 7.056 23.928c1.284.058 1.68.072 4.944.072s3.66-.014 4.944-.072c4.368-.328 6.656-2.616 6.984-6.984.058-1.284.072-1.68.072-4.944s-.014-3.66-.072-4.944C23.598 2.69 21.31 0.402 16.944 0.072 15.66 0.014 15.264 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z" /></svg></a>
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#1877F2] hover:scale-110 transition-all duration-300"><svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
