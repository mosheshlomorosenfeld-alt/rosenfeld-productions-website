'use client';

import { FormEvent, useState } from 'react';

const INBOX = 'mosheybc11@gmail.com';

export function ContactForm() {
  const [sent, setSent] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get('name') || '');
    const email = String(form.get('email') || '');
    const subject = String(form.get('subject') || 'New Rosenfeld Productions inquiry');
    const type = String(form.get('type') || 'General');
    const message = String(form.get('message') || '');

    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Inquiry type: ${type}`,
      '',
      message,
    ].join('\n');

    window.location.href = `mailto:${INBOX}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <section id="contact" className="border-t border-white/10 bg-[#0d0e0f] px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 md:grid-cols-[.8fr_1.2fr]">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[.32em] text-[#b7b1a6]">Open line</p>
          <h2 className="mt-5 max-w-lg text-5xl font-black leading-[.92] tracking-[-.055em] md:text-7xl">
            HAVE A GOOD<br />
            <span className="font-serif font-normal italic text-[#d8d0c2]">idea?</span>
          </h2>
          <p className="mt-7 max-w-md text-sm leading-7 text-[#99958e]">
            Tell me what you are making, where it is at, and what you want it to become. No agency-speak required.
          </p>
          <div className="mt-10 border-t border-white/10 pt-5 text-xs text-[#77736d]">
            <span className="uppercase tracking-[.18em]">Direct inbox</span>
            <a className="mt-2 block text-[#eee9df] transition hover:text-[#d7ff4f]" href={`mailto:${INBOX}`}>{INBOX}</a>
          </div>
        </div>

        <form onSubmit={submit} className="rounded-[2px] border border-white/10 bg-[#131415] p-5 shadow-2xl md:p-8">
          <div className="mb-7 flex items-center justify-between border-b border-white/10 pb-5">
            <span className="text-[10px] font-bold uppercase tracking-[.24em] text-[#d7ff4f]">Project inquiry</span>
            <span className="text-[10px] text-[#66635e]">01 / 01</span>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <label className="field"><span>Name</span><input required name="name" autoComplete="name" placeholder="Your name" /></label>
            <label className="field"><span>Email</span><input required type="email" name="email" autoComplete="email" placeholder="you@email.com" /></label>
          </div>
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <label className="field"><span>Project</span><input required name="subject" placeholder="Song, show, collaboration..." /></label>
            <label className="field"><span>I'm looking for</span><select name="type" defaultValue="Production"><option>Production</option><option>Songwriting</option><option>Vocals</option><option>Performance</option><option>Collaboration</option><option>Other</option></select></label>
          </div>
          <label className="field mt-5"><span>Tell me about it</span><textarea required name="message" rows={7} placeholder="What are you working on? What do you need? What is the deadline?" /></label>

          <div className="mt-6 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-sm text-[11px] leading-5 text-[#6e6b65]">Submitting opens your normal email app with the message already addressed and formatted.</p>
            <button type="submit" className="shrink-0 rounded-full bg-[#e8e1d5] px-7 py-3 text-[10px] font-black uppercase tracking-[.18em] text-[#111] transition hover:-translate-y-0.5 hover:bg-[#d7ff4f]">Send inquiry ↗</button>
          </div>
          {sent && <p className="mt-4 text-xs text-[#d7ff4f]">Your email app should be opening now.</p>}
        </form>
      </div>
    </section>
  );
}
