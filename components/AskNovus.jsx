import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

export default function AskNovus() {
  const [messages, setMessages] = useState([{ id: '1', sender: 'ai', text: "Hello! I'm Novus. How can I assist your research today? You can ask me to analyze topics, create images, or answer questions." }])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isListening, setIsListening] = useState(false)
  const fileInputRef = useRef(null)
  const chatEndRef = useRef(null)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const startListening = () => {
    if (typeof window === 'undefined') return
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      const recognition = new SpeechRecognition()
      recognition.lang = 'en-US'
      recognition.interimResults = false
      recognition.maxAlternatives = 1
      setIsListening(true)
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript
        setInput(prev => prev + (prev ? ' ' : '') + transcript)
        setIsListening(false)
      }
      recognition.onerror = () => { setIsListening(false) }
      recognition.onend = () => { setIsListening(false) }
      recognition.start()
    } else {
      alert('Voice input is not supported in this browser.')
    }
  }

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

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file || isLoading) return
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = async () => {
      const base64Image = String(reader.result).split(',')[1]
      const mimeType = file.type
      const userMessage = { id: Date.now().toString(), sender: 'user', text: `Analyzing image: ${file.name}`, imageUrl: URL.createObjectURL(file), type: 'image_upload' }
      setMessages(prev => [...prev, userMessage])
      const result = await callApi({ prompt: 'Analyze this image and provide a detailed description.', imageData: base64Image, mimeType })
      if (result) {
        const aiMsg = { id: Date.now().toString(), sender: 'ai', text: result.text, type: 'text' }
        setMessages(prev => [...prev, aiMsg])
      }
    }
    reader.onerror = () => { setError('Failed to read the image file.') }
  }

  return (
    <section id="ask-novus" className="min-h-screen bg-transparent reveal flex items-center justify-center snap-start py-32 z-10">
      <div className="container mx-auto px-6 max-w-4xl">
        <h2 className="text-5xl md:text-6xl font-black mb-6 text-center text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">Ask Novus</h2>
        <p className="text-xl text-gray-400 mb-12 text-center max-w-xl mx-auto font-light">AI-powered research assistant.</p>

        <div className="bg-[#050505] border border-white/20 rounded-2xl h-[500px] flex flex-col shadow-2xl relative overflow-hidden">
          <div className="flex-grow p-6 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-xl text-sm leading-relaxed backdrop-blur-sm shadow-lg ${msg.sender === 'user'
                  ? 'bg-cyan-600 text-white'
                  : 'bg-white/10 text-gray-100 border border-white/10'
                  }`}>
                  {msg.type === 'error' ? <span className="text-red-400 font-bold">{msg.text}</span> : <p className="drop-shadow-sm">{msg.text}</p>}
                  {msg.type === 'image_upload' && (
                    <div className="mt-3">
                      <Image src={msg.imageUrl} alt="Uploaded" width={200} height={200} className="rounded-lg border border-white/20 w-full h-auto shadow-md" unoptimized />
                    </div>
                  )}
                  {msg.type === 'image' && (
                    <div className="mt-3">
                      <Image src={msg.imageUrl} alt="Generated" width={512} height={512} className="rounded-lg border border-white/20 shadow-md" unoptimized />
                    </div>
                  )}
                  {msg.sender === 'ai' && msg.type !== 'error' && (
                    <button className="mt-2 text-[10px] uppercase tracking-wider text-cyan-300 hover:text-white flex items-center gap-1 transition-colors" onClick={() => speakText(msg.text)}>
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" /></svg>
                      Read Aloud
                    </button>
                  )}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="p-4 bg-white/5 border-t border-white/10 backdrop-blur-md relative z-10">
            <div className="flex gap-3 items-center">
              <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" disabled={isLoading} />
              <button type="button" onClick={() => fileInputRef.current && fileInputRef.current.click()} disabled={isLoading} className="text-gray-400 hover:text-cyan-400 transition-colors p-2 hover:bg-white/5 rounded-full" aria-label="Upload Image">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              </button>
              <button type="button" onClick={startListening} disabled={isLoading} className={`text-gray-400 hover:text-cyan-400 transition-colors p-2 hover:bg-white/5 rounded-full ${isListening ? 'text-red-500 animate-pulse' : ''}`} aria-label="Voice Input">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
              </button>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={isLoading ? 'Thinking...' : "Ask anything or describe an image to create..."}
                className="flex-grow bg-black/40 text-white px-5 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-500/50 border border-white/10 placeholder-white/30 transition-all"
                disabled={isLoading}
              />
              <button
                type="submit"
                className="bg-red-600 text-white px-8 py-3 rounded-full hover:bg-red-700 disabled:opacity-50 font-bold transition-all shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:shadow-[0_0_30px_rgba(220,38,38,0.5)] transform hover:scale-105 active:scale-95"
                disabled={isLoading || !input.trim()}
              >
                Send
              </button>
            </div>
            <p className="text-center text-gray-500 text-[10px] mt-2">Your privacy is important. We do not keep records of your conversations. Admin fee required.</p>
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
