export default function Contact() {
  return (
    <section id="contact" className="min-h-screen relative reveal scroll-mt-0 py-32 z-10 flex items-center justify-center">
      <div className="container mx-auto px-6 max-w-6xl w-full">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight">Contact</h2>
          <p className="text-sm text-gray-400 font-light max-w-2xl mx-auto">We&apos;d love to hear from you. Reach out with questions, feedback, or inquiries.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

          {/* Contact Form */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-3 text-white">Get in touch</h3>
            <p className="text-gray-400 text-sm mb-6 font-light">We value your feedback and inquiries.</p>
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
              <button type="submit" className="bg-red-600 text-white font-bold text-xs uppercase tracking-widest py-4 px-10 rounded-xl hover:bg-red-700 transition-all shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:shadow-[0_0_30px_rgba(220,38,38,0.4)] w-full">Send Message</button>
            </form>
          </div>

          {/* Newsletter + Social */}
          <div className="flex flex-col gap-8">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-3 text-white">Subscribe to Our Newsletter</h3>
              <p className="text-gray-400 text-sm mb-6 font-light">Stay ahead of the curve with our latest articles.</p>
              <form action="https://formspree.io/f/xnngvoyw" method="POST" className="flex flex-col gap-4">
                <input type="email" name="email" placeholder="your.email@example.com" required className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white text-sm focus:outline-none focus:ring-2 focus:ring-white/20 placeholder-white/30" />
                <button type="submit" className="bg-red-600 text-white font-bold text-xs uppercase tracking-widest py-4 px-6 rounded-xl hover:bg-red-700 transition-all w-full">Subscribe</button>
              </form>
            </div>

            {/* Social Icons */}
            <div className="text-center">
              <h3 className="text-xs font-bold text-cyan-400 mb-6 tracking-[0.2em] uppercase">Connect With Us</h3>
              <div className="flex items-center justify-center gap-6 flex-wrap">
                <a href="https://www.youtube.com/@NovusExchange" target="_blank" rel="noopener noreferrer" className="text-[#FF0000] hover:text-[#FF0000]/80 hover:scale-110 transition-all duration-300" aria-label="YouTube">
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.377.505 9.377.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                </a>
                <a href="https://tiktok.com/@novusexchange" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-all duration-300" aria-label="TikTok">
                  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" fill="url(#tiktok-gradient)" /><defs><linearGradient id="tiktok-gradient" x1="12" y1="2" x2="12" y2="22" gradientUnits="userSpaceOnUse"><stop stopColor="#00F2EA" /><stop offset="1" stopColor="#FF0050" /></linearGradient></defs></svg>
                </a>
                <a href="https://x.com/novusexchange" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/70 hover:scale-110 transition-all duration-300" aria-label="X (Twitter)">
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H4.68l4.71 6.23L13.89 2.25h4.354zm-1.491 17.25h2.336L7.015 4.022H4.58l12.173 15.478z" /></svg>
                </a>
                <a href="https://instagram.com/novusexchange" target="_blank" rel="noopener noreferrer" className="text-[#E4405F] hover:text-[#E4405F]/80 hover:scale-110 transition-all duration-300" aria-label="Instagram">
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.069-4.85.069s-3.584-.011-4.85-.069c-3.225-.149-4.771-1.664-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85C2.163 3.854 3.708 2.309 6.93 2.163 8.181 2.105 8.559 2.094 12 2.094m0-2.094c-3.264 0-3.66.014-4.944.072C2.69 0.402 0.402 2.69 0.072 7.056 0.014 8.34 0 8.736 0 12s.014 3.66.072 4.944C0.402 21.31 2.69 23.598 7.056 23.928c1.284.058 1.68.072 4.944.072s3.66-.014 4.944-.072c4.368-.328 6.656-2.616 6.984-6.984.058-1.284.072-1.68.072-4.944s-.014-3.66-.072-4.944C23.598 2.69 21.31 0.402 16.944 0.072 15.66 0.014 15.264 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z" /></svg>
                </a>
                <a href="https://rumble.com/c/NovusExchange" target="_blank" rel="noopener noreferrer" className="text-[#85C742] hover:text-[#85C742]/80 hover:scale-110 transition-all duration-300" aria-label="Rumble">
                  <svg className="w-7 h-7" viewBox="0 0 100 100" fill="currentColor">
                    <circle cx="50" cy="50" r="48" fill="#85C742" />
                    <path d="M50 25c-8 0-15 4-19 10l-5-3c5-8 14-12 24-12 15 0 27 12 27 27s-12 27-27 27c-10 0-19-6-24-14l5-3c4 6 11 10 19 10 12 0 22-10 22-22S62 25 50 25z" fill="#fff" />
                    <path d="M35 45h30v10H35z" fill="#fff" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
