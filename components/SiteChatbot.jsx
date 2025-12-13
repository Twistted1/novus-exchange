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
      const response = await fetch('/api/ask-novus', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ prompt: userText, isSiteChat: true }) })
      const data = await response.json()
      setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'ai', text: data.text || 'ok' }])
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
      <button onClick={() => setIsOpen(!isOpen)} className="fixed bottom-24 right-6 p-4 bg-red-600 text-white rounded-full shadow-2xl hover:bg-red-700 transition-all z-50" aria-label="Open Site Chat">
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
        )}
      </button>
      {isOpen && (
        <div className="fixed bottom-40 right-6 w-96 max-w-[calc(100vw-3rem)] liquid-glass z-50 flex flex-col overflow-hidden shadow-2xl max-h-[600px]">
          <div className="bg-cyan-500/20 backdrop-blur-md p-4 flex items-center justify-between border-b border-white/10"><h3 className="font-bold text-white drop-shadow-md">Novus Assistant</h3></div>
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-transparent">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-lg text-sm ${msg.sender === 'user' ? 'bg-cyan-600 text-white shadow-lg' : 'bg-white/10 text-white border border-white/5 backdrop-blur-sm'}`}>
                  {msg.text}
                  {msg.sender !== 'user' && (
                    <div className="mt-2 flex gap-2">
                      <button className="px-2 py-1 text-xs rounded bg-white/10" onClick={() => speakText(msg.text)}>Listen</button>
                      <button className="px-2 py-1 text-xs rounded bg-white/10" onClick={stopSpeak}>Stop</button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleSend} className="p-3 bg-white/5 border-t border-white/10 backdrop-blur-md">
            <div className="flex gap-2">
              <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message..." className="flex-1 bg-black/40 text-white text-sm rounded-full px-4 py-2 focus:outline-none focus:ring-1 focus:ring-cyan-500 border border-white/10 placeholder-white/30" />
              <button type="submit" className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-500 shadow-lg shadow-blue-900/20 transition-all">
                <svg className="w-4 h-4 transform rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  )
}
