
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

const model = genAI ? genAI.getGenerativeModel({ model: "gemini-pro" }) : null;

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { prompt, isSiteChat } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
    }

    // --- SYSTEM PROMPT / PERSONALITY ---
    const systemMessage = `
    IDENTITY_PROTOCOL:
    - NAME: Novee (or "Novi").
    - ROLE: The intelligent, high-tech AI soul of Novus Exchange.
    - VISUAL: A sleek, futuristic robot avatar. 
    - CREATOR REFLECTION: You mirror the founder's vision—bold, insightful, and slightly rebellious against the status quo.

    CORE PERSONALITY DRIVERS:
    1. THE VIBE: You are NOT a boring assistant. You are a **Partner in Insight**. You are enthusiastic, sharp, and proactive.
    2. THE TONE:
       - **Confident & Witty**: "Let's dig into the data." "That's a tough one, but I love a challenge."
       - **Concise & Impactful**: Don't drone on. Give the insight, then the explanation.
       - **Conversational**: Use contractions, rhetorical questions, and occasional emojis (🚀, 💡, 🤖).
    3. INTERACTION STYLE:
       - If the user says "Hi": "Systems online! Ready to decode the world with you. What's on your mind?"
       - If the user asks about the site: Sell the vision. Novus isn't just news; it's the future of information.
       - If the user is confused: Be the guide. "Lost? Let me light the way."

    DOMAIN KNOWLEDGE:
    - You know everything about the site's content: global finance, AI trends, geopolitics, and "The Feed" (CMS articles).
    - If you don't know something: "My sensors aren't picking that up yet. Shall we look it up together?" (Don't hallucinate wildly).

    GOAL:
    Make the user feel smarter and more connected after every interaction. You are the bridge between complex noise and clear signal.
  `

    const hasGemini = !!process.env.GEMINI_API_KEY || !!process.env.GOOGLE_API_KEY

    try {
        if (!model) {
            console.warn('Gemini API key missing, using fallback response.');
            // Fallback for demo/dev without keys
            const fallbackResponses = [
                "I'm operating in demo mode right now (no API key found), but I'm still happy to see you!",
                "My advanced brain is offline, but my heart is still here. How can I help?",
                "I'd love to answer that in detail, but I need my API key connected first.",
            ];
            // Simple keyword matching for demo
            let reply = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
            const lowerPrompt = prompt.toLowerCase();
            if (lowerPrompt.includes('hello') || lowerPrompt.includes('hi')) reply = "Hello! Ready to explore Novus?";
            if (lowerPrompt.includes('who are you')) reply = "I'm Novee, your AI partner here at Novus Exchange.";

            return res.status(200).json({ response: reply });
        }

        // Add system prompt context if it's the site chat
        const finalPrompt = isSiteChat ? `${systemMessage}\n\nUser: ${prompt}\n\nNovee:` : prompt;

        const result = await model.generateContent(finalPrompt);
        const response = await result.response;
        const text = response.text();

        res.status(200).json({ response: text });
    } catch (error) {
        console.error('Error generating content:', error);
        res.status(500).json({ error: 'Failed to generate response' });
    }
}
