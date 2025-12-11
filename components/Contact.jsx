export default function Contact() {
  return (
    <section id="contact" className="relative reveal scroll-mt-24 mb-12">
      <div className="container mx-auto px-6">
        <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-[0_0_50px_rgba(0,0,0,0.3)] transition-colors duration-500">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <div className="flex flex-col h-full">
              <h2 className="text-3xl md:text-4xl font-black mb-4 text-white">Get in touch</h2>
              <p className="text-gray-300 text-sm mb-6 font-light">We value your feedback and inquiries.</p>
              <form action="https://formspree.io/f/mdkwzpjv" method="POST" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-white/60 text-[10px] uppercase tracking-widest font-bold mb-1">Name</label>
                    <input type="text" id="name" name="name" className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-cyan-500/50" placeholder="Name" required />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-white/60 text-[10px] uppercase tracking-widest font-bold mb-1">Email</label>
                    <input type="email" id="email" name="email" className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-cyan-500/50" placeholder="Email" required />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-white/60 text-[10px] uppercase tracking-widest font-bold mb-1">Message</label>
                  <textarea id="message" name="message" rows={4} className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white text-sm resize-none focus:outline-none focus:border-cyan-500/50" placeholder="How can we help?" required></textarea>
                </div>
                <button type="submit" className="bg-red-600 text-white font-bold text-xs py-3 px-8 rounded-lg hover:bg-red-500 transition-all shadow-lg shadow-red-900/20 w-max">Send Message</button>
              </form>
            </div>

            <div className="flex flex-col gap-8 justify-between">
              <div className="bg-white/5 rounded-2xl p-6 border border-white/5 shadow-inner">
                <h2 className="text-xl font-bold mb-2 text-white">Newsletter</h2>
                <p className="text-gray-400 text-xs mb-4 font-light">Stay ahead with our latest articles.</p>
                <form action="https://formspree.io/f/xnngvoyw" method="POST" className="flex flex-col sm:flex-row gap-2">
                  <input type="email" name="email" placeholder="email@example.com" required className="flex-grow bg-black/30 border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-cyan-500/50" />
                  <button type="submit" className="bg-red-600 text-white font-bold text-xs py-3 px-6 rounded-lg hover:bg-red-500 transition-all shadow-lg w-full sm:w-auto h-full flex items-center justify-center whitespace-nowrap">Subscribe</button>
                </form>
              </div>

              <div>
                <h3 className="text-sm font-bold text-white mb-4 tracking-tight uppercase">Connect</h3>
                <div className="flex gap-4">
                  <a href="https://www.youtube.com/@NovusExchange" target="_blank" rel="noopener noreferrer" className="text-[#FF0000] hover:scale-110 transition-transform"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.377.505 9.377.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg></a>
                  <a href="https://x.com/novusexchange" target="_blank" rel="noopener noreferrer" className="text-white hover:scale-110 transition-transform"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H4.68l4.71 6.23L13.89 2.25h4.354zm-1.491 17.25h2.336L7.015 4.022H4.58l12.173 15.478z" /></svg></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
