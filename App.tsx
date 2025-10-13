import React, { useState, useEffect, useRef } from 'react';
import { Page, Article, Author, NovusMessage, Trend } from './types';
import { articles as allArticles } from './data/content';
import { fileToGenerativePart } from './utils';
import { GoogleGenAI } from '@google/genai';

import Layout from './components/layout/Layout';
import Hero from './components/Hero';
import About from './components/About';
import Articles from './components/Articles';
import ArticlePage from './components/articles/ArticlePage';
import AuthorPage from './components/author/AuthorPage';
import GlobalTrending from './components/GlobalTrending';
import Contact from './components/Contact';
import AskNovus from './components/AskNovus';
import Chatbot from './components/Chatbot';

const App: React.FC = () => {
    const [activePage, setActivePage] = useState<Page>(Page.Home);
    const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
    const [selectedAuthor, setSelectedAuthor] = useState<Author | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredArticles, setFilteredArticles] = useState<Article[]>(allArticles);

    const [isChatbotOpen, setIsChatbotOpen] = useState(false);
    const [messages, setMessages] = useState<NovusMessage[]>([
        { id: 0, source: 'model', text: "Hello! I'm Novus, your AI research assistant. Ask me anything about our articles, global trends, or other complex topics." }
    ]);

    // Refs for scroll animations
    const aboutRef = useRef<HTMLElement>(null);
    const articlesRef = useRef<HTMLElement>(null);
    const trendingRef = useRef<HTMLElement>(null);
    const askNovusRef = useRef<HTMLElement>(null);
    const contactRef = useRef<HTMLElement>(null);

    // Intersection Observer for scroll animations
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries, obs) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        obs.unobserve(entry.target);
                    }
                });
            },
            {
                rootMargin: '0px',
                threshold: 0.05 // Lowered threshold for more reliable triggering
            }
        );
        const sections = [aboutRef, articlesRef, trendingRef, askNovusRef, contactRef];
        sections.forEach(ref => {
            if (ref.current) observer.observe(ref.current);
        });
        
        return () => {
            observer.disconnect();
        };
    }, []);

    // Filter articles when search query changes
    useEffect(() => {
        const lowercasedQuery = searchQuery.toLowerCase().trim();
        if (!lowercasedQuery) {
            setFilteredArticles(allArticles);
            return;
        }

        const results = allArticles.filter(article =>
            article.title.toLowerCase().includes(lowercasedQuery) ||
            article.excerpt.toLowerCase().includes(lowercasedQuery) ||
            article.tags.some(tag => tag.toLowerCase().includes(lowercasedQuery)) ||
            article.author.name.toLowerCase().includes(lowercasedQuery)
        );
        setFilteredArticles(results);

        if (searchQuery) {
            handleNavClick(Page.Articles);
        }
    }, [searchQuery]);

    const handleNavClick = (page: Page) => {
        if (activePage === Page.Article || activePage === Page.Author) {
            setActivePage(Page.Home);
            setSelectedArticle(null);
            setSelectedAuthor(null);
        }

        setTimeout(() => {
            if (page === Page.Home) {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                const element = document.getElementById(page);
                if (element) {
                    const headerOffset = 80;
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        }, 100);
    };

    const handleSelectArticle = (article: Article) => {
        setActivePage(Page.Article);
        setSelectedArticle(article);
        window.scrollTo(0, 0);
    };

    const handleSelectAuthor = (author: Author) => {
        setActivePage(Page.Author);
        setSelectedAuthor(author);
        window.scrollTo(0, 0);
    };

    const handleBackToHome = () => {
        setActivePage(Page.Home);
        setSelectedArticle(null);
        setSelectedAuthor(null);
    };

    const handleChatbotSendMessage = async (message: string) => {
        const userMessage: NovusMessage = {
            id: Date.now(),
            source: 'user',
            text: message,
        };
        const loadingMessage: NovusMessage = { id: Date.now() + 1, source: 'model', isLoading: true };
        setMessages(prev => [...prev, userMessage, loadingMessage]);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const articlesContext = allArticles.map(article =>
                `Title: ${article.title}\nExcerpt: ${article.excerpt}`
            ).join('\n\n');
    
            const fullPrompt = `Based on the context of the Novus Exchange website and its articles, answer the user's question.\n\nCONTEXT:\n${articlesContext}\n\nUSER QUESTION: "${message}"`;

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: fullPrompt,
                config: {
                    systemInstruction: "You are Novus, a specialized AI assistant for the 'Novus Exchange' website. Your sole purpose is to answer user questions about the website, its articles, its mission, and its author. You must be an expert on the provided article summaries. You cannot create images or answer questions outside of this context. If asked something unrelated, politely state that you can only answer questions about Novus Exchange.",
                }
            });
            
            const modelResponse: NovusMessage = {
                id: Date.now() + 2,
                source: 'model',
                text: response.text,
            };
            setMessages(prev => [...prev.slice(0, -1), modelResponse]);

        } catch (error: any) {
            console.error("AI content generation error:", error);
            const errorMessageText = `I'm sorry, an error occurred: ${error.message || 'The AI assistant is temporarily unavailable.'}`;
            
            const errorMessage: NovusMessage = {
                id: Date.now() + 2,
                source: 'model',
                text: errorMessageText,
            };
            setMessages(prev => [...prev.slice(0, -1), errorMessage]);
        }
    };
    
    const handleAskNovusHighlight = (text: string) => {
        const prompt = `A user highlighted the following text from one of our articles: "${text}"\n\nPlease provide a brief, insightful comment or a related question to encourage deeper thinking.`;
        handleChatbotSendMessage(prompt);
        setIsChatbotOpen(true);
    };
    
    const renderContent = () => {
        if (activePage === Page.Author && selectedAuthor) {
            const authorArticles = allArticles.filter(a => a.author.id === selectedAuthor.id);
            return <AuthorPage author={selectedAuthor} articles={authorArticles} onBack={handleBackToHome} onSelectArticle={handleSelectArticle} />;
        }

        if (activePage === Page.Article && selectedArticle) {
            return <ArticlePage article={selectedArticle} articles={allArticles} onBack={handleBackToHome} onSelectArticle={handleSelectArticle} onSelectAuthor={handleSelectAuthor} onAskNovusHighlight={handleAskNovusHighlight} />;
        }
        
        const sectionClasses = "min-h-screen scroll-mt-20 flex items-center justify-center px-4 sm:px-6 md:px-8";
        const contentWrapperClasses = "container mx-auto w-full -translate-y-10";
        
        return (
            <>
                <section id={Page.Home} className="relative min-h-screen flex items-center justify-center">
                    <Hero onNavClick={handleNavClick} />
                </section>

                <section id={Page.About} ref={aboutRef} className={`${sectionClasses} fade-in-section`}>
                    <div className={contentWrapperClasses}><About /></div>
                </section>

                <section id={Page.Articles} ref={articlesRef} className={`${sectionClasses} fade-in-parent-only`}>
                    <div className={contentWrapperClasses}>
                        <Articles articles={filteredArticles.slice(0, 3)} onSelectArticle={handleSelectArticle} showFilters={false} />
                    </div>
                </section>

                <section id={Page.GlobalTrending} ref={trendingRef} className={`${sectionClasses} fade-in-parent-only`}>
                    <div className={contentWrapperClasses}><GlobalTrending /></div>
                </section>

                <section id={Page.AskNovusAI} ref={askNovusRef} className={`${sectionClasses} fade-in-section`}>
                    <div className={contentWrapperClasses}>
                        <div className="text-center mb-10">
                            <h2 className="text-4xl font-bold text-white mb-4">Ask Novus</h2>
                            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                                Your intelligent research partner. Analyze topics, generate images, and get answers with voice or text.
                            </p>
                        </div>
                        <AskNovus onSearch={setSearchQuery} />
                    </div>
                </section>

                <section id={Page.Contact} ref={contactRef} className={`${sectionClasses} fade-in-section`}>
                    <div className={contentWrapperClasses}><Contact /></div>
                </section>
            </>
        );
    };

    return (
        <div className="bg-black text-gray-100 font-sans">
            <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-br from-gray-900 via-black to-blue-900/40 z-0 bg-pan-animation"></div>
            
            <Layout 
                activePage={activePage} 
                onNavClick={handleNavClick}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
            >
                {renderContent()}
            </Layout>

            <Chatbot 
                isOpen={isChatbotOpen} 
                setIsOpen={setIsChatbotOpen}
                messages={messages}
                onSendMessage={handleChatbotSendMessage}
            />
        </div>
    );
};

export default App;