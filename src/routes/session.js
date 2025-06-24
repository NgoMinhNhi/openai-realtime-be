import express from 'express';
import fetch from 'node-fetch';
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { model = 'gpt-4o-realtime-preview-2024-12-17', voice = 'verse' } = req.body;
    const r = await fetch('https://api.openai.com/v1/realtime/sessions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ model, voice })
    });
    const data = await r.json();
    if (!r.ok) return res.status(r.status).json(data);
    res.json({ token: data.client_secret.value, expires_at: data.client_secret.expires_at });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export default router;
