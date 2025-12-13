import { useEffect, useRef, useState } from 'react'

export default function SiteChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([{ id: 1, sender: 'ai', text: 'Hello' }])
  const [input, setInput] = useState('')
  const messagesEndRef = useRef(null)

  useEffect(() => {
    if (isOpen) messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isOpen])

  async function handleSend(e) {
    e.preventDefault()
    if (!input.trim()) return
    const userText = input
    setInput('')
    setMessages(prev => [...prev, { id: Date.now(), sender: 'user', text: userText }])
    try {
      const systemContext = "You are Novus Assistant, a helpful AI for the Novus Exchange website. Novus Exchange is a media company providing critical, clear-eyed commentary on global issues. The website features: Articles (in-depth analysis updated weekly), Global Trending (AI-powered summaries updated daily), About section, Ask Novus (AI research assistant), Solutions/Novus Ecosystem (media tools), and Contact. Always provide concise, helpful answers about the website and stay professional."
      const response = await fetch('/api/ask-novus', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: `${systemContext}\n\nUser: ${userText}`, isSiteChat: true })
      })
      const data = await response.json()
      setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'ai', text: data.text || 'I apologize, but I am having trouble connecting right now.' }])
    } catch {
      setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'ai', text: "I'm having trouble connecting right now." }])
    }
  }

  function speakText(text) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
    const synth = window.speechSynthesis
    synth.cancel()

    // Wait for voices to load
    const speak = () => {
      const utter = new SpeechSynthesisUtterance(text)
      utter.lang = 'en-US'
      const voices = synth.getVoices()

      // Find best quality voice - prioritize Google, Microsoft Neural, or Apple
      const bestVoice = voices.find(v =>
        v.lang.startsWith('en') && (
          v.name.includes('Google') ||
          v.name.includes('Neural') ||
          v.name.includes('Premium') ||
          v.name.includes('Enhanced') ||
          v.name.includes('Samantha') || // macOS
          v.name.includes('Zira') // Windows
        )
      ) || voices.find(v => v.lang.startsWith('en-US')) || voices[0]

      if (bestVoice) utter.voice = bestVoice
      utter.rate = 1.0
      utter.pitch = 1.0
      utter.volume = 1.0
      synth.speak(utter)
    }

    if (synth.getVoices().length > 0) {
      speak()
    } else {
      synth.addEventListener('voiceschanged', speak, { once: true })
    }
  }

  function stopSpeak() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
    window.speechSynthesis.cancel()
  }

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)} className="fixed bottom-24 right-6 p-4 bg-cyan-600 text-white rounded-full shadow-2xl hover:bg-cyan-700 transition-all z-50" aria-label="Open Site Chat">
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
        )}
      </button>
      {isOpen && (
        <div className="fixed bottom-40 right-6 w-96 max-w-[calc(100vw-3rem)] bg-[#050505] border border-white/20 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden" style={{ height: '600px' }}>
          <div className="bg-cyan-600 p-4 flex items-center justify-between">
            <h3 className="font-bold text-white text-base">Novus Assistant</h3>
            <button onClick={() => { setIsOpen(false); stopSpeak(); }} className="text-white/80 hover:text-white transition-colors" aria-label="Close">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-transparent scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-xl text-sm ${msg.sender === 'user' ? 'bg-white/10 text-white border border-white/20' : 'bg-white/5 text-gray-100 border border-white/10'}`}>
                  {msg.text}
                  {msg.sender !== 'user' && (
                    <div className="mt-2 flex gap-2">
                      <button className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1" onClick={() => speakText(msg.text)} aria-label="Read aloud">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>
                        Listen
                      </button>
                      <button className="text-xs text-gray-400 hover:text-gray-300" onClick={stopSpeak} aria-label="Stop">Stop</button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleSend} className="p-4 bg-white/5 border-t border-white/10 backdrop-blur-md">
            <div className="flex gap-3 items-center">
              <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message..." className="flex-1 bg-black/40 text-white text-sm rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 border border-white/10 placeholder-white/30" />
              <button type="submit" className="bg-cyan-600 text-white p-3 rounded-full hover:bg-cyan-700 transition-all flex items-center justify-center" aria-label="Send">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  )
}
