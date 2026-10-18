import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, Lock, FileText, Mail } from 'lucide-react';
import PrivacyRequestForm from '../components/PrivacyRequestForm';

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

          <Section icon={<FileText className="h-4 w-4 text-brand-500" />} title="1. Information We Collect &amp; Purpose Specification (DPDP Act §5(1))">
            <p>We collect information to provide and improve our services, categorized as follows:</p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li><strong className="text-[var(--text)]">Contact &amp; Inquiry Data:</strong> Full Name, email address, phone number/WhatsApp number, subject, and project specifications submitted via our website contact form or service inquiry channels. Processed solely to evaluate project requirements, provide estimates, and communicate regarding requested services.</li>
              <li><strong className="text-[var(--text)]">Meta Ecosystem Data:</strong> WhatsApp Business Account ID (WABA ID), Phone Number ID, Instagram User ID, Facebook Page Access Tokens, System User Access Tokens, and webhook message logs required for WhatsApp/Instagram messaging integrations and Meta App Review enablement.</li>
              <li><strong className="text-[var(--text)]">Technical &amp; Audit Log Data:</strong> IP address, browser user-agent, API response codes, timestamp logs, SHA256 webhook signatures, and cookie consent preferences logged for statutory compliance verification.</li>
            </ul>
          </Section>

          <Section icon={<FileText className="h-4 w-4 text-brand-500" />} title="2. Legal Basis, AI Model Non-Training &amp; Use of Information">
            <p>We process collected data exclusively under verifiable consent (DPDP Act §6) or legitimate contractual necessity:</p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>To evaluate project scopes, respond to software consulting inquiries, and provide contractual architectural deliverables.</li>
              <li>To set up and maintain Meta Cloud WhatsApp API webhooks, automated customer support chatbots (RAG), and live agent handoffs.</li>
              <li>To execute authorized WhatsApp bulk broadcasting campaigns within official Meta rate limits.</li>
              <li>To trigger automated Instagram Direct Messages (DMs) upon user comment keywords or story mentions.</li>
              <li>To authenticate users securely via Facebook Login OAuth 2.0 and manage long-lived token refreshing.</li>
              <li>To assist client organizations in attaining official Meta Tech Provider status and passing Meta App Review.</li>
            </ul>
            <div className="mt-4 rounded-xl border border-brand-500/30 bg-brand-500/5 p-4 text-xs">
              <strong className="text-[var(--text)]">Explicit AI Non-Training Commitment:</strong> We strictly do <strong>NOT</strong> use any personal data, client project materials, confidential API payloads, or conversation logs to train, retrain, or fine-tune public foundation AI models (e.g. OpenAI, Anthropic, or Google Gemini).
            </div>
          </Section>

          <Section icon={<Lock className="h-4 w-4 text-brand-500" />} title="3. Data Protection, Security &amp; Webhooks">
            <p>
              We implement industry-standard security safeguards. All access tokens and sensitive Meta credentials
              are stored in encrypted vaults (PostgreSQL + KMS). All API communications occur strictly over TLS 1.3/SSL.
              Incoming Meta webhooks are cryptographically validated using X-Hub-Signature SHA256 verification.
            </p>
          </Section>

          <Section icon={<FileText className="h-4 w-4 text-brand-500" />} title="4. Data Sharing &amp; Cross-Border Transfers (DPDP Act §16)">
            <p>
              We do not sell, rent, or trade your personal information or Meta account data. Information is shared strictly with official platforms and sub-processors:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li><strong>Meta Platforms, Inc.:</strong> Required to route WhatsApp Cloud API messages, Instagram automation, and Facebook OAuth logins.</li>
              <li><strong>Hosting &amp; Cloud Infrastructure:</strong> Cloud hosting and deployment providers (e.g. GitHub Pages, AWS, Vercel) bound by equivalent confidentiality and data protection covenants.</li>
              <li><strong>Cross-Border Transfer Restrictions:</strong> In accordance with Section 16 of the DPDP Act 2023, data is never transferred to any jurisdiction or territory blacklisted or restricted by the Central Government of India.</li>
            </ul>
          </Section>

          <Section icon={<FileText className="h-4 w-4 text-brand-500" />} title="5. Data Retention &amp; Purpose-Exhaustion Erasure (DPDP Act §8(7))">
            <p>
              In compliance with Section 8(7) of the DPDP Act 2023, personal data is retained only for as long as necessary to fulfill the specified purpose for which it was collected:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li><strong>Inquiry &amp; Contact Form Submissions:</strong> Retained for a maximum of 24 months from the date of last correspondence, after which records are permanently deleted unless an active service contract is executed.</li>
              <li><strong>Cookie Consent Audit Logs:</strong> Stored for 12 months for compliance verification and automatically expunged thereafter.</li>
              <li><strong>Client Project &amp; Meta OAuth Data:</strong> Retained for the duration of the active client engagement and permanently deleted upon project completion or within 48 hours of an erasure request.</li>
            </ul>
          </Section>

          <Section icon={<Mail className="h-4 w-4 text-brand-500" />} title="6. User Data Deletion Instructions">
            <p>
              In compliance with Meta Platform Terms and DPDP Act Section 12, you have the right to request deletion of your stored data or revoke access at any time:
            </p>
            <div className="mt-4 rounded-xl border border-[var(--border)] bg-[var(--bg-soft)] p-5 font-mono text-xs">
              <p className="font-bold text-[var(--text)]">To request complete data deletion:</p>
              <p className="mt-2">Email: <a href="mailto:hkbharti77@gmail.com" className="text-brand-400 underline">hkbharti77@gmail.com</a></p>
              <p>Subject: Data Deletion Request — [Your Name / Organization]</p>
              <p className="mt-3 text-[11px] text-soft">
                We process and confirm all data deletion requests within 48 hours and send formal written confirmation upon completion.
              </p>
            </div>
          </Section>

          <Section icon={<ShieldCheck className="h-4 w-4 text-emerald-400" />} title="7. Protection of Children's Personal Data (DPDP Act §9)">
            <p>
              Our software development and API consulting services are directed exclusively at business entities, professionals, and adults. In accordance with Section 9 of the DPDP Act 2023:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>We do not knowingly collect or process personal data belonging to children (individuals under 18 years of age).</li>
              <li>We strictly prohibit any tracking, behavioral monitoring, or targeted advertising directed at children across any client systems we engineer.</li>
              <li>We do not undertake any processing of personal data that is likely to cause any detrimental effect on the well-being of a child.</li>
            </ul>
          </Section>

          <Section icon={<ShieldCheck className="h-4 w-4 text-emerald-400" />} title="8. India DPDP Act, 2023 Statutory Compliance &amp; Rights">
            <p>
              If you are located in India or accessing services within India, your personal data is protected under the 
              <strong>Digital Personal Data Protection Act, 2023 (DPDP Act)</strong> and the <strong>DPDP Rules, 2025</strong>. You hold the following statutory rights:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li><strong>Right to Access (§11):</strong> You may request a summary of your personal data processed, processing activities, and identities of any third parties with whom data was shared.</li>
              <li><strong>Right to Correction &amp; Erasure (§12):</strong> You have the statutory right to correct misleading or inaccurate data and demand permanent erasure of personal data that is no longer necessary.</li>
              <li><strong>Right of Grievance Redressal (§13):</strong> You have the right to readily available grievance redressal mechanisms with our designated officer.</li>
              <li><strong>Right to Nominate (§14):</strong> You have the right to nominate another individual who shall, in the event of your death or incapacity, exercise your data principal rights.</li>
              <li><strong>Right to Withdraw Consent (§6(4)):</strong> You may withdraw your consent at any time as easily as it was given by emailing the Grievance Officer.</li>
              <li><strong>Designated Grievance Redressal Officer (§8(9), Rule 9):</strong> Himanshu Bharti (Email: <a href="mailto:hkbharti77@gmail.com" className="text-brand-400 underline">hkbharti77@gmail.com</a>). Requests are acknowledged within 24 hours and resolved within 15 business days.</li>
            </ul>
          </Section>

          <Section icon={<Lock className="h-4 w-4 text-brand-500" />} title="9. Cookies &amp; Third-Party Script Consent Gating">
            <p>
              We respect your right to privacy. Any non-essential third-party scripts (such as the interactive AI chatbot widget) are strictly consent-gated. They are never initialized without affirmative cookie consent or explicit interaction by the user, ensuring that zero unconsented network requests or tracking payloads occur upon page load.
            </p>
          </Section>

          <Section icon={<ShieldCheck className="h-4 w-4 text-emerald-400" />} title="10. Submit a Data Subject Request (DSR) or Grievance">
            <p className="mb-4">
              To exercise your statutory rights (Access, Erasure, Correction, or Consent Withdrawal) or to report a privacy concern, submit the form below. Your request will be securely registered in our dedicated, isolated grievance channel and tracked with an official statutory reference ID.
            </p>
            <PrivacyRequestForm />
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
