import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Settings,
  ChevronDown,
  ChevronUp,
  X,
  Sliders,
} from 'lucide-react';

const STORAGE_KEY = 'hk_portfolio_cookie_consent';

export interface CookiePreferences {
  necessary: boolean;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
}

interface CookieCategory {
  key: keyof CookiePreferences;
  label: string;
  description: string;
  alwaysOn: boolean;
  legalBasis: string;
  retention: string;
  examples: { name: string; purpose: string; duration: string; provider: string }[];
}

const COOKIE_CATEGORIES: CookieCategory[] = [
  {
    key: 'necessary',
    label: 'Strictly Necessary',
    description: 'Essential for cryptographic security, session integrity, CSRF mitigation, and portfolio performance. Cannot be disabled.',
    alwaysOn: true,
    legalBasis: 'Legitimate Interest — GDPR Art.6(1)(f) / DPDP Act 2023 §4',
    retention: 'Session / 24h',
    examples: [
      { name: 'hk_session', purpose: 'CSRF security token & rate limiting', duration: 'Session', provider: '1st Party' },
      { name: 'hk_portfolio_cookie_consent', purpose: 'Stores statutory consent preferences', duration: '12 Months', provider: '1st Party' },
    ],
  },
  {
    key: 'functional',
    label: 'Functional & Preferences',
    description: 'Enables enhanced personalized UI experience: dark/light theme persistence, custom layout state, and command palette history.',
    alwaysOn: false,
    legalBasis: 'Consent — GDPR Art.6(1)(a) / DPDP Act 2023 §6',
    retention: '30 days',
    examples: [
      { name: 'theme', purpose: 'Dark/light visual mode preference', duration: '30 Days', provider: '1st Party' },
      { name: 'palette_recent', purpose: 'Quick command search history', duration: '14 Days', provider: '1st Party' },
    ],
  },
  {
    key: 'analytics',
    label: 'Analytics & Performance',
    description: 'Collects privacy-preserving anonymous telemetry: page views, tech stack interactions, project dwell time, and performance diagnostics.',
    alwaysOn: false,
    legalBasis: 'Consent — GDPR Art.6(1)(a) / CCPA §1798.120',
    retention: '90 days',
    examples: [
      { name: '_va_id', purpose: 'Vercel Analytics visitor telemetry', duration: '90 Days', provider: 'Vercel' },
      { name: 'perf_metric', purpose: 'Core Web Vitals & asset load timing', duration: '7 Days', provider: '1st Party' },
    ],
  },
  {
    key: 'marketing',
    label: 'Third-Party & Media Embeds',
    description: 'Allows interactive external embeds such as Meta Cloud WhatsApp demos, GitHub live commits feed, and video architecture streams.',
    alwaysOn: false,
    legalBasis: 'Consent — GDPR Art.6(1)(a) / DPDP Act 2023 §6',
    retention: '180 days',
    examples: [
      { name: 'meta_embed', purpose: 'WhatsApp / Meta Tech Provider preview widgets', duration: '180 Days', provider: 'Meta' },
      { name: 'gh_widget', purpose: 'GitHub API live repository preview', duration: '30 Days', provider: 'GitHub' },
    ],
  },
];

