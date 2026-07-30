// src/lib/generate-token.js
//
// Core logic shared by both the local Vite dev middleware (vite-api-plugin.js)
// and the Vercel serverless function (api/generate.js). Keeping it in one
// place means "npm run dev" and a real deployment behave identically.

const getBaseUrl = () => {
  const base = process.env.MEGALLM_BASE_URL;
  if (!base) return 'https://ai.megallm.io/v1/chat/completions';
  if (base.endsWith('/chat/completions') || base.endsWith('/messages')) return base;
  return `${base}/v1/chat/completions`;
};
const MEGALLM_URL = getBaseUrl();
const PUMP_FUN_CREATE_URL = 'https://pump.fun/create';

const SYSTEM_PROMPT = `You are a veteran pump.fun token strategist and copywriter.
Given a short idea from a user, invent ONE original memecoin concept inspired by it.

You must respond with PURE JSON and NOTHING ELSE — no markdown fences, no preamble,
no trailing commentary. The JSON object must have exactly these keys:

{
  "ticker": string,      // token symbol, ALWAYS starting with "$", max 10 chars, uppercase, no spaces
  "name": string,        // full token name, punchy, max 4 words
  "tagline": string,     // under 8 words, no ending period
  "description": string, // 2-3 sentences, pump.fun-style hype copy, no hashtags, no emojis
  "lore": string,        // exactly 1 sentence of backstory/mythology for the token
  "vibeScore": number    // integer from 1 to 10 rating how "pump.fun-able" the concept is
}

Rules:
- Never reuse the literal words from the user's idea as the ticker; transform them into something memorable.
- Keep everything safe-for-work and free of real public figures' names.
- Do not promise financial returns, price predictions, or investment advice anywhere in the copy.
- Output must be valid JSON parsable by JSON.parse with no surrounding text.`;

/**
 * Calls the MegaLLM chat completions endpoint and asks for a strict JSON reply.
 * @param {string} idea - free-text idea from the user
 * @returns {Promise<{ticker:string,name:string,tagline:string,description:string,lore:string,vibeScore:number}>}
 */
async function callMegaLLM(idea) {
  const apiKey = process.env.MEGALLM_API_KEY;
  if (!apiKey) {
    throw new Error(
      'MEGALLM_API_KEY is not set. Add it to your .env file (dev) or your Vercel project env vars (production).'
    );
  }

  const response = await fetch(MEGALLM_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: process.env.MEGALLM_MODEL || 'mimo-v2.5-pro',
      temperature: 0.9,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: `Idea: ${idea}` },
      ],
    }),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(`MegaLLM request failed (${response.status}): ${text.slice(0, 300)}`);
  }

  const data = await response.json();
  const raw = data?.choices?.[0]?.message?.content ?? '';
  const cleaned = raw.replace(/```json/gi, '').replace(/```/g, '').trim();

  let parsed;
  try {
    parsed = JSON.parse(cleaned);
  } catch (err) {
    throw new Error('MegaLLM did not return valid JSON: ' + cleaned.slice(0, 300));
  }

  return parsed;
}

function normalizeTicker(ticker) {
  if (!ticker) return '$TOKEN';
  const upper = String(ticker).toUpperCase().replace(/[^A-Z$]/g, '');
  return upper.startsWith('$') ? upper.slice(0, 10) : `$${upper}`.slice(0, 10);
}

function clampVibeScore(score) {
  const n = Number(score);
  if (Number.isNaN(n)) return 5;
  return Math.min(10, Math.max(1, Math.round(n)));
}

/**
 * Generates a full pump.fun-ready token concept from a plain-language idea.
 * @param {string} idea
 */
export async function generateToken(idea) {
  if (!idea || typeof idea !== 'string' || !idea.trim()) {
    throw new Error('An "idea" string is required.');
  }

  const llmResult = await callMegaLLM(idea.trim());

  const token = {
    ticker: normalizeTicker(llmResult.ticker),
    name: llmResult.name || 'Unnamed Token',
    tagline: llmResult.tagline || '',
    description: llmResult.description || '',
    lore: llmResult.lore || '',
    vibeScore: clampVibeScore(llmResult.vibeScore),
    pumpUrl: PUMP_FUN_CREATE_URL,
    generatedFrom: idea.trim(),
  };

  return token;
}
