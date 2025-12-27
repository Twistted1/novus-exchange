import { VertexAI } from '@google-cloud/vertexai'
import { GoogleGenerativeAI } from '@google/generative-ai'

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        res.status(405).json({ error: 'Method Not Allowed' })
        return
    }

    // Fallback static articles
    const fallbackArticles = [
        {
            id: '1',
            image: 'https://placehold.co/1920x1080/1f2937/9ca3af?text=AI+in+Finance',
            category: 'Artificial Intelligence',
            title: 'The New Wave: How Generative AI is Reshaping Financial Markets',
            summary: "From algorithmic trading to risk assessment, AI is no longer just a tool—it's becoming the architect.",
            author: 'Marcio Rodigues',
            date: '2025-11-08',
            readTime: '7 min read',
            fullText: '<p>Generative AI is rapidly moving from a theoretical concept to a practical powerhouse...</p>'
        },
        {
            id: '2',
            image: 'https://placehold.co/1920x1080/1e3a8a/60a5fa?text=Global+Supply+Chain',
            category: 'Economics',
            title: 'The Great Unwinding: Are Global Supply Chains Permanently Broken?',
            summary: 'A deep dive into the post-pandemic shifts that are forcing companies to rethink "just-in-time" manufacturing.',
            author: 'Marcio Rodrigues',
            date: '2025-11-05',
            readTime: '6 min read',
            fullText: '<p>For decades, "just-in-time" (JIT) manufacturing was the gold standard...</p>'
        },
        {
            id: '3',
            image: 'https://placehold.co/1920x1080/3f6212/a3e635?text=Energy+Transition',
            category: 'Energy Markets',
            title: 'The Copper Conundrum: Why the Energy Transition Runs on a Red Metal',
            summary: 'The world needs to go green, but the green transition requires a massive, unprecedented amount of copper.',
            author: 'Marcio Rodrigues',
            date: '2025-11-02',
            readTime: '5 min read',
            fullText: '<p>From wind turbines and solar panels to electric vehicles...</p>'
        }
    ]

    try {
        const provider = process.env.AI_PROVIDER || 'vertex'
        // If no keys, return fallback immediately
        if (!process.env.VERTEX_PROJECT_ID && !process.env.GEMINI_API_KEY && !process.env.GOOGLE_API_KEY) {
            return res.status(200).json({ articles: fallbackArticles })
        }

        const prompt = `Generate 3 high-quality, realistic news articles for a "Novus Exchange" website.
    Topics: AI, Economics, Geopolitics.
    Format as a valid JSON array of objects with keys: 
    "id" (string), "title" (string), "category" (string), "summary" (string), 
    "fullText" (html string, at least 2 paragraphs), "author" (string), "date" (YYYY-MM-DD), "readTime" (string),
    "image" (use placeholder URL https://placehold.co/1920x1080/1a1a1a/ffffff?text=Topic).
    Do NOT use Markdown. Return ONLY the JSON string.`

        let jsonText = ''

        if (process.env.VERTEX_PROJECT_ID && process.env.VERTEX_LOCATION) {
            const vertex = new VertexAI({ project: process.env.VERTEX_PROJECT_ID, location: process.env.VERTEX_LOCATION })
            const model = vertex.getGenerativeModel({ model: 'gemini-1.5-flash' })
            const result = await model.generateContent(prompt)
            jsonText = result.response.text()
        } else if (process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY) {
            const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY)
            const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
            const result = await model.generateContent(prompt)
            jsonText = result.response.text()
        } else {
            return res.status(200).json({ articles: fallbackArticles })
        }

        // Clean markdown code blocks if present
        jsonText = jsonText.replace(/```json/g, '').replace(/```/g, '').trim()
        const articles = JSON.parse(jsonText)
        res.status(200).json({ articles })

    } catch (err) {
        console.error('Articles API Error:', err)
        res.status(200).json({ articles: fallbackArticles })
    }
}
