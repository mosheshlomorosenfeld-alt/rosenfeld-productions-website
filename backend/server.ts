import express from 'express';
import cors from 'cors';
import { z } from 'zod';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const app = express();
const port = Number(process.env.PORT || 8787);
const adminToken = process.env.ADMIN_TOKEN;
const allowedOrigin = process.env.FRONTEND_ORIGIN || '*';
const here = dirname(fileURLToPath(import.meta.url));
const dataFile = join(here, 'site.json');

const SiteSchema = z.object({
  heroTitle: z.string().min(1).max(120),
  heroSubtitle: z.string().max(240),
  bio: z.string().max(2000),
  email: z.string().email(),
  instagram: z.string().url(),
  tiktok: z.string().url(),
  spotify: z.string().url(),
  bookingNote: z.string().max(1000),
});

type Site = z.infer<typeof SiteSchema>;

const defaults: Site = {
  heroTitle: 'MAKE SOUND MOVE.',
  heroSubtitle: 'Singer. Songwriter. Producer. Built around the song.',
  bio: 'Modern Jewish pop, electronic energy and emotionally direct songwriting — made to live beyond the first listen.',
  email: 'mosheybc11@gmail.com',
  instagram: 'https://www.instagram.com/moshe_rosenfeld19/',
  tiktok: 'https://www.tiktok.com/@moshe_rosenfeld19/',
  spotify: 'https://open.spotify.com/search/MosheRosenfeld',
  bookingNote: 'Tell me what you are making, where it is at, and what you want it to become.',
};

function load(): Site {
  if (!existsSync(dataFile)) return defaults;
  try { return SiteSchema.parse(JSON.parse(readFileSync(dataFile, 'utf8'))); } catch { return defaults; }
}

app.use(cors({ origin: allowedOrigin }));
app.use(express.json({ limit: '200kb' }));

app.get('/health', (_req, res) => res.json({ ok: true, service: 'rosenfeld-productions-cms' }));
app.get('/api/site', (_req, res) => res.json(load()));

app.put('/api/site', (req, res) => {
  if (!adminToken) return res.status(503).json({ error: 'ADMIN_TOKEN is not configured.' });
  const supplied = String(req.headers.authorization || '').replace(/^Bearer\s+/i, '');
  if (!supplied || supplied !== adminToken) return res.status(401).json({ error: 'Unauthorized.' });

  const parsed = SiteSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: 'Invalid content.', details: parsed.error.flatten() });

  writeFileSync(dataFile, JSON.stringify(parsed.data, null, 2) + '\n', 'utf8');
  res.json({ ok: true, site: parsed.data });
});

app.listen(port, () => console.log(`Rosenfeld CMS listening on http://localhost:${port}`));
