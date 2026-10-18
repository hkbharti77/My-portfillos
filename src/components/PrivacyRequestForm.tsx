import React, { useState } from 'react';
import { ShieldCheck, Send, CheckCircle2, AlertCircle, Loader2, Copy, Check, Clock, Shield } from 'lucide-react';

interface ResultData {
  success: boolean;
  ticketId: string;
  message: string;
  channel?: string;
  slaResolutionDueAt?: string;
  duplicate?: boolean;
}

export default function PrivacyRequestForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    requestType: 'Data Access Request',
    description: '',
  });

  const [honeypot, setHoneypot] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resultData, setResultData] = useState<ResultData | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCopyTicket = (ticketId: string) => {
    navigator.clipboard.writeText(ticketId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const apiBaseUrl = (import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/+$/, '');

      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || undefined,
        requestType: formData.requestType,
        description: formData.description.trim(),
        channel: 'portfolio',
        source: 'portfolio_dsr_portal',
        _hp_company: honeypot,
      };

      const response = await fetch(`${apiBaseUrl}/api/public/privacy-requests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        setResultData(data);
        setFormData({
          name: '',
          email: '',
          phone: '',
          requestType: 'Data Access Request',
          description: '',
        });
      } else {
        setErrorMessage(data.error || 'Failed to submit privacy request. Please email our Grievance Officer directly.');
      }
    } catch (err) {
      console.error('Privacy request submission error:', err);
      setErrorMessage('Network connection error. Please verify your connection or email hkbharti77@gmail.com.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-soft)]/60 p-6 sm:p-8 backdrop-blur-sm">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-[var(--border)] pb-5">
        <div>
          <h3 className="flex items-center gap-2 font-display text-xl font-bold text-[var(--text)]">
            <Shield className="h-5 w-5 text-emerald-400" />
            Submit a Data Subject Request (DSR) or Grievance
          </h3>
          <p className="mt-1 text-xs text-soft">
            Exercise your statutory rights under the India DPDP Act 2023 §§11–14 or submit a grievance.
          </p>
        </div>
      </div>

      {resultData ? (
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-6 animate-fadeIn">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <div className="flex-1 space-y-3">
              <h4 className="font-display text-lg font-bold text-[var(--text)]">
                {resultData.duplicate ? 'Active Request Retrieved' : 'Privacy Request Successfully Registered'}
              </h4>
              <p className="text-sm leading-relaxed text-soft">
                {resultData.message}
              </p>

              <div className="flex flex-wrap items-center gap-3 rounded-lg border border-[var(--border)] bg-[var(--bg)] p-3">
                <div className="flex-1">
                  <div className="text-[11px] font-mono text-soft uppercase tracking-wider">Statutory Ticket ID</div>
                  <div className="font-mono text-base font-bold text-emerald-400">{resultData.ticketId}</div>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopyTicket(resultData.ticketId)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--bg-soft)] px-3 py-1.5 font-mono text-xs text-soft hover:text-[var(--text)] transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-400" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" /> Copy ID
                    </>
                  )}
                </button>
              </div>

              {resultData.slaResolutionDueAt && (
                <div className="flex items-center gap-2 text-xs text-soft">
                  <Clock className="h-3.5 w-3.5 text-brand-400" />
                  <span>
                    Statutory Resolution Due Date:{' '}
                    <strong className="text-[var(--text)]">
                      {new Date(resultData.slaResolutionDueAt).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </strong>{' '}
                    (within 15 business days).
                  </span>
                </div>
              )}

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setResultData(null)}
                  className="text-xs text-brand-400 underline hover:text-brand-300"
                >
                  Submit another request
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Honeypot field for bot suppression */}
          <div style={{ display: 'none' }} aria-hidden="true">
            <input
              type="text"
              name="_hp_company"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[var(--text)] mb-1.5">
                Full Legal Name <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="e.g. Himanshu Bharti"
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-3.5 py-2.5 text-sm text-[var(--text)] placeholder-stone-500 focus:border-brand-500 focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[var(--text)] mb-1.5">
                Email Address <span className="text-rose-400">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your.email@example.com"
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-3.5 py-2.5 text-sm text-[var(--text)] placeholder-stone-500 focus:border-brand-500 focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[var(--text)] mb-1.5">
                Phone / WhatsApp Number <span className="text-soft font-normal">(Optional)</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone or WhatsApp number"
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-3.5 py-2.5 text-sm text-[var(--text)] placeholder-stone-500 focus:border-brand-500 focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[var(--text)] mb-1.5">
                Statutory Request Category <span className="text-rose-400">*</span>
              </label>
              <select
                name="requestType"
                value={formData.requestType}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-3.5 py-2.5 text-sm text-[var(--text)] focus:border-brand-500 focus:outline-none transition-colors cursor-pointer"
              >
                <option value="Data Access Request">Data Access &amp; Summary (§11)</option>
                <option value="Data Erasure Request">Erasure &amp; Right to be Forgotten (§12)</option>
                <option value="Data Correction Request">Correction &amp; Updating (§12)</option>
                <option value="Consent Withdrawal">Consent Withdrawal (§6(4))</option>
                <option value="Privacy Complaint">General Grievance / Inquiry (§13)</option>
                <option value="Other">Other Privacy Request</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[var(--text)] mb-1.5">
              Request Details &amp; Specifics <span className="text-rose-400">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              placeholder="Please describe the personal data, context, or specific grievance you are submitting (minimum 10 characters)..."
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-3.5 py-2.5 text-sm text-[var(--text)] placeholder-stone-500 focus:border-brand-500 focus:outline-none transition-colors resize-y"
            />
          </div>

          {errorMessage && (
            <div className="flex items-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-400">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
            <p className="text-[11px] text-soft leading-normal max-w-md">
              Requests are logged into an isolated audit trail and acknowledged within 24 hours. Identity verification may be required to protect personal data from unauthorized access.
            </p>

            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-500 px-6 py-2.5 font-medium text-xs text-black shadow-sm transition-all hover:bg-brand-400 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap self-end sm:self-auto"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Submitting...
                </>
              ) : (
                <>
                  <Send className="h-3.5 w-3.5" /> Submit Request
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
