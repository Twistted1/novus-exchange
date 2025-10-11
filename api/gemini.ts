import type { VercelRequest, VercelResponse } from '@vercel/node';

// This is a Vercel Serverless Function that acts as a proxy to the Google Gemini API.
// It securely uses the API_KEY from environment variables and forwards requests from the client.
export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { model, contents, config } = req.body;

    if (!model || !contents) {
        return res.status(400).json({ error: 'Missing model or contents in request body' });
    }

    const apiKey = process.env.API_KEY;
    if (!apiKey) {
        console.error('API_KEY is not set in environment variables.');
        return res.status(500).json({ error: 'API key not configured on the server.' });
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    try {
        const generationConfig = (config?.responseMimeType || config?.responseSchema) ? {
            responseMimeType: config.responseMimeType,
            responseSchema: config.responseSchema,
        } : undefined;

        let requestContents;
        if (typeof contents === 'string') {
            requestContents = [{ parts: [{ text: contents }] }];
        } else if (contents.parts) {
            requestContents = [contents];
        } else {
             return res.status(400).json({ error: 'Invalid contents format' });
        }

        const body = {
            contents: requestContents,
            ...(config?.systemInstruction && { systemInstruction: { parts: [{ text: config.systemInstruction }] } }),
            ...(generationConfig && { generationConfig }),
        };

        const geminiResponse = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        const responseData = await geminiResponse.json();

        if (!geminiResponse.ok) {
            console.error('Gemini API Error:', responseData);
            const errorMessage = responseData?.error?.message || 'An unknown error occurred with the Gemini API.';
            return res.status(geminiResponse.status).json({ error: errorMessage });
        }

        // The SDK has a .text accessor, but the REST API does not.
        // We'll add it here for compatibility with the existing frontend code.
        const text = responseData.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
        
        return res.status(200).json({ ...responseData, text });

    } catch (error: any) {
        console.error('Proxy Internal Server Error:', error);
        return res.status(500).json({ error: error.message || 'An internal server error occurred.' });
    }
}
