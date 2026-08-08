import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Scale, FileText, CheckCircle2 } from 'lucide-react';

export default function Terms() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Terms & Conditions — Himanshu Bharti';
    window.scrollTo(0, 0);

    // Inject page-specific SEO meta tags
    const setMeta = (attr: string, key: string, value: string) => {
      let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
      if (!el) { el = document.createElement('meta'); el.setAttribute(attr, key); document.head.appendChild(el); }
      el.setAttribute('content', value);
    };
    const canonicalUrl = 'https://hkbharti77.github.io/My-portfillos/terms';
    const desc = 'Terms & Conditions for Himanshu Bharti software engineering services — custom software, Meta Cloud WhatsApp API, Instagram automation, Facebook OAuth, and Meta Tech Provider enablement.';

    setMeta('name', 'description', desc);
    setMeta('name', 'robots', 'noindex, follow');
    setMeta('property', 'og:title', 'Terms & Conditions — Himanshu Bharti');
    setMeta('property', 'og:description', desc);
    setMeta('property', 'og:url', canonicalUrl);
    setMeta('property', 'og:type', 'website');

    let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) { link = document.createElement('link'); link.setAttribute('rel', 'canonical'); document.head.appendChild(link); }
    link.setAttribute('href', canonicalUrl);

    return () => {
      document.title = 'Himanshu Bharti — Software Engineer | Custom Software, AI CRM/ERP & Meta Tech Provider';
      setMeta('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
      const canonEl = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
      if (canonEl) canonEl.setAttribute('href', 'https://hkbharti77.github.io/My-portfillos/');
    };
  }, []);

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      {/* Nav */}
      <div className="section-pad mx-auto max-w-4xl pt-8">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm text-soft transition-colors hover:text-brand-500"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
      </div>

      <main className="section-pad mx-auto max-w-4xl pb-24 pt-8">
        {/* Header */}
        <div className="mb-10 flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-500/10 ring-1 ring-brand-500/30">
            <Scale className="h-6 w-6 text-brand-400" />
          </div>
          <div>
            <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Terms &amp; Conditions</h1>
            <p className="mt-1 font-mono text-xs text-soft">Last Updated: May 2025 · Service Terms of Use</p>
          </div>
        </div>

        {/* Overview notice */}
        <div className="mb-8 rounded-xl border border-brand-500/30 bg-brand-500/5 p-5">
          <p className="flex items-center gap-2 text-sm font-semibold text-brand-400">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Terms of Service Overview
          </p>
          <p className="mt-2 text-sm leading-relaxed text-soft">
            By accessing or using custom software solutions, Meta Cloud WhatsApp API integrations, Instagram Graph
            API workflows, Facebook Login OAuth services, or Meta Tech Provider enablement provided by Himanshu Bharti
            ("we", "us", "our"), you agree to be bound by these Terms &amp; Conditions.
          </p>
        </div>

        <div className="space-y-10 text-sm leading-relaxed text-soft">

          <Section icon={<FileText className="h-4 w-4 text-brand-500" />} title="1. Services & Scope">
            <p>We provide software development, API integration, and technical consulting including:</p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>Custom web and backend application engineering (React, Python, FastAPI, Spring Boot).</li>
              <li>Meta Cloud WhatsApp API configuration, AI chatbot setup (RAG), and live agent handoff queues.</li>
              <li>WhatsApp bulk broadcasting campaign engines with Redis rate limiting and HSM template management.</li>
              <li>Instagram Graph API automation including comment-to-DM triggers and story mention lead capture.</li>
              <li>Facebook Login OAuth 2.0 implementation and Page Access Token refresh pipelines.</li>
              <li>Meta Tech Provider partner enablement, Embedded Signup OAuth, and Meta App Review compliance.</li>
            </ul>
          </Section>

          <Section icon={<FileText className="h-4 w-4 text-brand-500" />} title="2. Meta Compliance & Acceptable Use">
            <p>When utilizing Meta messaging and developer services integrated by us, users must strictly adhere to:</p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li><strong className="text-[var(--text)]">Meta Platform Terms &amp; Developer Policies:</strong> Absolute compliance with Meta API terms.</li>
              <li><strong className="text-[var(--text)]">WhatsApp Business Messaging Policy:</strong> Prohibition of unrequested spam, deceptive content, or prohibited goods.</li>
              <li><strong className="text-[var(--text)]">HSM Template Messaging:</strong> All outbound initiated broadcasts outside 24-hour customer service windows must use Meta-approved templates.</li>
            </ul>
          </Section>

          <Section icon={<FileText className="h-4 w-4 text-brand-500" />} title="3. Intellectual Property Rights">
            <p>
              All software architecture, custom source code, documentation, and interface designs created for client
              projects are transferred or licensed according to individual client contract agreements. Proprietary
              framework components remain protected under intellectual property law.
            </p>
          </Section>

          <Section icon={<FileText className="h-4 w-4 text-brand-500" />} title="4. Warranties & Limitation of Liability">
            <p>
              Services are provided on an "as is" and "as available" basis. We are not liable for service
              interruptions caused by third-party platform outages (e.g. Meta Cloud infrastructure downtime or
              Meta policy changes).
            </p>
          </Section>

          <Section icon={<FileText className="h-4 w-4 text-brand-500" />} title="5. Contact & Support">
            <p>
              For questions concerning these Terms &amp; Conditions or service agreements, please contact us at{' '}
              <a href="mailto:hkbharti77@gmail.com" className="font-mono text-brand-400 underline underline-offset-2 hover:text-brand-300">
                hkbharti77@gmail.com
              </a>.
            </p>
          </Section>

        </div>

        <footer className="mt-16 flex items-center justify-between border-t border-[var(--border)] pt-6 text-xs text-soft">
          <p className="font-mono">© {new Date().getFullYear()} Himanshu Bharti · Terms &amp; Conditions</p>
          <button onClick={() => navigate(-1)} className="btn-ghost !py-2 !text-xs">
            <ArrowLeft className="h-3.5 w-3.5" /> Back
          </button>
        </footer>
      </main>
    </div>
  );
}

function Section({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-3 flex items-center gap-2 font-display text-lg font-bold text-[var(--text)]">
        {icon} {title}
      </h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}
