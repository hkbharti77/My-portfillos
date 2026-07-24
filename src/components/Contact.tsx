import { useState } from 'react';
import { Github, Linkedin, Mail, Send, Twitter } from 'lucide-react';
import { useReveal } from '../hooks';

const socials = [
  { icon: Mail, label: 'Email', href: 'mailto:hkbharti77@gmail.com', value: 'hkbharti77@gmail.com' },
  { icon: Github, label: 'GitHub', href: 'https://github.com/hkbharti77', value: 'github.com/hkbharti77' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/himanshu-bharti-81a5a618a', value: 'linkedin.com/in/himanshu-bharti-81a5a618a' },
  { icon: Twitter, label: 'X', href: '#', value: 'X (Twitter)' },
];

export default function Contact() {
  const ref = useReveal<HTMLDivElement>();
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setSubmitting(true);
    try {
      const response = await fetch('https://formspree.io/f/mzdqyerw', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setSent(true);
        setForm({ name: '', email: '', message: '' });
        setTimeout(() => {
          setSent(false);
        }, 4000);
      } else {
        alert('Failed to send message via Formspree. Please try again.');
      }
    } catch (error) {
      console.error('Formspree submit error:', error);
      alert('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-pad relative py-24 sm:py-28">
      <div ref={ref} className="reveal mx-auto max-w-5xl">
        <div className="card relative overflow-hidden p-8 sm:p-12">
          <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-brand-500/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-accent-500/10 blur-3xl" />

          <div className="relative grid gap-10 md:grid-cols-2">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-brand-500">10 — Contact</p>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                Let's build something
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-soft">
                Recruiting for an AI/backend role, or have a project that needs production AI systems? Send a message — I reply within a day.
              </p>

              <div className="mt-6">
                <a
                  href="mailto:hkbharti77@gmail.com"
                  className="inline-flex items-center gap-2.5 rounded-xl border border-brand-500/40 bg-brand-500/10 px-4 py-2.5 text-sm font-mono font-medium text-brand-400 transition-colors hover:bg-brand-500/20"
                >
                  <Mail className="h-4 w-4" /> hkbharti77@gmail.com
                </a>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    title={s.value}
                    className="grid h-11 w-11 place-items-center rounded-xl border border-soft bg-soft/50 text-soft transition-all duration-300 hover:-translate-y-1 hover:border-brand-400/50 hover:text-brand-500"
                  >
                    <s.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            <form onSubmit={submit} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-soft">Name</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-xl border border-soft bg-soft/20 px-4 py-2.5 text-sm text-foreground placeholder:text-soft/60 outline-none transition-all focus:border-brand-500 focus:bg-soft/40 focus:ring-1 focus:ring-brand-500"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-soft">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-xl border border-soft bg-soft/20 px-4 py-2.5 text-sm text-foreground placeholder:text-soft/60 outline-none transition-all focus:border-brand-500 focus:bg-soft/40 focus:ring-1 focus:ring-brand-500"
                  placeholder="you@company.com"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-soft">Message</label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={4}
                  className="w-full resize-none rounded-xl border border-soft bg-soft/20 px-4 py-2.5 text-sm text-foreground placeholder:text-soft/60 outline-none transition-all focus:border-brand-500 focus:bg-soft/40 focus:ring-1 focus:ring-brand-500"
                  placeholder="Tell me about the role or project..."
                />
              </div>
              <button type="submit" disabled={submitting} className="btn-primary w-full disabled:opacity-50">
                {submitting ? (
                  <>Sending message...</>
                ) : sent ? (
                  <>Message sent successfully! ✓</>
                ) : (
                  <>
                    Send message <Send className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        <footer className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-soft pt-6 text-xs text-soft sm:flex-row">
          <p>© {new Date().getFullYear()} Himanshu Bharti. Built with React, Tailwind & a lot of caffeine.</p>
          <p className="font-mono">Designed & engineered from scratch.</p>
        </footer>
      </div>
    </section>
  );
}
