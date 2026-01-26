"use client";
import { useState, useRef, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: number;
  sender: 'ai' | 'user';
  text: string;
}

// Extend Window interface for SpeechRecognition
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export default function NoveeAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Chat state from SiteChatbot
  const [messages, setMessages] = useState<Message[]>([{ id: 1, sender: 'ai', text: "Hey I'm Novee, What's up? I'm here to dive deep into any research topic or site features with you!" }]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  // Load voices
  useEffect(() => {
    const updateVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      console.log('Voices loaded:', availableVoices.length);
      setVoices(availableVoices);
    };

    // Chrome loads voices asynchronously
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      updateVoices();
      window.speechSynthesis.onvoiceschanged = updateVoices;
    }
  }, []);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Video hover logic
  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(e => console.log('Video play failed (needs interaction?):', e));
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  // Chat Logic
  const startListening = () => {
    if (typeof window === 'undefined' || !('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      setError('Speech recognition is not supported in this browser');
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
    };
    recognition.onerror = (event: any) => {
      console.error(event.error);
      setError('Voice input failed. Please try again.');
      setIsListening(false);
    };
    recognition.start();
  };

  async function handleSend(e: FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    const userText = input;
    setInput('');
    setMessages(prev => [...prev, { id: Date.now(), sender: 'user', text: userText }]); // Optimistic update

    try {
      const response = await fetch('/api/ask-novus', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userText, isSiteChat: true }) // isSiteChat triggers the system prompt in API
      });
      const data = await response.json();
      setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'ai', text: data.text || 'I apologize, but I am having trouble connecting right now.' }]);
      if (data.text) speakText(data.text);
    } catch {
      setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'ai', text: "I'm having trouble connecting right now." }]);
    }
  }

  function speakText(text: string) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    const synth = window.speechSynthesis;
    synth.cancel();

    const utter = new SpeechSynthesisUtterance(text);

    const preferredVoices = voices.filter(v => v.lang.startsWith('en'));
    const bestVoice = preferredVoices.find(v => v.name.includes('Google US English')) ||
      preferredVoices.find(v => v.name.includes('Google')) ||
      preferredVoices.find(v => v.name.includes('Natural')) ||
      preferredVoices[0] ||
      voices[0];

    if (bestVoice) {
      console.log('Speaking with voice:', bestVoice.name);
      utter.voice = bestVoice;
    }

    synth.speak(utter);
  }

  function stopSpeak() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end font-sans">

      {/* 1. The Speech Bubble */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mb-3 mr-4 bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-xl shadow-xl border border-white/20"
          >
            <p className="text-sm font-bold">Hey! I&apos;m Novee, What&apos;s up? 🤖</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. The Mascot Avatar */}
      <div
        className="relative w-40 h-40 cursor-pointer transition-transform hover:scale-105 active:scale-95 group"
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Glow effect - behind everything */}
        <div className="absolute inset-0 z-0 bg-teal-500/20 rounded-full blur-3xl group-hover:bg-teal-500/40 transition-all duration-300"></div>

        {/* Static Image (Idle State) - ALWAYS VISIBLE to prevent blinking */}
        <img
          src="/images/novee-idle.png"
          alt="Novee"
          className="absolute inset-0 z-10 w-full h-full object-contain drop-shadow-2xl"
          onError={(e) => { e.currentTarget.src = '/novee.png' }} // Fallback
        />

        {/* Video (Active State) - Overlays on hover */}
        <video
          ref={videoRef}
          src="/novee-wave.mp4"
          className={`absolute inset-0 z-20 w-full h-full object-cover rounded-full transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
          playsInline
        />
      </div>

      {/* 3. The Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="absolute bottom-6 right-0 w-[90vw] sm:w-[320px] h-[700px] bg-[#0a0a0a] rounded-2xl shadow-2xl border border-teal-500/30 overflow-hidden flex flex-col z-[10000]"
          >
            {/* Header */}
            <div className="bg-teal-600 p-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-lg">
                  🤖
                </div>
                <div>
                  <h3 className="font-bold text-white">Chat with Novee</h3>
                  <p className="text-xs text-teal-100">Online & Ready</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white">✕</button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 bg-[#111] p-4 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-teal-900 scrollbar-track-transparent">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-xl text-sm ${msg.sender === 'user' ? 'bg-teal-700 text-white rounded-br-none' : 'bg-gray-800 text-gray-100 rounded-bl-none'}`}>
                    {msg.text}
                    {msg.sender === 'ai' && (
                      <div className="mt-1 flex gap-2 border-t border-white/10 pt-1">
                        <button onClick={() => speakText(msg.text)} className="text-xs text-teal-400 hover:text-teal-200">Listen</button>
                        <button onClick={stopSpeak} className="text-xs text-gray-500 hover:text-gray-300">Stop</button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {error && <div className="text-red-500 text-xs text-center">{error}</div>}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className="p-3 bg-gray-900/80 border-t border-white/10 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 bg-black/50 border border-white/10 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-teal-500"
              />
              <button type="button" onClick={startListening} className={`p-2 rounded-full ${isListening ? 'text-red-500 animate-pulse' : 'text-gray-400 hover:text-teal-400'}`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
              </button>
              <button type="submit" className="p-2 bg-teal-600 text-white rounded-full hover:bg-teal-500 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
