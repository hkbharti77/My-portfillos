import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, Lock, FileText, Mail } from 'lucide-react';

export default function Privacy() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Privacy Policy — Himanshu Bharti';
    window.scrollTo(0, 0);

    // Inject page-specific SEO meta tags
    const setMeta = (attr: string, key: string, value: string) => {
      let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
      if (!el) { el = document.createElement('meta'); el.setAttribute(attr, key); document.head.appendChild(el); }
      el.setAttribute('content', value);
    };
    const canonicalUrl = 'https://hkbharti77.github.io/My-portfillos/privacy';
    const desc = 'Privacy Policy for Himanshu Bharti software services — Meta Cloud WhatsApp API, Instagram automation, Facebook Login, and Meta Tech Provider consulting. GDPR & Meta Platform Terms compliant.';

    setMeta('name', 'description', desc);
    setMeta('name', 'robots', 'noindex, follow');
    setMeta('property', 'og:title', 'Privacy Policy — Himanshu Bharti');
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
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/10 ring-1 ring-emerald-500/30">
            <ShieldCheck className="h-6 w-6 text-emerald-400" />
          </div>
          <div>
            <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Privacy Policy</h1>
            <p className="mt-1 font-mono text-xs text-soft">Last Updated: May 2025 · Meta App Review Compliant</p>
          </div>
        </div>

        {/* Meta compliance notice */}
        <div className="mb-8 rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-5">
          <p className="flex items-center gap-2 text-sm font-semibold text-emerald-400">
            <Lock className="h-4 w-4" /> Meta Developer &amp; App Review Privacy Statement
          </p>
          <p className="mt-2 text-sm leading-relaxed text-soft">
            This Privacy Policy details how Himanshu Bharti ("we", "us", "our") collects, uses, stores, and
            protects user data when accessing our custom software services, Meta Cloud WhatsApp API integrations,
            Facebook Login, Instagram Graph API automation, and Meta Tech Provider services.
          </p>
        </div>

        <div className="space-y-10 text-sm leading-relaxed text-soft">

          <Section icon={<FileText className="h-4 w-4 text-brand-500" />} title="1. Information We Collect">
            <p>We collect information to provide and improve our services, categorized as follows:</p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li><strong className="text-[var(--text)]">Personal Information:</strong> Name, email address, phone number, and organization name submitted via contact forms or service registration.</li>
              <li><strong className="text-[var(--text)]">Meta Ecosystem Data:</strong> WhatsApp Business Account ID (WABA ID), Phone Number ID, Instagram User ID, Facebook Page Access Tokens, System User Access Tokens, and webhook message logs required for WhatsApp/Instagram messaging integrations.</li>
              <li><strong className="text-[var(--text)]">Technical Log Data:</strong> IP address, browser metadata, API response codes, timestamp logs, and SHA256 webhook verification signatures.</li>
            </ul>
          </Section>

          <Section icon={<FileText className="h-4 w-4 text-brand-500" />} title="2. How We Use Information">
            <p>We process collected data exclusively for authorized operational and service purposes:</p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>To set up and maintain Meta Cloud WhatsApp API webhooks, automated customer support chatbots (RAG), and live agent handoffs.</li>
              <li>To execute authorized WhatsApp bulk broadcasting campaigns within official Meta rate limits.</li>
              <li>To trigger automated Instagram Direct Messages (DMs) upon user comment keywords or story mentions.</li>
              <li>To authenticate users securely via Facebook Login OAuth 2.0 and manage long-lived token refreshing.</li>
              <li>To assist client organizations in attaining official Meta Tech Provider status and passing Meta App Review.</li>
            </ul>
          </Section>

          <Section icon={<FileText className="h-4 w-4 text-brand-500" />} title="3. Data Protection, Security & Webhooks">
            <p>
              We implement industry-standard security safeguards. All access tokens and sensitive Meta credentials
              are stored in encrypted vaults (PostgreSQL + KMS). All API communications occur strictly over TLS 1.3/SSL.
              Incoming Meta webhooks are cryptographically validated using X-Hub-Signature SHA256 verification.
            </p>
          </Section>

          <Section icon={<FileText className="h-4 w-4 text-brand-500" />} title="4. Data Sharing & Third Parties">
            <p>
              We do not sell, rent, or trade your personal information or Meta account data. Information is transmitted
              strictly to official Meta Cloud APIs (Meta Platforms, Inc.) as required to deliver your requested
              messaging workflows.
            </p>
          </Section>

          <Section icon={<Mail className="h-4 w-4 text-brand-500" />} title="5. User Data Deletion Instructions">
            <p>
              In compliance with Meta Platform Terms, you have the right to request deletion of your stored data
              or revoke access at any time:
            </p>
            <div className="mt-4 rounded-xl border border-[var(--border)] bg-[var(--bg-soft)] p-5 font-mono text-xs">
              <p className="font-bold text-[var(--text)]">To request complete data deletion:</p>
              <p className="mt-2">Email: <a href="mailto:hkbharti77@gmail.com" className="text-brand-400 underline">hkbharti77@gmail.com</a></p>
              <p>Subject: Data Deletion Request — [Your Business / Account Name]</p>
              <p className="mt-3 text-[11px] text-soft">
                We process and confirm all data deletion requests within 48 hours and send formal confirmation upon completion.
              </p>
            </div>
          </Section>

        </div>

        <footer className="mt-16 flex items-center justify-between border-t border-[var(--border)] pt-6 text-xs text-soft">
          <p className="font-mono">© {new Date().getFullYear()} Himanshu Bharti · Privacy Policy</p>
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
