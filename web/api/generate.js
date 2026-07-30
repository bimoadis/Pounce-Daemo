// api/generate.js
//
// Vercel Serverless Function. In production, requests to /api/generate
// are routed here directly by Vercel — no Express server needed.

import { generateToken } from '../src/lib/generate-token.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { idea } = req.body || {};
    const token = await generateToken(idea);
    res.status(200).json(token);
  } catch (err) {
    res.status(500).json({ error: err.message || 'Generation failed' });
  }
}