export default function CookieConsentBanner() {
  const [bannerVisible, setBannerVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [showFloatingPill, setShowFloatingPill] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const [preferences, setPreferences] = useState<CookiePreferences>(() => {
    try {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed?.preferences) return parsed.preferences;
        }
      }
    } catch {
      // ignore
    }
    return { necessary: true, functional: false, analytics: false, marketing: false };
  });

  useEffect(() => {
    let timer: any;
    const isTest = typeof window !== 'undefined' && (
      window.location.search.includes('show_cookies=1') ||
      window.location.hash.includes('cookie-consent')
    );

    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved || isTest) {
        timer = setTimeout(() => setBannerVisible(true), isTest ? 200 : 800);
      } else {
        setShowFloatingPill(true);
      }
    } catch {
      timer = setTimeout(() => setBannerVisible(true), 800);
    }

    const handleOpen = () => {
      setBannerVisible(false);
      setModalOpen(true);
      setShowFloatingPill(false);
    };

    window.addEventListener('open-cookie-banner', handleOpen);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('open-cookie-banner', handleOpen);
    };
  }, []);

  const saveConsent = async (status: 'all' | 'essential' | 'rejected' | 'custom', customPrefs?: CookiePreferences) => {
    const finalPrefs: CookiePreferences = customPrefs || {
      necessary: true,
      functional: status === 'all',
      analytics: status === 'all',
      marketing: status === 'all',
    };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        status,
        preferences: finalPrefs,
        channel: 'portfolio',
        source: 'portfolio_cookie_banner',
        timestamp: new Date().toISOString(),
        version: '2.0',
      }));

      window.dispatchEvent(new CustomEvent('cookie-consent-updated', {
        detail: { preferences: finalPrefs, status, channel: 'portfolio' },
      }));
    } catch {
      // ignore local storage errors
    }

    setBannerVisible(false);
    setModalOpen(false);
    setShowFloatingPill(true);

    // Fetch Geo if analytics is allowed
    let geo = { city: null, region: null, country: null, countryCode: null };
    if (finalPrefs.analytics || status === 'all') {
      try {
        const geoRes = await fetch('https://ipapi.co/json/', { signal: AbortSignal.timeout(3000) });
        if (geoRes.ok) {
          const data = await geoRes.json();
          geo = {
            city: data.city || null,
            region: data.region || null,
            country: data.country_name || null,
            countryCode: data.country_code || null,
          };
        }
      } catch {
        // Non-blocking geo failure fallback
      }
    }

    // Transmit consent audit trail to backend
    const apiBaseUrl = (import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/+$/, '');
    const payload = {
      status,
      preferences: finalPrefs,
      channel: 'portfolio',
      source: 'portfolio_cookie_banner',
      userAgent: navigator.userAgent,
      language: navigator.language || null,
      referrer: document.referrer || null,
      pageUrl: window.location.href,
      consentVersion: '2.0',
      ...geo,
    };

    try {
      await fetch(`${apiBaseUrl}/api/public/cookie-consent/record`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      console.warn('Could not sync cookie consent to backend:', err);
    }
  };

  const handleAcceptAll = () => saveConsent('all');
  const handleEssentialOnly = () => saveConsent('essential', { necessary: true, functional: false, analytics: false, marketing: false });
  const handleRejectAll = () => saveConsent('rejected', { necessary: true, functional: false, analytics: false, marketing: false });
  const handleSavePreferences = () => saveConsent('custom', preferences);

  const toggleCategory = (key: keyof CookiePreferences) => {
    if (key === 'necessary') return;
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const enabledCount = Object.values(preferences).filter(Boolean).length;

  return (
    <>
      {/* ── Persistent Floating Pill to re-open preferences (DPDP §6(4) / GDPR Art.7(3)) ── */}
      {showFloatingPill && !bannerVisible && !modalOpen && (
        <button
          onClick={() => {
            setModalOpen(true);
            setShowFloatingPill(false);
          }}
          className="fixed bottom-5 left-5 z-40 flex items-center gap-2 rounded-full border border-brand-500/30 bg-ink-950/80 px-3.5 py-2 text-xs font-medium text-slate-300 shadow-xl backdrop-blur-md transition-all hover:scale-105 hover:border-brand-400 hover:text-white"
          title="Manage Cookie Preferences & Compliance"
          aria-label="Open Cookie Preferences"
        >
          <span className="text-base" role="img" aria-label="cookie">🍪</span>
          <span className="hidden sm:inline font-mono text-[11px] text-brand-300">Cookie Settings</span>
        </button>
      )}

      {/* ── Initial Floating Bottom Banner ── */}
      {bannerVisible && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Cookie & Privacy Consent"
          className="fixed inset-x-0 bottom-0 z-50 p-4 sm:p-6"
        >
          <div className="mx-auto max-w-5xl rounded-2xl border border-brand-500/30 bg-[var(--bg)]/95 p-5 sm:p-6 shadow-2xl backdrop-blur-xl ring-1 ring-white/10">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              
              {/* Left Column: Heading, Badges, Text */}
              <div className="space-y-2.5 max-w-3xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xl" role="img" aria-label="cookie">🍪</span>
                  <h3 className="font-display text-base font-bold text-[var(--text)]">
                    Cookie &amp; Privacy Preferences
                  </h3>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                    <ShieldCheck className="h-3 w-3" /> DPDP 2023 · GDPR · CCPA
                  </span>
                </div>

                <p className="text-xs leading-relaxed text-soft">
                  We value your privacy. We use strictly necessary cookies to ensure security, plus optional performance,
                  analytics, and third-party integration cookies. In compliance with the <strong>India DPDP Act 2023</strong> and <strong>GDPR</strong>,
                  no tracking scripts are executed without your affirmative consent.{' '}
                  <Link to="/privacy" className="text-brand-400 hover:underline">
                    Privacy Policy
                  </Link>
                  {' · '}
                  <button
                    type="button"
                    onClick={() => {
                      setBannerVisible(false);
                      setModalOpen(true);
                    }}
                    className="text-brand-400 hover:underline font-semibold"
                  >
                    View Cookie Breakdown
                  </button>
                </p>
              </div>

              {/* Right Column: Action Buttons */}
              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handleRejectAll}
                  className="rounded-full border border-soft/60 px-3.5 py-2 text-xs font-semibold text-soft transition-colors hover:border-rose-400 hover:text-rose-400 active:scale-95"
                >
                  Reject All
                </button>
                <button
                  type="button"
                  onClick={handleEssentialOnly}
                  className="rounded-full border border-soft px-3.5 py-2 text-xs font-semibold text-[var(--text)] transition-colors hover:border-brand-400 hover:text-brand-400 active:scale-95"
                >
                  Essential Only
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setBannerVisible(false);
                    setModalOpen(true);
                  }}
                  className="inline-flex items-center gap-1.5 rounded-full border border-brand-500/40 bg-brand-500/10 px-3.5 py-2 text-xs font-semibold text-brand-300 transition-colors hover:bg-brand-500/20 active:scale-95"
                >
                  <Sliders className="h-3.5 w-3.5" />
                  Customize
                </button>
                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="btn-primary !px-5 !py-2 !text-xs font-bold"
                >
                  Accept All
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* ── Detailed Preferences Modal ── */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 sm:p-6 backdrop-blur-md overflow-y-auto"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="card relative w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl border-brand-500/40 bg-[var(--bg)]"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Manage Cookie Categories"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[var(--border)] px-6 py-4 bg-[var(--bg-soft)]">
              <div className="flex items-center gap-2.5">
                <div className="grid h-8 w-8 place-items-center rounded-lg bg-brand-500/20 text-brand-400">
                  <Settings className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-display text-base font-bold text-[var(--text)]">Cookie Preferences &amp; Permissions</h3>
                  <p className="text-[11px] font-mono text-soft">Channel: Portfolio Website · DPDP Act 2023 §6 Verifiable Consent</p>
                </div>
              </div>

              <button
                onClick={() => setModalOpen(false)}
                className="grid h-8 w-8 place-items-center rounded-full border border-[var(--border)] text-soft hover:bg-white/10 hover:text-[var(--text)] transition-colors"
                aria-label="Close modal"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Legal Framework banner */}
            <div className="px-6 py-3 border-b border-[var(--border)] bg-brand-500/5 flex flex-wrap items-center gap-2 text-[11px]">
              <span className="font-semibold text-brand-300">Legal Compliance:</span>
              <span className="rounded bg-brand-500/20 px-2 py-0.5 font-mono text-brand-200">DPDP Act 2023 §6, 12</span>
              <span className="rounded bg-brand-500/20 px-2 py-0.5 font-mono text-brand-200">GDPR Art. 6(1) &amp; 7</span>
              <span className="rounded bg-brand-500/20 px-2 py-0.5 font-mono text-brand-200">CCPA §1798.120</span>
              <span className="ml-auto text-soft">TTL: 12 Months Max</span>
            </div>

            {/* Categories List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {COOKIE_CATEGORIES.map((cat) => {
                const isExpanded = expandedCategory === cat.key;
                const isChecked = preferences[cat.key];

                return (
                  <div
                    key={cat.key}
                    className="rounded-xl border border-[var(--border)] bg-[var(--bg-soft)]/60 transition-colors hover:border-brand-500/30 overflow-hidden"
                  >
                    <div className="p-4 flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setExpandedCategory(isExpanded ? null : cat.key)}
                            className="flex items-center gap-1.5 text-left font-display text-sm font-bold text-[var(--text)] hover:text-brand-400 transition-colors"
                          >
                            <span>{cat.label}</span>
                            {isExpanded ? (
                              <ChevronUp className="h-3.5 w-3.5 text-brand-400" />
                            ) : (
                              <ChevronDown className="h-3.5 w-3.5 text-soft" />
                            )}
                          </button>
                          <span className="rounded bg-[var(--border)] px-1.5 py-0.5 font-mono text-[9px] uppercase text-soft">
                            {cat.retention}
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-soft leading-relaxed">{cat.description}</p>
                        <p className="mt-1.5 font-mono text-[10px] text-soft/80">{cat.legalBasis}</p>
                      </div>

                      {/* Switch */}
                      <div className="shrink-0 pt-1">
                        {cat.alwaysOn ? (
                          <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 text-[11px] font-bold text-emerald-400">
                            Always Active
                          </span>
                        ) : (
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => toggleCategory(cat.key)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-500"></div>
                          </label>
                        )}
                      </div>
                    </div>

                    {/* Collapsible Examples Table */}
                    {isExpanded && (
                      <div className="border-t border-[var(--border)] bg-black/20 p-4 text-xs">
                        <p className="font-semibold text-soft mb-2 uppercase text-[10px] tracking-wider">
                          Individual Cookies in this category:
                        </p>
                        <div className="overflow-x-auto">
                          <table className="w-full text-left font-mono text-[11px]">
                            <thead>
                              <tr className="border-b border-[var(--border)] text-soft">
                                <th className="pb-1.5">Cookie Name</th>
                                <th className="pb-1.5">Purpose</th>
                                <th className="pb-1.5">Duration</th>
                                <th className="pb-1.5">Provider</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-[var(--border)]/40">
                              {cat.examples.map((ex, i) => (
                                <tr key={i} className="text-soft">
                                  <td className="py-2 text-brand-300">{ex.name}</td>
                                  <td className="py-2 text-[var(--text)]">{ex.purpose}</td>
                                  <td className="py-2">{ex.duration}</td>
                                  <td className="py-2">{ex.provider}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Modal Footer */}
            <div className="border-t border-[var(--border)] bg-[var(--bg-soft)] px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <span className="text-xs text-soft font-mono">
                {enabledCount} of {COOKIE_CATEGORIES.length} Categories Enabled
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleRejectAll}
                  className="rounded-full border border-soft px-4 py-2 text-xs font-semibold text-soft hover:text-[var(--text)] transition-colors"
                >
                  Reject All
                </button>
                <button
                  type="button"
                  onClick={handleSavePreferences}
                  className="btn-primary !px-5 !py-2 !text-xs font-bold"
                >
                  Save My Preferences
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
