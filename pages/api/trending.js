import { VertexAI } from '@google-cloud/vertexai'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method Not Allowed' })
    return
  }

  // Cache for 24 hours
  // Cache for 6 hours, with stale-while-revalidate for 3 hours
  res.setHeader('Cache-Control', 'public, s-maxage=21600, stale-while-revalidate=10800');

  // Fallback static data in case AI fails
  const fallbackData = [
    { id: 1, title: 'Global AI Summit Hits Record Attendance', image: 'https://placehold.co/1920x1080/0f172a/cbd5e1?text=Global+AI+Summit', summary: 'World leaders and tech giants convene to discuss safe AI regulation and future economic impacts.', details: 'The 2025 Global AI Summit has concluded with a landmark agreement on safety standards. Representatives from over 50 nations tailored a new framework...' },
    { id: 2, title: 'Crypto Markets React to New US Regs', image: 'https://placehold.co/1920x1080/334155/e2e8f0?text=Crypto+Regulations', summary: 'Bitcoin and Ethereum see sharp volatility as the SEC unveils a comprehensive digital asset framework.', details: 'Traders are scrambling to adjust portfolios as the new Digital Asset Security Act aims to classify most tokens...' },
    { id: 3, title: 'Electric Aviation: The Next Frontier', image: 'https://placehold.co/1920x1080/1e293b/94a3b8?text=Electric+Aviation', summary: 'Major airlines place orders for short-haul electric aircraft, signalling a shift in regional travel.', details: 'With battery density breaking new records, commercial electric flights are no longer science fiction...' }
  ]

  try {
    const provider = process.env.AI_PROVIDER
    const prompt = `Act as a top-tier intelligence analyst. Generate 3 "Global Trending" intelligence briefings based on real-world events from the last 24-48 hours (geopolitics, economy, technology). 
    Format as a valid JSON array of objects with keys: "id" (number), "title" (string), "summary" (high-level overview, 1-2 sentences), "details" (deep analysis in markdown format, 3-4 paragraphs), "image" (use a placeholder URL like https://placehold.co/1080x1080/1a1a1a/fff?text=TOPIC_NAME).
    Ensure the content is serious, analytical, and professional. Do NOT use Markdown code blocks around the JSON. Return ONLY the raw JSON string.`

    let jsonText = ''

    if (process.env.VERTEX_PROJECT_ID && process.env.VERTEX_LOCATION) {
      console.log('Fetching trending via Vertex AI...');
      const vertex = new VertexAI({ project: process.env.VERTEX_PROJECT_ID, location: process.env.VERTEX_LOCATION })
      const model = vertex.getGenerativeModel({ model: 'gemini-1.5-flash' })
      const result = await model.generateContent(prompt)
      jsonText = result.response.text()
    } else if (process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY) {
      console.log('Fetching trending via Cloud Gemini API...');
      const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
      });

      if (!response.ok) throw new Error(`Gemini API Error: ${response.statusText}`);

      const data = await response.json();
      jsonText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    } else {
      console.warn('No AI credentials found. Using fallback data.');
      return res.status(200).json({ trending: fallbackData })
    }

    // Clean markdown code blocks if present
    jsonText = jsonText.replace(/```json/g, '').replace(/```/g, '').trim()
    const trending = JSON.parse(jsonText)
    res.status(200).json({ trending })

  } catch (err) {
    console.error('Trending API Error:', err)
    res.status(200).json({ trending: fallbackData })
  }
}
