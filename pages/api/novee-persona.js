import fs from 'fs'
import path from 'path'

export default function handler(req, res) {
  try {
    const filePath = path.join(process.cwd(), 'Novee Personality Protocol.md')
    const text = fs.readFileSync(filePath, 'utf8')
    // Soft cap to avoid huge payloads
    const maxLen = 12000
    const body = text.length > maxLen ? text.slice(0, maxLen) : text
    res.status(200).json({ persona: body })
  } catch (err) {
    res.status(200).json({ persona: 'You are Novee, a friendly, concise assistant for Novus Exchange. Keep answers short, helpful, and on-brand.' })
  }
}
