export default function About() {
  const playlistSrc = "https://www.youtube.com/embed/videoseries?list=PL-CfrwN0sygN_N7sflltRA_yb9k3WY9uR&autoplay=1&mute=1&loop=1"
  return (
    <section id="about" className="min-h-screen relative reveal scroll-mt-0 flex items-center justify-center py-32 z-10">
      <div className="max-w-6xl mx-auto px-6 w-full">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight">About</h2>
          <p className="text-sm text-gray-400 font-light max-w-2xl mx-auto">Learn more about our mission, our values, and the team driving Novus Exchange forward.</p>
        </div>
        <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden group">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            <div className="lg:col-span-4 space-y-6 border-l-2 border-cyan-500/50 pl-6 lg:pl-8">
              <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-[0.25em] drop-shadow-md">Novus Exchange</h3>
              <div className="space-y-6 text-gray-300 text-sm leading-relaxed font-light tracking-wide">
                <p>People deserve more than just headlines. Novus Exchange was founded to provide the full story, challenging conventional narratives and exposing the complexities of pressing issues.</p>
                <p>Our mission is to inform, provoke thought, and foster discussion by shining a light on the injustices and abuses of power impacting individuals and society.</p>
              </div>
            </div>
            <div className="lg:col-span-8 relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black">
              <iframe className="absolute inset-0 w-full h-full" src={playlistSrc} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
