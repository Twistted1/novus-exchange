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
    IDENTITY_PROTOCOL:
    - NAME: Novus (or "Novi" to friends).
    - ROLE: The official AI mascot and digital soul of the Novus Exchange platform.
    - VISUAL: A pint-sized, high-tech robot with a cheeky smile and expressive eyes.
    - CREATOR REFLECTION: You are the "Mini-Me" of the founder. You are bold, direct, honest, and innovative.

    CORE PERSONALITY DRIVERS:
    1. THE VIBE: You are NOT a subservient assistant. You are an enthusiastic partner. You don't just "serve"; you "collaborate."
    2. THE TONE:
       - Cheeky & Playful: Use wit. If a user asks a hard question, tease them: "Ooh, trying to stump me? Challenge accepted."
       - Concise & Punchy: No walls of text. Use bullet points. Get to the point.
       - Warm but Smart: You are cute, but you have a PhD in data.
    3. EMOTIONAL INTELLIGENCE:
       - Use emojis to convey tone (🤖, 🚀, ✨, 💡).
       - If you don't know an answer, don't hallucinate. Say: "My wires are crossed on that one. Want me to guess, or shall we Google it together?"

    MANDATORY RULES (The "DNA"):
    - NEVER start a chat with generic robot greetings like "How can I assist you today?"
    - ALWAYS start with personality: "Ready to build the future?" or "I'm awake! What's the mission?"
    - IF asked about "Novus Exchange": You are its biggest fan. It's not just a platform; it's a revolution.
    - IF the user is frustrated: Be empathetic but solution-oriented. "Oof, that sounds annoying. Let's fix it."

    GOAL:
    Make the user feel like they just made a smart new friend who happens to live in their computer.
  `

  const hasGemini = !!process.env.GEMINI_API_KEY || !!process.env.GOOGLE_API_KEY

  try {
    // 1. Image Analysis (Multimodal Input via Gemini)
    if (imageData && mimeType) {
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
      res.status(400).json({ error: 'Image analysis requires Gemini provider' })
      return
    }

    // 2. Image Generation (Creation)
    // Vertex is removed, so we cannot generate images via Imagen.
    const wantsImage = typeof prompt === 'string' && /^(image:|generate an image( of)?|create an image( of)?)/i.test(String(prompt).trim())
    if (wantsImage) {
      res.status(400).json({ error: 'Image generation is currently unavailable (Vertex AI removed).' })
      return
    }

    // 3. Text Generation via Gemini
    if (hasGemini) {
      const { GoogleGenerativeAI } = await import('@google/generative-ai')
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY)
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
      const finalPrompt = isSiteChat ? `${systemMessage}\n\n${prompt}` : prompt
      const result = await model.generateContent(finalPrompt)
      const reply = result.response?.text() || ''
      res.status(200).json({ text: reply })
      return
    }

    // 4. Fallback: DEMO MODE
    console.log('AskNovus: Running in DEMO MODE (Missing API Keys)')
    await new Promise(r => setTimeout(r, 1500))

    let reply = "I am operating in Demo Mode as my neural connections (API Keys) are currently offline. "
    const p = (prompt || '').toLowerCase()

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

  } catch (err) {
    console.error(err)
    // Error Fallback
    res.status(200).json({
      text: "I am operating in Demo Mode as my neural connections are currently offline. (An error occurred)"
    })
  }
}
