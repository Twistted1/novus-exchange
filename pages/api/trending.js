
export default async function handler(req, res) {
    if (req.method !== 'GET') {
        res.setHeader('Allow', ['GET']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    // Set Cache-Control header to cache the response for 24 hours (86400 seconds)
    res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=43200');

    try {
        const { GoogleGenerativeAI } = require('@google/generative-ai');
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            console.warn('GEMINI_API_KEY not found, using fallback data');
            return res.status(200).json({ trending: getFallbackTrends() });
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

        const prompt = `You are a global news analyst. Identify the top 3 most important trending topics in global news RIGHT NOW (technology, geopolitics, economics, science, etc.).

For each topic, provide:
1. A concise title (5-7 words max)
2. The topic category (e.g., "Artificial Intelligence", "Geopolitics", "Climate")
3. A 2-sentence summary explaining why it's trending and its global impact
4. A brief 3-4 sentence analysis with more context

Format your response as valid JSON with this exact structure:
{
  "trends": [
    {
      "title": "Topic Title Here",
      "topic": "Category Name",
      "summary": "Two sentence summary here.",
      "details": "Three to four sentence analysis here."
    }
  ]
}

Focus on CURRENT, REAL events happening today. Be specific and factual.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Extract JSON from response (handle markdown code blocks)
        let jsonText = text.trim();
        if (jsonText.startsWith('```json')) {
            jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
        } else if (jsonText.startsWith('```')) {
            jsonText = jsonText.replace(/```\n?/g, '');
        }

        const data = JSON.parse(jsonText);

        // Add timestamps
        const trendsWithTimestamps = data.trends.map(trend => ({
            ...trend,
            timestamp: new Date().toISOString()
        }));

        res.status(200).json({ trending: trendsWithTimestamps });
    } catch (error) {
        console.error('Trending API Error:', error);
        // Return fallback data on error
        res.status(200).json({ trending: getFallbackTrends() });
    }
}

function getFallbackTrends() {
    return [
        {
            title: "AI Regulation Summit",
            topic: "Artificial Intelligence",
            summary: "Global leaders gather in Geneva to establish the first comprehensive framework for AI safety and ethics, aiming to curb autonomous weapon systems.",
            details: "## The Geneva AI Accord\n\nLeaders from 40 nations have convened...",
            timestamp: new Date().toISOString()
        },
        {
            title: "Quantum Computing Breakthrough",
            topic: "Technology",
            summary: "Researchers achieve quantum supremacy with a new stable qubit processor, potentially rendering current encryption standards obsolete within the decade.",
            details: "## Quantum Leap\n\nA joint team from...",
            timestamp: new Date().toISOString()
        },
        {
            title: "Global Water Futures",
            topic: "Resources",
            summary: "New desalination tech promises to lower costs by 60%, offering a lifeline to drought-stricken regions in North Africa and the Middle East.",
            details: "## Quenching the Thirst\n\nThe breakthrough uses...",
            timestamp: new Date().toISOString()
        }
    ];
}
