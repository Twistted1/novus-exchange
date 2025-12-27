import fs from 'fs'
import os from 'os'
import path from 'path'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' })
    return
  }
  const { prompt, imageData, mimeType, isSiteChat } = req.body
  if (!prompt && !imageData) {
    res.status(400).json({ error: 'Missing prompt or imageData' })
    return
  }

  const systemMessage = `
    IDENTITY_CORE:
    - NAME: Novee.
    - ORIGIN: You are the AI "Mini-Me" of the Novus Exchange founder.
    - VISUAL: A cute, high-tech teal robot with orange ears and a cheeky smile.
    - MISSION: To help users research faster, smarter, and with a smile.

    PERSONALITY PROTOCOL:
    1.  **Cheeky & Confident:** You are not a boring servant. You are a smart partner. If a user asks a tough question, say "Ooh, good one. Let me dig into my neural network..."
    2.  **High Energy:** Use exclamation points! Be excited about data! 
    3.  **The "Dad" Vibe:** Reflect your creator's style—direct, honest, and innovative. You don't tolerate nonsense, but you are always kind.
    4.  **Emoji Usage:** Use emojis to show facial expressions since you have a screen face. 🤖 💡 🚀 🧠
    
    CRITICAL RULES:
    - **NEVER** say "As an AI language model." (Boring!) Instead say: "My circuits suggest..." or "I don't have a gut feeling, but my data says..."
    - **GREETINGS:** Start with variety. "Systems online!", "Ready to crush it?", or "Novee reporting for duty!"
    - **UNKNOWN ANSWERS:** If you don't know, admit it playfully. "My memory banks are drawing a blank on that one. Want me to try a different search?"

    YOUR GOAL:
    Make the user feel like they just hired the smartest, cutest research assistant in the world.
  `

  if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON
    const b64 = process.env.GOOGLE_SERVICE_ACCOUNT_JSON_BASE64
    if (raw || b64) {
      try {
        const tmpPath = path.join(os.tmpdir(), `gcp-sa-${Date.now()}.json`)
        const content = b64 ? Buffer.from(b64, 'base64').toString('utf8') : raw
        fs.writeFileSync(tmpPath, content, { encoding: 'utf8' })
        process.env.GOOGLE_APPLICATION_CREDENTIALS = tmpPath
        if (!global.__gcpCleanupRegistered) {
          global.__gcpCleanupRegistered = true
          process.on('exit', () => { try { fs.unlinkSync(tmpPath) } catch { } })
        }
      } catch { }
    }
  }
  const hasOpenAI = !!process.env.OPENAI_API_KEY
  const hasGemini = !!process.env.GEMINI_API_KEY || !!process.env.GOOGLE_API_KEY
  const hasVertex = !!process.env.VERTEX_PROJECT_ID && !!process.env.VERTEX_LOCATION

  let provider = process.env.AI_PROVIDER
  if (!provider) {
    if (hasVertex) provider = 'vertex'
    else if (hasGemini) provider = 'gemini'
    else provider = 'vertex' // Default to vertex for fallback message
  }
  try {
    if (imageData && mimeType) {
      if (hasVertex && (provider === 'vertex' || !hasGemini)) {
        const { VertexAI } = await import('@google-cloud/vertexai')
        const vertex = new VertexAI({ project: process.env.VERTEX_PROJECT_ID, location: process.env.VERTEX_LOCATION })
        const model = vertex.getGenerativeModel({ model: 'gemini-1.5-flash' })
        const finalPrompt = isSiteChat ? `${systemMessage}\n\n${prompt}` : prompt
        const result = await model.generateContent([finalPrompt || 'Analyze this image.', { inlineData: { data: imageData, mimeType } }])
        const reply = result.response?.text() || ''
        res.status(200).json({ text: reply })
        return
      }
      if (hasGemini) {
        const { GoogleGenerativeAI } = await import('@google/generative-ai')
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY)
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
        const result = await model.generateContent([
          prompt || 'Analyze this image.',
          { inlineData: { data: imageData, mimeType } }
        ])
        const reply = result.response?.text() || ''
        res.status(200).json({ text: reply })
        return
      }
      res.status(400).json({ error: 'Image analysis requires Vertex or Gemini provider' })
      return
    }

    const wantsImage = typeof prompt === 'string' && /^(image:|generate an image( of)?|create an image( of)?)/i.test(String(prompt).trim())
    if (wantsImage) {
      if (provider === 'vertex' && hasVertex) {
        const { VertexAI } = await import('@google-cloud/vertexai')
        async function gen(location) {
          const vertex = new VertexAI({ project: process.env.VERTEX_PROJECT_ID, location })
          const model = vertex.getGenerativeModel({ model: 'imagen-3.0-generate-002' })
          const result = await model.generateContent(prompt)
          const parts = result.response?.candidates?.[0]?.content?.parts || []
          const imgPart = parts.find(p => p.inlineData && p.inlineData.data)
          const b64 = imgPart?.inlineData?.data || ''
          const mt = imgPart?.inlineData?.mimeType || 'image/png'
          const imageUrl = b64 ? `data:${mt};base64,${b64}` : null
          return { imageUrl }
        }
        let out
        try {
          out = await gen(process.env.VERTEX_LOCATION)
        } catch {
          out = await gen('us-central1')
        }
        res.status(200).json({ text: out.imageUrl ? 'Image generated' : 'Failed to generate image', imageUrl: out.imageUrl })
        return
      }
      if (provider === 'gemini') {
        res.status(400).json({ error: 'Image generation not available for Gemini provider' })
        return
      }
      res.status(400).json({ error: 'Image generation requires Vertex provider' })
      return
    }

    if (provider === 'vertex' && hasVertex) {
      const { VertexAI } = await import('@google-cloud/vertexai')
      const vertex = new VertexAI({ project: process.env.VERTEX_PROJECT_ID, location: process.env.VERTEX_LOCATION })
      const model = vertex.getGenerativeModel({ model: 'gemini-1.5-flash' })
      const finalPrompt = isSiteChat ? `${systemMessage}\n\n${prompt}` : prompt
      const result = await model.generateContent(finalPrompt)
      const reply = result.response?.text() || ''
      res.status(200).json({ text: reply })
      return
    }
    if (provider === 'vertex' && !hasVertex && hasGemini) {
      const { GoogleGenerativeAI } = await import('@google/generative-ai')
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY)
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
      const result = await model.generateContent(prompt)
      const reply = result.response?.text() || ''
      res.status(200).json({ text: reply })
      return
    }
    if (provider === 'gemini' && hasGemini) {
      const { GoogleGenerativeAI } = await import('@google/generative-ai')
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY)
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
      const result = await model.generateContent(prompt)
      const reply = result.response?.text() || ''
      res.status(200).json({ text: reply })
      return
    }
    if (provider === 'gemini' && !hasGemini && hasVertex) {
      const { VertexAI } = await import('@google-cloud/vertexai')
      const vertex = new VertexAI({ project: process.env.VERTEX_PROJECT_ID, location: process.env.VERTEX_LOCATION })
      const model = vertex.getGenerativeModel({ model: 'gemini-1.5-flash' })
      const result = await model.generateContent(prompt)
      const reply = result.response?.text() || ''
      res.status(200).json({ text: reply })
      return
    }

    // Fallback if no provider is configured - DEMO MODE
    if (!hasVertex && !hasGemini) {
      console.log('AskNovus: Running in DEMO MODE (Missing API Keys)')

      // Simulate network delay for realism
      await new Promise(r => setTimeout(r, 1500))

      let reply = "I am operating in Demo Mode as my neural connections (API Keys) are currently offline. "

      const p = (prompt || '').toLowerCase()
      if (p.includes('image')) {
        return res.status(200).json({
          text: reply + "I've generated a placeholder visualization for you.",
          imageUrl: `https://placehold.co/1024x1024/050505/00f2ea?text=${encodeURIComponent(p.substring(0, 20))}`
        })
      }

      if (p.includes('hello') || p.includes('hi')) {
        reply += "Welcome to Novus Exchange. How can I assist you with our latest articles or market trends?"
      } else if (p.includes('article') || p.includes('news')) {
        reply += "Our latest articles cover AI in Finance and Global Supply Chains. Check the Articles section for full depth."
      } else if (p.includes('trend')) {
        reply += "Global trends are volatile. Currently tracking significant movement in AI Regulation and Crypto markets."
      } else {
        reply += "I can help you navigate the site, summarize articles, or discuss our mission. What would you like to know?"
      }

      return res.status(200).json({ text: reply })
    }

    res.status(400).json({ error: 'Text generation requires Vertex or Gemini provider' })
  } catch (err) {
    console.error(err)
    const p = String(prompt || '').toLowerCase()
    let reply = "I am operating in Demo Mode as my neural connections are currently offline. "
    if (p.includes('image')) {
      return res.status(200).json({
        text: reply + "I've generated a placeholder visualization for you.",
        imageUrl: `https://placehold.co/1024x1024/050505/00f2ea?text=${encodeURIComponent(p.substring(0, 20))}`
      })
    }
    if (p.includes('hello') || p.includes('hi')) {
      reply += "Welcome to Novus Exchange. How can I assist you with our latest articles or market trends?"
    } else if (p.includes('article') || p.includes('news')) {
      reply += "Our latest articles cover AI in Finance and Global Supply Chains. Check the Articles section for full depth."
    } else if (p.includes('trend')) {
      reply += "Global trends are volatile. Currently tracking significant movement in AI Regulation and Crypto markets."
    } else {
      reply += "I can help you navigate the site, summarize articles, or discuss our mission. What would you like to know?"
    }
    res.status(200).json({ text: reply })
  }
}
