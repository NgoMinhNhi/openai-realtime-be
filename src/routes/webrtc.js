import express from 'express';
import fetch from 'node-fetch';
const router = express.Router();

router.post('/', async (req, res) => {
  const { sdp, token, prompt } = req.body;
  if (!sdp || !token) return res.status(400).json({ error: 'Missing sdp or token' });

  const url = 'https://api.openai.com/v1/realtime?model=gpt-4o-realtime-preview-2024-12-17';
  const r = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/sdp'
    },
    body: sdp
  });
  const sdpAnswer = await r.text();

  // Gửi prompt ngữ cảnh nếu có
  const sessionUpdate = prompt
    ? {
        type: 'session.update',
        session: { instructions: prompt, input_audio_transcription: { model: 'whisper-1' } }
      }
    : null;

  res.json({ sdp: sdpAnswer, sessionUpdate });
});

export default router;
