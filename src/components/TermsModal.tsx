import { X, Scale, FileText, CheckCircle2, ArrowRight } from 'lucide-react';
import { useEffect } from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function TermsModal({ open, onClose }: Props) {
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
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-brand-500/20 text-brand-400">
              <Scale className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-display text-lg font-bold text-foreground">Terms & Conditions</h2>
              <p className="text-[11px] font-mono text-soft">Last Updated: May 2025 • Service Terms of Use</p>
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
          <div className="rounded-xl border border-brand-500/30 bg-brand-500/5 p-4 text-xs">
            <p className="font-semibold text-brand-400 flex items-center gap-1.5 mb-1">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Terms of Service Overview
            </p>
            <p>
              By accessing or using custom software solutions, Meta Cloud WhatsApp API integrations, Instagram Graph API workflows, Facebook Login OAuth services, or Meta Tech Provider enablement provided by Himanshu Bharti (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;), you agree to be bound by these Terms & Conditions.
            </p>
          </div>

          {/* Section 1 */}
          <section className="space-y-2">
            <h3 className="font-display text-base font-bold text-foreground flex items-center gap-2">
              <FileText className="h-4 w-4 text-brand-500" /> 1. Services & Scope
            </h3>
            <p>We provide software development, API integration, and technical consulting including:</p>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li>Custom web and backend application engineering (React, Python, FastAPI, Spring Boot).</li>
              <li>Meta Cloud WhatsApp API configuration, AI chatbot setup (RAG), and live agent handoff queues.</li>
              <li>WhatsApp bulk broadcasting campaign engines with Redis rate limiting and HSM template management.</li>
              <li>Instagram Graph API automation including comment-to-DM triggers and story mention lead capture.</li>
              <li>Facebook Login OAuth 2.0 implementation and Page Access Token refresh pipelines.</li>
              <li>Meta Tech Provider partner enablement, Embedded Signup OAuth, and Meta App Review compliance.</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="space-y-2">
            <h3 className="font-display text-base font-bold text-foreground flex items-center gap-2">
              <FileText className="h-4 w-4 text-brand-500" /> 2. Meta Compliance & Acceptable Use
            </h3>
            <p>When utilizing Meta messaging and developer services integrated by us, users must strictly adhere to:</p>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li><strong className="text-foreground">Meta Platform Terms & Developer Policies:</strong> Absolute compliance with Meta API terms.</li>
              <li><strong className="text-foreground">WhatsApp Business Messaging Policy:</strong> Prohibition of unrequested spam, deceptive content, or prohibited goods.</li>
              <li><strong className="text-foreground">HSM Template Messaging:</strong> All outbound initiated broadcasts outside 24-hour customer service windows must use Meta-approved templates.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-2">
            <h3 className="font-display text-base font-bold text-foreground flex items-center gap-2">
              <FileText className="h-4 w-4 text-brand-500" /> 3. Intellectual Property Rights
            </h3>
            <p>
              All software architecture, custom source code, documentation, and interface designs created for client projects are transferred or licensed according to individual client contract agreements. Proprietary framework components remain protected under intellectual property law.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-2">
            <h3 className="font-display text-base font-bold text-foreground flex items-center gap-2">
              <FileText className="h-4 w-4 text-brand-500" /> 4. Warranties & Limitation of Liability
            </h3>
            <p className="text-xs">
              Services are provided on an &quot;as is&quot; and &quot;as available&quot; basis. We are not liable for service interruptions caused by third-party platform outages (e.g. Meta Cloud infrastructure downtime or Meta policy changes).
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-2 border-t border-soft/60 pt-4">
            <h3 className="font-display text-base font-bold text-foreground flex items-center gap-2">
              <FileText className="h-4 w-4 text-brand-500" /> 5. Contact & Support
            </h3>
            <p className="text-xs">
              For questions concerning these Terms & Conditions or service agreements, please contact us at <a href="mailto:hkbharti77@gmail.com" className="text-brand-400 underline font-mono">hkbharti77@gmail.com</a>.
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="border-t border-soft bg-ink-950/90 px-6 py-4 flex items-center justify-between">
          <p className="text-xs text-soft font-mono">© {new Date().getFullYear()} Himanshu Bharti • Terms & Conditions</p>
          <button onClick={onClose} className="btn-primary py-2 text-xs">
            Accept & Close <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
