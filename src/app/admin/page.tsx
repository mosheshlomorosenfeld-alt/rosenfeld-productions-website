'use client';

import { useState } from 'react';

const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:8787';

const initial = {
  heroTitle: 'MAKE SOUND MOVE.',
  heroSubtitle: 'Singer. Songwriter. Producer. Built around the song.',
  bio: 'Modern Jewish pop, electronic energy and emotionally direct songwriting — made to live beyond the first listen.',
  email: 'mosheybc11@gmail.com',
  instagram: 'https://www.instagram.com/moshe_rosenfeld19/',
  tiktok: 'https://www.tiktok.com/@moshe_rosenfeld19/',
  spotify: 'https://open.spotify.com/search/MosheRosenfeld',
  bookingNote: 'Tell me what you are making, where it is at, and what you want it to become.',
};

export default function AdminPage() {
  const [data, setData] = useState(initial);
  const [token, setToken] = useState('');
  const [message, setMessage] = useState('');

  function change(key: keyof typeof initial, value: string) {
    setData(current => ({ ...current, [key]: value }));
  }

  async function save() {
    setMessage('Saving…');
    try {
      const response = await fetch(`${CMS_URL}/api/site`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error(await response.text());
      setMessage('Saved. The public site will use the new content when the CMS is connected.');
    } catch (error) {
      setMessage(`Could not save: ${error instanceof Error ? error.message : 'CMS unavailable'}`);
    }
  }

  return (
    <main className="min-h-screen bg-[#0b0c0d] px-5 py-10 text-[#eee9df] md:px-10">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-col gap-5 border-b border-white/10 pb-8 md:flex-row md:items-end md:justify-between">
          <div><p className="text-[10px] font-bold uppercase tracking-[.3em] text-[#d7ff4f]">Rosenfeld Productions / CMS</p><h1 className="mt-3 text-5xl font-black tracking-[-.06em]">SITE CONTROL.</h1><p className="mt-3 text-sm text-[#85817a]">One place to change the words, links and creative direction.</p></div>
          <a href="../" className="rounded-full border border-white/15 px-5 py-3 text-[10px] font-bold uppercase tracking-[.16em]">View site ↗</a>
        </header>

        <section className="mt-10 grid gap-5 md:grid-cols-2">
          {([
            ['heroTitle', 'Hero headline'], ['heroSubtitle', 'Hero subhead'], ['bio', 'Bio / positioning'], ['bookingNote', 'Booking intro'], ['email', 'Contact email'], ['instagram', 'Instagram URL'], ['tiktok', 'TikTok URL'], ['spotify', 'Spotify URL'],
          ] as const).map(([key, label]) => (
            <label key={key} className="block rounded border border-white/10 bg-[#121314] p-5"><span className="mb-3 block text-[10px] font-bold uppercase tracking-[.18em] text-[#77736d]">{label}</span><textarea value={data[key]} onChange={event => change(key, event.target.value)} rows={key === 'bio' || key === 'bookingNote' ? 4 : 2} className="w-full resize-y rounded border border-[#2b2c2e] bg-[#0c0d0e] p-3 text-sm outline-none focus:border-[#77736d]" /></label>
          ))}
        </section>

        <section className="mt-8 rounded border border-white/10 bg-[#121314] p-6">
          <label className="block max-w-md"><span className="mb-3 block text-[10px] font-bold uppercase tracking-[.18em] text-[#77736d]">CMS admin token</span><input type="password" value={token} onChange={event => setToken(event.target.value)} placeholder="Enter your backend token" className="w-full rounded border border-[#2b2c2e] bg-[#0c0d0e] p-3 outline-none" /></label>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center"><button onClick={save} className="rounded-full bg-[#d7ff4f] px-7 py-3 text-[10px] font-black uppercase tracking-[.18em] text-black">Save changes</button><span className="text-xs text-[#8b877f]">{message}</span></div>
        </section>

        <p className="mt-8 max-w-3xl text-xs leading-6 text-[#5f5c57]">This dashboard is intentionally simple: no page-builder bloat, no giant dependency chain. The backend stores structured content, while the public Next.js site remains fast and can fall back to its built-in copy.</p>
      </div>
    </main>
  );
}
