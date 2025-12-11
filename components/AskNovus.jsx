import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

export default function AskNovus() {
  const [messages, setMessages] = useState([{ id: '1', sender: 'ai', text: 'Ask a question, or type "image: ..." / "generate an image of ...".' }])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const chatEndRef = useRef(null)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const callApi = async (payload) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/ask-novus', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (!response.ok) {
        const err = await response.json()
        throw new Error(err.error || 'Failed to get response')
      }
      return await response.json()
    } catch (err) {
      setError(err.message)
      setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'ai', text: `Error: ${err.message}`, type: 'error' }])
      return null
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return
    const userMessage = { id: Date.now().toString(), sender: 'user', text: input, type: 'text' }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    const result = await callApi({ prompt: userMessage.text })
    if (result) {
      const aiMsg = {
        id: Date.now().toString(),
        sender: 'ai',
        text: result.text,
        imageUrl: result.imageUrl,
        type: result.imageUrl ? 'image' : 'text'
      }
      setMessages(prev => [...prev, aiMsg])
    }
  }

  return (
    <section id="ask-novus" className="min-h-screen py-32 bg-black reveal">
      <div className="container mx-auto px-6 max-w-4xl">
        <h2 className="text-4xl font-bold mb-4 text-center text-white">Ask Novus</h2>
        <p className="text-gray-400 mb-8 text-center max-w-xl mx-auto">AI-powered research assistant.</p>

        <div className="bg-[#111] border border-white/10 rounded-xl h-[60vh] flex flex-col overflow-hidden shadow-2xl relative">
          <div className="flex-grow p-6 overflow-y-auto space-y-4">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-lg text-sm leading-relaxed ${msg.sender === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-[#222] text-gray-200 border border-white/5'
                  }`}>
                  {msg.type === 'error' ? <span className="text-red-400">{msg.text}</span> : <p>{msg.text}</p>}
                  {msg.type === 'image' && (
                    <div className="mt-3">
                      <Image src={msg.imageUrl} alt="Generated" width={512} height={512} className="rounded-lg border border-white/10" unoptimized />
                    </div>
                  )}
                  {msg.sender === 'ai' && msg.type !== 'error' && (
                    <button className="mt-2 text-xs text-gray-500 hover:text-white flex items-center gap-1" onClick={() => speakText(msg.text)}>
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" /></svg>
                      Read Aloud
                    </button>
                  )}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="p-4 bg-[#111] border-t border-white/10">
            <div className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={isLoading ? 'Thinking...' : "Ask a question..."}
                className="flex-grow bg-[#222] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 border border-white/5 placeholder-gray-600"
                disabled={isLoading}
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 font-medium transition-colors"
                disabled={isLoading || !input.trim()}
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

function speakText(text) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
  window.speechSynthesis.cancel()
  const utter = new SpeechSynthesisUtterance(text)
  // Try to force a better voice
  const voices = window.speechSynthesis.getVoices()
  // Look for "Google US English" or similar high quality ones
  const betterVoice = voices.find(v => v.name.includes('Google') && v.lang.includes('en-US'))
    || voices.find(v => v.name.includes('Natural') && v.lang.includes('en'))
    || voices.find(v => v.lang === 'en-US')
  if (betterVoice) utter.voice = betterVoice
  utter.rate = 1.0
  utter.pitch = 1.0
  window.speechSynthesis.speak(utter)
}
