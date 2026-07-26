import { X, ShieldCheck, Lock, FileText, Mail, ArrowRight } from 'lucide-react';
import { useEffect } from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function PrivacyModal({ open, onClose }: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[130] flex items-center justify-center bg-ink-950/80 p-4 pt-16 sm:p-6 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="card relative w-full max-w-4xl max-h-[85vh] flex flex-col overflow-hidden shadow-2xl border-brand-500/30"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-soft bg-ink-950/90 px-6 py-4">
          <div className="flex items-center gap-2.5">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-emerald-500/20 text-emerald-400">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-display text-lg font-bold text-foreground">Privacy Policy</h2>
              <p className="text-[11px] font-mono text-soft">Last Updated: May 2025 • Meta App Review Compliant</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="grid h-8 w-8 place-items-center rounded-full border border-soft text-soft hover:bg-soft/40 hover:text-foreground transition-colors"
            aria-label="Close modal"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 text-sm text-soft leading-relaxed">
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4 text-xs">
            <p className="font-semibold text-emerald-400 flex items-center gap-1.5 mb-1">
              <Lock className="h-4 w-4" /> Meta Developer & App Review Privacy Statement
            </p>
            <p>
              This Privacy Policy details how Himanshu Bharti (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) collects, uses, stores, and protects user data when accessing our custom software services, Meta Cloud WhatsApp API integrations, Facebook Login, Instagram Graph API automation, and Meta Tech Provider services.
            </p>
          </div>

          {/* Section 1 */}
          <section className="space-y-2">
            <h3 className="font-display text-base font-bold text-foreground flex items-center gap-2">
              <FileText className="h-4 w-4 text-brand-500" /> 1. Information We Collect
            </h3>
            <p>We collect information to provide and improve our services, categorized as follows:</p>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li>
                <strong className="text-foreground">Personal Information:</strong> Name, email address, phone number, and organization name submitted via contact forms or service registration.
              </li>
              <li>
                <strong className="text-foreground">Meta Ecosystem Data:</strong> WhatsApp Business Account ID (WABA ID), Phone Number ID, Instagram User ID, Facebook Page Access Tokens, System User Access Tokens, and webhook message logs required for WhatsApp/Instagram messaging integrations.
              </li>
              <li>
                <strong className="text-foreground">Technical Log Data:</strong> IP address, browser metadata, API response codes, timestamp logs, and SHA256 webhook verification signatures.
              </li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="space-y-2">
            <h3 className="font-display text-base font-bold text-foreground flex items-center gap-2">
              <FileText className="h-4 w-4 text-brand-500" /> 2. How We Use Information
            </h3>
            <p>We process collected data exclusively for authorized operational and service purposes:</p>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li>To set up and maintain Meta Cloud WhatsApp API webhooks, automated customer support chatbots (RAG), and live agent handoffs.</li>
              <li>To execute authorized WhatsApp bulk broadcasting campaigns within official Meta rate limits.</li>
              <li>To trigger automated Instagram Direct Messages (DMs) upon user comment keywords or story mentions.</li>
              <li>To authenticate users securely via Facebook Login OAuth 2.0 and manage long-lived token refreshing.</li>
              <li>To assist client organizations in attaining official Meta Tech Provider status and passing Meta App Review.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-2">
            <h3 className="font-display text-base font-bold text-foreground flex items-center gap-2">
              <FileText className="h-4 w-4 text-brand-500" /> 3. Data Protection, Security & Webhooks
            </h3>
            <p>
              We implement industry-standard security safeguards. All access tokens and sensitive Meta credentials are stored in encrypted vaults (PostgreSQL + KMS). All API communications occur strictly over TLS 1.3/SSL. Incoming Meta webhooks are cryptographically validated using X-Hub-Signature SHA256 verification.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-2">
            <h3 className="font-display text-base font-bold text-foreground flex items-center gap-2">
              <FileText className="h-4 w-4 text-brand-500" /> 4. Data Sharing & Third Parties
            </h3>
            <p>
              We do not sell, rent, or trade your personal information or Meta account data. Information is transmitted strictly to official Meta Cloud APIs (Meta Platforms, Inc.) as required to deliver your requested messaging workflows.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-2 border-t border-soft/60 pt-4">
            <h3 className="font-display text-base font-bold text-foreground flex items-center gap-2">
              <Mail className="h-4 w-4 text-brand-500" /> 5. User Data Deletion Instructions
            </h3>
            <p className="text-xs">
              In compliance with Meta Platform Terms, you have the right to request deletion of your stored data or revoke access at any time:
            </p>
            <div className="rounded-xl border border-soft bg-soft/20 p-4 font-mono text-xs text-soft space-y-1">
              <p className="font-bold text-foreground">To request complete data deletion:</p>
              <p>Email: <a href="mailto:hkbharti77@gmail.com" className="text-brand-400 underline">hkbharti77@gmail.com</a></p>
              <p>Subject: Data Deletion Request - [Your Business / Account Name]</p>
              <p className="text-[11px] text-soft/80 mt-1">We process and confirm all data deletion requests within 48 hours and send formal confirmation upon completion.</p>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="border-t border-soft bg-ink-950/90 px-6 py-4 flex items-center justify-between">
          <p className="text-xs text-soft font-mono">© {new Date().getFullYear()} Himanshu Bharti • Privacy Policy</p>
          <button onClick={onClose} className="btn-primary py-2 text-xs">
            Got it <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
