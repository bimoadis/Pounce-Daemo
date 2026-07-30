export type ToolCard = {
  id: string;
  title: string;
  description: string;
  status: 'live' | 'soon';
};

// Sample/demo content describing PumpForge's generation capabilities.
// Only "forge_generate" is wired to the live API — the rest are on the roadmap.
export const TOOLS: ToolCard[] = [
  {
    id: 'forge_generate',
    title: 'forge_generate',
    description: 'Generate a token from any idea. Ticker, name, lore, description, vibe score, launch URL.',
    status: 'live',
  },
  {
    id: 'forge_audit',
    title: 'forge_audit',
    description: 'Audit a description for quality. Scores hook strength, clarity, and hype level.',
    status: 'soon',
  },
  {
    id: 'forge_narrative',
    title: 'forge_narrative',
    description: 'Write a 7-post launch thread. Structure: hook → lore → credibility → CTA.',
    status: 'soon',
  },
  {
    id: 'forge_image_prompt',
    title: 'forge_image_prompt',
    description: "Generate a logo / banner prompt for your token, formatted for AI image tools.",
    status: 'soon',
  },
  {
    id: 'forge_launch',
    title: 'forge_launch',
    description: 'Build a pre-filled pump.fun launch URL from ticker + name + description.',
    status: 'soon',
  },
  {
    id: 'forge_reply',
    title: 'forge_reply',
    description: 'Generate reply-guy content for crypto Twitter/X. Engagement-first tone.',
    status: 'soon',
  },
];
