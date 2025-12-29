import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

export default function AskNovus() {
  const [messages, setMessages] = useState([{ id: '1', sender: 'ai', text: 'Hello' }])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isListening, setIsListening] = useState(false)
  const [isProcessingVoice, setIsProcessingVoice] = useState(false)

  const fileInputRef = useRef(null)
  const messagesEndRef = useRef(null)
  const listRef = useRef(null)
  const recognitionRef = useRef(null)
  const isMounted = useRef(false)

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true
      return
    }
    const el = listRef.current
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
  }, [messages])

  const startListening = () => {
    if (isProcessingVoice) return
    if (typeof window === 'undefined' || !('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      setError('Speech recognition is not supported in this browser')
      return
    }

    setIsProcessingVoice(true)
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()
    recognitionRef.current = recognition

    recognition.lang = 'en-US'
    recognition.interimResults = false
    recognition.maxAlternatives = 1
    recognition.continuous = false

    recognition.onstart = () => setIsListening(true)
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript
      setInput(transcript)
      setIsListening(false)
      setIsProcessingVoice(false)
    }
    recognition.onerror = () => {
      setError('Speech recognition error')
      setIsListening(false)
      setIsProcessingVoice(false)
    }
    recognition.onend = () => {
      setIsListening(false)
      setIsProcessingVoice(false)
    }

    recognition.start()
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

      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'AI service unavailable')
      return data
    } catch (err) {
      setError(err.message || 'Failed to connect')
      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: 'ai',
          text: 'AI service is currently unavailable. Please check your API configuration.',
          type: 'error'
        }
      ])
      return null
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: input,
      type: 'text'
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')

    // ✅ FIXED: Using 'prompt' to match API expectation
    const result = await callApi({ prompt: userMessage.text })

    if (result) {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: 'ai',
          text: result.text,
          imageUrl: result.imageUrl,
          type: result.imageUrl ? 'image' : 'text'
        }
      ])
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

      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: 'user',
          text: `Analyzing image: ${file.name}`,
          imageUrl: URL.createObjectURL(file),
          type: 'image_upload'
        }
      ])

      // ✅ SAME FIX HERE
      const result = await callApi({
        prompt: 'Analyze this image and provide a detailed description.',
        imageData: base64Image,
        mimeType
      })

      if (result) {
        setMessages(prev => [
          ...prev,
          {
            id: Date.now().toString(),
            sender: 'ai',
            text: result.text,
            type: 'text'
          }
        ])
      }
    }

    reader.onerror = () => setError('Failed to read the image file.')
  }

  return (
    <section id="ask-novus" className="min-h-screen bg-transparent reveal flex items-center justify-center py-24 z-10">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-white tracking-tight">Ask Novus</h2>
          <p className="text-sm text-gray-400 font-light max-w-xl mx-auto">
            Your personal AI research companion. Analyze documents, summarize articles, and explore complex topics with depth and clarity.
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl h-[600px] flex flex-col shadow-2xl relative overflow-hidden mb-6">
          <div ref={listRef} className="flex-grow p-6 overflow-y-auto space-y-4">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className="max-w-[85%] p-4 rounded-xl bg-white/10 text-white text-sm">
                  {msg.type === 'error'
                    ? <span className="text-red-400 font-bold">{msg.text}</span>
                    : <p>{msg.text}</p>
                  }
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="p-4 bg-white/5 border-t border-white/10">
            <div className="flex gap-3 items-center">
              <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
              <button type="button" onClick={startListening}>🎙</button>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything…"
                className="flex-grow bg-black/40 text-white px-5 py-3 rounded"
                disabled={isLoading}
              />
              <button type="submit" disabled={isLoading || !input.trim()}>➤</button>
            </div>
          </form>
        </div>

        <div className="text-center">
          <p className="text-[10px] text-gray-500 uppercase tracking-wider font-medium">
            Novus AI is powered by advanced language models. Information provided should be verified.
          </p>
        </div>
      </div>
    </section>
  )
}

function speakText(text) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
  window.speechSynthesis.cancel()
  const utter = new SpeechSynthesisUtterance(text)
  const voices = window.speechSynthesis.getVoices()
  const betterVoice =
    voices.find(v => v.name.includes('Google') && v.lang.includes('en-US')) ||
    voices.find(v => v.lang === 'en-US')
  if (betterVoice) utter.voice = betterVoice
  window.speechSynthesis.speak(utter)
}
