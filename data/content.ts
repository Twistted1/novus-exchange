import { Article, Author } from '../types';

// PRODUCTION NOTE: For best performance, replace the placeholder avatarUrl with a direct link to a hosted image (e.g., from a CDN or image hosting service).
const marcioNovus: Author = {
  id: 'marcio-novus',
  name: 'Marcio Novus',
  avatarUrl: 'https://picsum.photos/seed/marcio-novus/200/200',
  bio: 'Marcio Novus is an investigative journalist and founder of Novus Exchange, dedicated to uncovering the truth behind complex global issues. With a background in economics and political science, Marcio provides in-depth analysis that challenges mainstream narratives.'
};

export const articles: Article[] = [
  {
    id: 1,
    title: 'Is AI Disproportionately Impacting Women\'s Jobs?',
    excerpt: 'AI is disproportionately impacting the women\'s job market, with recent research showing women’s jobs are much more likely to be automated or radically transformed by AI than men’s roles, especially in high-income countries.',
    content: `Is AI taking over women's job market?

AI is disproportionately impacting the women's job market, with recent research showing women’s jobs are much more likely to be automated or radically transformed by AI than men’s roles, especially in high-income countries.

**Women's Jobs at Greater Risk**
The UN's Gender Snapshot 2025 report estimates that 28% of women's jobs worldwide are at risk of automation from AI, compared to 21% of men's roles.

In high-income nations, the disparity is even greater: 41% of women's jobs could be exposed to AI automation versus 28% for men.

Women are overrepresented in roles that are highly susceptible—especially administrative, clerical, banking, insurance, and public sector jobs.

**Deepening Gender Gaps**
Rather than equalizing opportunities, current AI deployment is deepening existing gender gaps by concentrating disruption in female-dominated occupations.

The loss or transformation of these roles can reduce entry-level opportunities, further raising barriers to career advancement for women.

**Underrepresentation in AI Roles**
Women are generally underrepresented in AI-augmented or tech-driven roles, limiting their ability to benefit from these new opportunities and increasing vulnerability to automation.

In the technology sector itself, women make up only about 29% of the global workforce and just 14% of leadership positions.

**What Can Be Done?**
Experts emphasize targeted interventions like investing in women's digital and technical skills, upskilling, and gender-responsive policy solutions to prevent widening inequality.

Without such measures, AI-related disruption is likely to worsen the gender pay gap and erode progress on workplace gender equity.

In summary, it is accurate to say AI is disproportionately affecting jobs held by women and threatens to deepen workplace gender gaps unless proactive measures are taken.`,
    imageUrl: 'https://picsum.photos/seed/robot-reading-park/1200/800',
    category: 'Economic Insights',
    author: marcioNovus,
    date: 'October 26, 2023',
    readTime: 5,
    tags: ['AI', 'Future of Work', 'Gender Equality', 'Economics']
  },
  {
    id: 4,
    title: 'The UK\'s New Digital ID: Convenience vs. Surveillance',
    excerpt: 'The UK government is set to introduce a new digital identity (ID) scheme, often dubbed "BritCard," with a planned rollout to all UK citizens and legal residents by July 2029. The primary stated aim of this initiative is to combat illegal working and streamline access to various government and private sector services.',
    content: `The UK government is set to introduce a new digital identity (ID) scheme, often dubbed "BritCard," with a planned rollout to all UK citizens and legal residents by July 2029. The primary stated aim of this initiative is to combat illegal working and streamline access to various government and private sector services.

Here's a breakdown of the key aspects:

**Purpose and Scope:**
*   **Combating Illegal Working:** A central motivation is to make it tougher for illegal migrants to find work in the UK. The digital ID will be mandatory for Right to Work checks by the end of the Parliament.
*   **Streamlining Services:** The scheme aims to simplify access to public services such as driving licenses, childcare, welfare, and tax records.

[IMAGE:https://picsum.photos/seed/privacy/1200/800]

**How it Will Work:**
*   **Digital Wallet on Smartphones:** The digital ID will primarily be held on people's smartphones, similar to how millions already use the NHS App or contactless mobile payments.

[IMAGE:https://picsum.photos/seed/ukparliament/1200/800]

**Criticisms and Concerns:**
*   **Privacy and Surveillance:** Civil liberties campaigners and opposition parties have raised concerns about privacy, potential government overreach, and the risk of the system evolving into a mass surveillance tool.
*   **Cybersecurity Risks:** Experts have warned that a centralized digital ID system could create "an enormous hacking target" for a cybercriminal.

The government plans to hold a public consultation on the digital ID scheme later this year.`,
    imageUrl: 'https://picsum.photos/seed/ukid/1200/800',
    category: 'Political Commentary',
    author: marcioNovus,
    date: 'October 24, 2023',
    readTime: 4,
    tags: ['UK Politics', 'Technology', 'Privacy', 'Surveillance']
  },
    {
    id: 5,
    title: 'The Evolution of Corporate Social Responsibility',
    excerpt: 'Explore how modern corporations are integrating social and environmental concerns into their business operations. This article delves into the importance of CSR, its impact on brand reputation, and how companies are moving beyond profitability to create a positive societal impact.',
    // FIX: Converted the 'content' string to a template literal. The original single-quoted string was causing numerous parsing errors, likely due to malformed content that was being interpreted as code instead of a string. This change resolves the errors and improves consistency with other article objects.
    content: `Explore how modern corporations are integrating social and environmental concerns into their business operations. This article delves into the importance of CSR, its impact on brand reputation, and how companies are moving beyond profitability to create a positive societal impact, from ethical supply chains to community engagement. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 

[IMAGE:https://picsum.photos/seed/greenbiz/1200/800]
    
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 

[IMAGE:https://picsum.photos/seed/corporatesustainability/1200/800]

Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    imageUrl: 'https://picsum.photos/seed/csr/1200/800',
    category: 'Social Responsibility',
    author: marcioNovus,
    date: 'October 22, 2023',
    readTime: 6,
    tags: ['CSR', 'Business Ethics', 'Sustainability', 'Corporate Governance']
  },
];