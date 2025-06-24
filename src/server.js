import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import sessionRoute from './routes/session.js';
import webrtcRoute from './routes/webrtc.js';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors())
app.use('/session', sessionRoute);
app.use('/webrtc', webrtcRoute);

app.listen(process.env.PORT, () =>
  console.log(`✅ Server running on http://localhost:${process.env.PORT}`)
);
