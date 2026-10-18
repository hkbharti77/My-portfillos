import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, Send, Twitter, AlertCircle } from 'lucide-react';
import { useReveal } from '../hooks';
import Footer from './Footer';

const socials = [
  { icon: Mail, label: 'Email', href: 'mailto:hkbharti77@gmail.com', value: 'hkbharti77@gmail.com' },
  { icon: Github, label: 'GitHub', href: 'https://github.com/hkbharti77', value: 'github.com/hkbharti77' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/himanshu-bharti-81a5a618a', value: 'linkedin.com/in/himanshu-bharti-81a5a618a' },
  { icon: Twitter, label: 'X', href: '#', value: 'X (Twitter)' },
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact() {
  const ref = useReveal<HTMLDivElement>();
  const [sent, setSent] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [honeypot, setHoneypot] = useState('');
  const [consentGiven, setConsentGiven] = useState(false);
  const [consentError, setConsentError] = useState(false);

  const validate = () => {
    const errs: { name?: string; email?: string; message?: string } = {};
    if (!form.name.trim()) {
      errs.name = 'Please enter your name.';
    }
    if (!form.email.trim()) {
      errs.email = 'Please enter your email address.';
    } else if (!EMAIL_REGEX.test(form.email.trim())) {
      errs.email = 'Please enter a valid email address (e.g. name@domain.com).';
    }
    if (!form.message.trim()) {
      errs.message = 'Please enter your message or project requirements.';
    } else if (form.message.trim().length < 5) {
      errs.message = 'Message must be at least 5 characters.';
    }
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    const isValid = validate();
    if (!isValid) {
      setSubmitError('Please fill out the highlighted required fields.');
      return;
    }

    if (!consentGiven) {
      setConsentError(true);
      return;
    }

    setSubmitting(true);
    try {
      const primaryUrl = (import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/+$/, '');
      const fallbackUrl = primaryUrl.includes('localhost')
        ? primaryUrl.replace('localhost', '127.0.0.1')
        : primaryUrl.replace('127.0.0.1', 'localhost');

      const payload = {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim() || undefined,
        subject: 'Portfolio Contact Form Inquiry',
        message: form.message.trim(),
        channel: 'portfolio',
        source: 'portfolio_contact_form',
        consent: true,
        consentVersion: 'DPDP-2023-v1',
        _hp_company: honeypot,
      };

      const sendRequest = async (url: string) => {
        return await fetch(`${url}/api/public/contact`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify(payload),
        });
      };

      let response: Response;
      try {
        response = await sendRequest(primaryUrl);
      } catch (primaryErr) {
        console.warn(`Primary endpoint ${primaryUrl} failed, trying fallback ${fallbackUrl}...`);
        response = await sendRequest(fallbackUrl);
      }

      const data = await response.json().catch(() => ({}));

      if (response.ok) {
        setSent(true);
        setSuccessMessage(data.message || 'Thank you! Your message has been received.');
        setForm({ name: '', email: '', phone: '', message: '' });
        setFieldErrors({});
        setConsentGiven(false);
        setTimeout(() => {
          setSent(false);
          setSuccessMessage('');
        }, 7000);
      } else {
        setSubmitError(data.error || 'Failed to submit message to the CRM. Please try again.');
      }
    } catch (error: any) {
      console.error('Contact submission error:', error);
      setSubmitError('Unable to reach the backend server (port 5000). Please verify backend is running.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-pad relative py-24 sm:py-28" aria-label="Contact Himanshu Bharti — Hire for AI, Custom Software and Meta Tech Projects">
      <div ref={ref} className="reveal mx-auto max-w-5xl">
        <div className="card relative overflow-hidden p-8 sm:p-12">
          <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-brand-500/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-accent-500/10 blur-3xl" />

          <div className="relative grid gap-10 md:grid-cols-2">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-brand-500">09 — Contact</p>
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
                    className="grid h-11 w-11 place-items-center rounded-xl border border-[var(--border)] bg-[var(--bg-soft)] text-[var(--text-soft)] transition-all duration-300 hover:-translate-y-1 hover:border-brand-400/50 hover:text-brand-500"
                  >
                    <s.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            <form onSubmit={submit} noValidate className="space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-[var(--text-soft)]">Project / Service Interest</label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {[
                    'HR / Recruiter Hiring Inquiry',
                    'Custom Software Dev',
                    'Enterprise AI CRM',
                    'University & Healthcare ERP',
                    'Meta Cloud WhatsApp Setup',
                    'WhatsApp Broadcasting',
                    'Instagram DM Automation',
                    'Facebook Login OAuth',
                    'Become Meta Tech Provider',
                  ].map((topic) => (
                    <button
                      key={topic}
                      type="button"
                      onClick={() =>
                        setForm((prev) => ({
                          ...prev,
                          message: prev.message ? `${prev.message}\nInterested in: ${topic}` : `Hi, I am interested in ${topic}.`,
                        }))
                      }
                      className="rounded-lg border border-[var(--border)] bg-[var(--bg-soft)] px-2.5 py-1 text-[11px] font-mono text-[var(--text-soft)] transition-colors hover:border-brand-500 hover:text-brand-400 hover:bg-brand-500/10"
                    >
                      + {topic}
                    </button>
                  ))}
                </div>
              </div>
              {/* Honeypot Spam Trap */}
              <input
                type="text"
                name="_hp_company"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                style={{ display: 'none' }}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-[var(--text-soft)]">Name <span className="text-red-400">*</span></label>
                  <input
                    value={form.name}
                    onChange={(e) => {
                      setForm({ ...form, name: e.target.value });
                      if (fieldErrors.name) setFieldErrors((prev) => ({ ...prev, name: undefined }));
                    }}
                    className={`w-full rounded-xl border ${
                      fieldErrors.name
                        ? 'border-red-500/80 bg-red-500/10 ring-1 ring-red-500/50'
                        : 'border-[var(--border)] bg-[var(--bg-soft)] hover:border-brand-500/40'
                    } px-4 py-2.5 text-sm text-[var(--text)] placeholder:text-[var(--text-soft)]/60 outline-none transition-all focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20`}
                    placeholder="Enter your name"
                  />
                  {fieldErrors.name && (
                    <p className="mt-1 text-[11px] text-red-400 flex items-center gap-1 font-medium">
                      <AlertCircle className="h-3 w-3 shrink-0" /> {fieldErrors.name}
                    </p>
                  )}
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-[var(--text-soft)]">Email <span className="text-red-400">*</span></label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => {
                      setForm({ ...form, email: e.target.value });
                      if (fieldErrors.email) setFieldErrors((prev) => ({ ...prev, email: undefined }));
                    }}
                    className={`w-full rounded-xl border ${
                      fieldErrors.email
                        ? 'border-red-500/80 bg-red-500/10 ring-1 ring-red-500/50'
                        : 'border-[var(--border)] bg-[var(--bg-soft)] hover:border-brand-500/40'
                    } px-4 py-2.5 text-sm text-[var(--text)] placeholder:text-[var(--text-soft)]/60 outline-none transition-all focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20`}
                    placeholder="Enter your email address"
                  />
                  {fieldErrors.email && (
                    <p className="mt-1 text-[11px] text-red-400 flex items-center gap-1 font-medium">
                      <AlertCircle className="h-3 w-3 shrink-0" /> {fieldErrors.email}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-[var(--text-soft)]">WhatsApp / Phone Number <span className="text-[11px] text-[var(--text-soft)]/70">(Optional)</span></label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg-soft)] hover:border-brand-500/40 px-4 py-2.5 text-sm text-[var(--text)] placeholder:text-[var(--text-soft)]/60 outline-none transition-all focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
                  placeholder="Enter your phone or WhatsApp number"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-[var(--text-soft)]">Message <span className="text-red-400">*</span></label>
                <textarea
                  value={form.message}
                  onChange={(e) => {
                    setForm({ ...form, message: e.target.value });
                    if (fieldErrors.message) setFieldErrors((prev) => ({ ...prev, message: undefined }));
                  }}
                  rows={4}
                  className={`w-full resize-none rounded-xl border ${
                    fieldErrors.message
                      ? 'border-red-500/80 bg-red-500/10 ring-1 ring-red-500/50'
                      : 'border-[var(--border)] bg-[var(--bg-soft)] hover:border-brand-500/40'
                  } px-4 py-2.5 text-sm text-[var(--text)] placeholder:text-[var(--text-soft)]/60 outline-none transition-all focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20`}
                  placeholder="Tell me about your project, AI CRM, WhatsApp setup, or custom software goals..."
                />
                {fieldErrors.message && (
                  <p className="mt-1 text-[11px] text-red-400 flex items-center gap-1 font-medium">
                    <AlertCircle className="h-3 w-3 shrink-0" /> {fieldErrors.message}
                  </p>
                )}
              </div>

              {submitError && (
                <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-400 flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>{submitError}</span>
                </div>
              )}

              {sent && (
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs text-emerald-400 font-medium">
                  {successMessage || 'Message sent successfully! I will reply within 24 hours.'}
                </div>
              )}

              {/* Terms & Privacy Agreement */}
              <div className="py-1">
                <label className="flex items-center gap-2.5 cursor-pointer text-xs text-[var(--text-soft)] hover:text-[var(--text)] transition-colors">
                  <input
                    type="checkbox"
                    checked={consentGiven}
                    onChange={(e) => {
                      setConsentGiven(e.target.checked);
                      if (e.target.checked) setConsentError(false);
                    }}
                    className="cursor-pointer rounded border-[var(--border)] bg-[var(--bg-soft)] accent-brand-500 w-4 h-4"
                  />
                  <span>
                    I agree to the <Link to="/terms" target="_blank" className="text-brand-400 underline underline-offset-2 hover:text-brand-300">Terms &amp; Conditions</Link> and <Link to="/privacy" target="_blank" className="text-brand-400 underline underline-offset-2 hover:text-brand-300">Privacy Policy</Link>.
                  </span>
                </label>
                {consentError && (
                  <p className="mt-1 text-[11px] text-red-400 flex items-center gap-1 font-medium">
                    <AlertCircle className="h-3 w-3 shrink-0" /> Please accept the Terms and Privacy Policy to proceed.
                  </p>
                )}
              </div>

              <button type="submit" disabled={submitting} className="btn-primary w-full disabled:opacity-50">
                {submitting ? (
                  <>Sending message...</>
                ) : sent ? (
                  <>Message Sent ✓</>
                ) : (
                  <>
                    Send message <Send className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12">
          <Footer />
        </div>
      </div>
    </section>
  );
}
