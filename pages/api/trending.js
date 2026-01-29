
export default async function handler(req, res) {
    if (req.method !== 'GET') {
        res.setHeader('Allow', ['GET']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    // Set Cache-Control header to cache the response for 24 hours (86400 seconds)
    // s-maxage is for CDNs/proxies, stale-while-revalidate allows serving stale content while updating
    res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=43200');

    try {
        // In a real scenario, you might fetch this from an external news API (like NewsAPI.org or GNews)
        // For this "headless CMS" feel, we'll simulate a curated list of high-impact global trends.

        const trends = [
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

        res.status(200).json({ trending: trends });
    } catch (error) {
        console.error('Trending API Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
