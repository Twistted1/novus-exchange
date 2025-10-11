import React, { useState, useRef, useEffect } from 'react';
import GlassCard from './GlassCard';
import { NovusMessage } from '../types';
import { renderMarkdown } from '../utils';

interface ChatbotProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    messages: NovusMessage[];
    onSendMessage: (message: string) => void;
}

const Chatbot: React.FC<ChatbotProps> = ({ isOpen, setIsOpen, messages, onSendMessage }) => {
    const [userInput, setUserInput] = useState('');
    const chatBodyRef = useRef<HTMLDivElement | null>(null);

    // Automatically scroll to the bottom when new messages are added
    useEffect(() => {
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (userInput.trim()) {
            onSendMessage(userInput);
            setUserInput('');
        }
    };

    return (
        <>
            {/* Chat Window */}
            <div
                className={`fixed bottom-28 right-4 sm:right-6 w-[calc(100vw-2rem)] max-w-sm h-[60vh] max-h-[500px] z-40 transition-all duration-300 ease-in-out ${
                isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'
                }`}
            >
                <GlassCard className="h-full flex flex-col p-0 overflow-hidden !border-cyan-400/60 !shadow-cyan-400/40">
                    {/* Header */}
                    <div className="flex items-center justify-between p-3 border-b border-white/10 shrink-0 bg-white/5">
                        <div className="flex items-center gap-2">
                           <svg className="w-6 h-6 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>
                            <h3 className="font-semibold text-white">Novus AI Assistant</h3>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-1 text-gray-400 rounded-full hover:bg-white/10 hover:text-white"
                            aria-label="Close chat"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </div>

                    {/* Body */}
                    <div ref={chatBodyRef} className="flex-grow p-4 overflow-y-auto space-y-4">
                        {messages.map((msg) => (
                             <div key={msg.id} className={`flex items-start gap-3 ${msg.source === 'user' ? 'justify-end' : ''}`}>
                                {msg.source === 'model' && (
                                    <div className="w-7 h-7 rounded-full bg-cyan-500/20 flex items-center justify-center shrink-0 border border-cyan-500/50">
                                       <svg className="w-4 h-4 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>
                                    </div>
                                )}
                                <div className={`p-3 rounded-xl max-w-xs sm:max-w-sm ${msg.source === 'user' ? 'bg-purple-500/30' : 'bg-black/20'}`}>
                                    {msg.isLoading ? (
                                        <div className="flex items-center space-x-1">
                                            <span className="w-2 h-2 bg-white/50 rounded-full animate-pulse [animation-delay:-0.3s]"></span>
                                            <span className="w-2 h-2 bg-white/50 rounded-full animate-pulse [animation-delay:-0.15s]"></span>
                                            <span className="w-2 h-2 bg-white/50 rounded-full animate-pulse"></span>
                                        </div>
                                    ) : (
                                        <div className="text-sm text-white prose prose-invert max-w-none prose-p:mb-2">{renderMarkdown(msg.text)}</div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Input */}
                    <div className="p-3 border-t border-white/10 shrink-0">
                        <form onSubmit={handleSend} className="flex items-center bg-white/10 rounded-lg p-1.5 gap-2">
                            <input
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                                placeholder="Ask Novus anything..."
                                className="flex-grow bg-transparent py-2 px-3 text-white focus:outline-none resize-none"
                            />
                            <button type="submit" className="p-2 text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors disabled:opacity-50" disabled={!userInput.trim()}>
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path></svg>
                            </button>
                        </form>
                    </div>
                </GlassCard>
            </div>

            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-red-500/50"
                aria-label={isOpen ? "Close chat" : "Open chat"}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
            </button>
        </>
    );
};

export default Chatbot;