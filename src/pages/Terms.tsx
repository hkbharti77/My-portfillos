import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Scale, FileText, CheckCircle2, ShieldCheck, AlertCircle } from 'lucide-react';

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
            <p className="mt-1 font-mono text-xs text-soft">Last Updated: June 2026 · Statutory Service Terms of Use</p>
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
            ("we", "us", "our"), you agree to be bound by these Terms &amp; Conditions and applicable laws of the Republic of India.
          </p>
        </div>

        <div className="space-y-10 text-sm leading-relaxed text-soft">

          <Section icon={<FileText className="h-4 w-4 text-brand-500" />} title="1. Services & Scope">
            <p>We provide software development, API integration, and technical consulting including:</p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>Custom web and backend application engineering (React, Python, FastAPI, Node.js, Spring Boot).</li>
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
              <li><strong className="text-[var(--text)]">Meta Platform Terms &amp; Developer Policies:</strong> Absolute compliance with Meta API terms and usage limits.</li>
              <li><strong className="text-[var(--text)]">WhatsApp Business Messaging Policy:</strong> Prohibition of unrequested spam, deceptive content, or prohibited goods/services.</li>
              <li><strong className="text-[var(--text)]">HSM Template Messaging:</strong> All outbound initiated broadcasts outside 24-hour customer service windows must use Meta-approved templates.</li>
              <li><strong className="text-[var(--text)]">1-Click Opt-Out:</strong> Any automated outreach must respect instant opt-out requests (e.g., STOP, CANCEL, UNSUBSCRIBE).</li>
            </ul>
          </Section>

          <Section icon={<ShieldCheck className="h-4 w-4 text-brand-500" />} title="3. Verifiable Consent & Anti-Spam Obligations">
            <p>
              Clients and organizations utilizing software, integrations, or messaging pipelines developed by us warrant that:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>They possess prior, explicit, verifiable opt-in consent from all targeted individuals in compliance with Section 6 of India's <strong>Digital Personal Data Protection Act, 2023 (DPDP Act)</strong> and TRAI regulations (TCCCPR 2018).</li>
              <li>They shall not process, harvest, or transmit personal data without legitimate purpose specification or appropriate statutory notice under DPDP Act §5.</li>
              <li>They shall immediately honor data access, correction, or erasure requests submitted by data principals under DPDP Act §§11–12.</li>
            </ul>
          </Section>

          <Section icon={<FileText className="h-4 w-4 text-brand-500" />} title="4. Intellectual Property Rights">
            <p>
              All software architecture, custom source code, documentation, and interface designs created for client
              projects are transferred or licensed according to individual client contract agreements. Proprietary
              framework components, reusable libraries, and portfolio demonstration materials remain protected under intellectual property law.
            </p>
          </Section>

          <Section icon={<FileText className="h-4 w-4 text-brand-500" />} title="5. Warranties & Limitation of Liability">
            <p>
              Services and software components are provided on an "as is" and "as available" basis. To the maximum extent permitted by applicable Indian law, we are not liable for indirect, incidental, or consequential damages, nor for service interruptions caused by third-party platform downtime or policy changes (including Meta Cloud API downtime, AWS outages, or telecom latency).
            </p>
          </Section>

          <Section icon={<Scale className="h-4 w-4 text-brand-500" />} title="6. Governing Law & Dispute Resolution">
            <p>
              These Terms &amp; Conditions shall be governed by, interpreted, and construed in accordance with the substantive laws of the <strong>Republic of India</strong>, including the Information Technology Act, 2000, the Digital Personal Data Protection Act, 2023, the Consumer Protection Act, 2019, and the Indian Contract Act, 1872.
            </p>
            <p className="mt-2">
              Any dispute, controversy, or claim arising out of or in connection with these Terms or related services shall be subject to the exclusive jurisdiction of the competent courts situated in <strong>New Delhi, Republic of India</strong>.
            </p>
          </Section>

          <Section icon={<AlertCircle className="h-4 w-4 text-brand-500" />} title="7. Prohibition of Dark Patterns & Consumer Protection">
            <p>
              In accordance with the <em>Guidelines for Prevention and Regulation of Dark Patterns, 2023</em> issued by the Central Consumer Protection Authority (CCPA) under the Consumer Protection Act, 2019, we uphold strict standards of digital honesty and fair dealing:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li><strong>No False Urgency:</strong> We do not create false countdowns or deceptive scarcity indicators.</li>
              <li><strong>No Basket Sneaking or Hidden Fees:</strong> Quotations and proposals clearly enumerate deliverables without unstated costs.</li>
              <li><strong>No Confirm Shaming:</strong> Inquiries, newsletter signups, or contact forms never employ manipulative guilt-based language for opting out.</li>
              <li><strong>No Forced Action:</strong> Visitors can freely browse portfolio projects, code demonstrations, and case studies without compulsory marketing consent.</li>
            </ul>
          </Section>

          <Section icon={<ShieldCheck className="h-4 w-4 text-emerald-400" />} title="8. Grievance Redressal Mechanism">
            <p>
              In compliance with Section 13 of the Digital Personal Data Protection Act, 2023 and Rule 11 of the DPDP Rules, 2025, any grievance, privacy inquiry, or terms dispute will be addressed by our designated officer:
            </p>
            <div className="mt-3 rounded-xl border border-[var(--border)] bg-[var(--bg-soft)] p-4 font-mono text-xs">
              <p className="font-bold text-[var(--text)]">Designated Grievance Redressal Officer:</p>
              <ul className="mt-2 space-y-1 text-soft">
                <li><strong className="text-[var(--text)]">Officer Name:</strong> Himanshu Bharti</li>
                <li><strong className="text-[var(--text)]">Direct Email:</strong> <a href="mailto:hkbharti77@gmail.com" className="text-brand-400 underline">hkbharti77@gmail.com</a></li>
                <li><strong className="text-[var(--text)]">Jurisdiction:</strong> New Delhi, India</li>
                <li><strong className="text-[var(--text)]">Statutory Acknowledgment:</strong> Within 24 hours</li>
                <li><strong className="text-[var(--text)]">Statutory Resolution SLA:</strong> Maximum 15 business days (Rule 11)</li>
              </ul>
            </div>
          </Section>

          <Section icon={<FileText className="h-4 w-4 text-brand-500" />} title="9. Contact & Service Inquiries">
            <p>
              For project inquiries, technical consulting, or questions concerning these Terms &amp; Conditions, please reach out via{' '}
              <a href="mailto:hkbharti77@gmail.com" className="font-mono text-brand-400 underline underline-offset-2 hover:text-brand-300">
                hkbharti77@gmail.com
              </a>{' '}
              or submit our website contact form.
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
