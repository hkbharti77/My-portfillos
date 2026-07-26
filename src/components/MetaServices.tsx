import { useState } from 'react';
import {
  MessageSquare,
  Send,
  Instagram,
  Facebook,
  ShieldCheck,
  Zap,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  BarChart2,
  Radio,
} from 'lucide-react';
import { useReveal } from '../hooks';

interface ServiceItem {
  id: string;
  title: string;
  badge: string;
  icon: typeof MessageSquare;
  tagline: string;
  description: string;
  accent: string;
  highlights: string[];
  deliverables: string[];
}

const metaServices: ServiceItem[] = [
  {
    id: 'whatsapp-setup',
    title: 'Meta Cloud WhatsApp Setup for Help & Support',
    badge: 'Official Meta Cloud API',
    icon: MessageSquare,
    tagline: '24/7 AI-powered WhatsApp helpdesk, webhooks & human handoff queue.',
    description:
      'Full setup of the Meta Cloud WhatsApp Business API for customer support. We configure webhooks, verify Meta Business accounts, build LLM/RAG chatbots for automated replies, and integrate live-agent queues when human support is needed.',
    accent: 'border-emerald-500/30 bg-emerald-500/5 hover:border-emerald-500/60',
    highlights: [
      'Meta Cloud API Webhook Ingress (FastAPI / Node)',
      'AI Assistant with Custom Knowledge Base (RAG)',
      'Interactive List & Quick-Reply Buttons',
      'Confidence-gated Human Agent Queue Handoff',
      'Multi-tenant Customer Data Isolation',
    ],
    deliverables: [
      'WABA & Phone Number Verification',
      'Webhook Server & Signature Security',
      'Customer Support AI Agent',
      'Live Rep Dashboard Integration',
    ],
  },
  {
    id: 'whatsapp-broadcasting',
    title: 'WhatsApp Integration for Broadcasting Campaigns',
    badge: 'Bulk Campaign Engine',
    icon: Send,
    tagline: 'High-throughput bulk broadcast messaging, HSM template manager & analytics.',
    description:
      'Enterprise WhatsApp campaign broadcasting system compliant with official Meta throughput tiers (Tiers 1-4). Includes HSM (Highly Structured Message) template approval workflows, dynamic audience segmentation, rate limiting, and real-time delivery/read tracking.',
    accent: 'border-green-500/30 bg-green-500/5 hover:border-green-500/60',
    highlights: [
      'Meta Approved HSM Template Sync Pipeline',
      'Redis Token-Bucket Rate Limiter for Meta Tiers',
      'Audience Tagging & Dynamic Variable Insertion',
      'Async Worker Queue for Concurrent Message Dispatch',
      'Realtime Delivered, Read & Click Conversion Analytics',
    ],
    deliverables: [
      'Campaign Builder & Scheduler',
      'HSM Template Management Suite',
      'Rate-limited Broadcast Dispatcher',
      'Performance Analytics Dashboard',
    ],
  },
  {
    id: 'instagram-integration',
    title: 'Instagram Integration & DM Automation',
    badge: 'Instagram Graph API',
    icon: Instagram,
    tagline: 'Automated IG DMs, comment keyword triggers & story mention lead capture.',
    description:
      'Complete Instagram Graph API integration for social commerce and customer engagement. Automatically convert post comments into instant private direct messages, capture lead info from story mentions, and unify Instagram DMs with WhatsApp into one support feed.',
    accent: 'border-pink-500/30 bg-pink-500/5 hover:border-pink-500/60',
    highlights: [
      'Comment-to-DM Trigger Engine (e.g. comment "INFO")',
      'Story Mention Recognition & Instant Lead Capture',
      'Instagram Messaging API Webhook Listener',
      'Automated Product Catalog & Shop DM Links',
      'Unified Inbox (WhatsApp + Instagram Messages)',
    ],
    deliverables: [
      'Instagram App Setup & Permissions',
      'Comment Keyword Auto-Responder',
      'Story Lead Capture Workflow',
      'Unified Messaging Interface',
    ],
  },
  {
    id: 'facebook-login',
    title: 'Facebook Login & Meta OAuth Integration',
    badge: 'Meta OAuth 2.0',
    icon: Facebook,
    tagline: 'Secure social authentication, Page Access Tokens & permissions delegation.',
    description:
      'Seamless Facebook Login (Meta OAuth 2.0) setup for websites and applications. Manages user authentication, long-lived Page access token generation, permission scopes (whatsapp_business_messaging, pages_messaging), and single sign-on (SSO).',
    accent: 'border-sky-500/30 bg-sky-500/5 hover:border-sky-500/60',
    highlights: [
      'Meta JS SDK & Server-side OAuth 2.0 Handshake',
      'Short-lived to Long-lived Page Access Token Refresh',
      'Encrypted KMS Token Storage & Automatic Expiration Daemon',
      'Granular Permission Scopes Request & Management',
      'Compliance with Meta Data Privacy Requirements',
    ],
    deliverables: [
      'FB Login SDK & Backend Auth',
      'Token Auto-Refresh Daemon',
      'Page Access Token Vault',
      'Single Sign-On (SSO) Ready',
    ],
  },
  {
    id: 'meta-tech-provider',
    title: 'Become an Official Meta Tech Provider',
    badge: 'Meta Tech Partner Guidance',
    icon: ShieldCheck,
    tagline: 'Consulting & tech stack to enable your business as an official Meta Tech Provider.',
    description:
      'We guide agencies, SaaS platforms, and software vendors to achieve official Meta Tech Provider (Tech Partner) status. Implement Meta Embedded Signup so your clients can connect their WhatsApp & Facebook pages in 1-click, and pass Meta App Review with ease.',
    accent: 'border-blue-500/30 bg-blue-500/5 hover:border-blue-500/60',
    highlights: [
      'Meta Embedded Signup 1-Click Client Onboarding',
      'Meta Business Manager Asset Delegation API',
      'Meta App Review Screencast & Submission Support',
      'Business Verification & Privacy Policy Compliance',
      'Multi-tenant Partner Management Dashboard',
    ],
    deliverables: [
      'Embedded Signup OAuth Integration',
      'App Review Approval Readiness Package',
      'Meta Tech Provider Partner Consulting',
      '1-Click Client WABA Onboarding',
    ],
  },
];

interface Props {
  onOpenPrivacy?: () => void;
  onOpenTerms?: () => void;
}

export default function MetaServices({ onOpenPrivacy, onOpenTerms }: Props) {
  const ref = useReveal<HTMLDivElement>();
  const [activeTab, setActiveTab] = useState<'calculator' | 'sandbox' | 'readiness'>('calculator');

  // Calculator State
  const [recipients, setRecipients] = useState<number>(25000);
  const [channel, setChannel] = useState<'whatsapp' | 'instagram'>('whatsapp');
  const [tier, setTier] = useState<number>(2); // Tier 2 = 10k/day, Tier 3 = 100k/day

  // Template Sandbox State
  const [templateName, setTemplateName] = useState<string>('order_update_v1');
  const [customName, setCustomName] = useState<string>('Alex');
  const [discountCode, setDiscountCode] = useState<string>('META2026');

  // Readiness Checklist State
  const [checklist, setChecklist] = useState<Record<string, boolean>>({
    devAccount: true,
    bizVerification: true,
    embeddedSignup: false,
    appReviewDocs: false,
    webhookSecurity: true,
  });

  const toggleChecklist = (key: string) => {
    setChecklist((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const checklistScore = Object.values(checklist).filter(Boolean).length;
  const readinessPct = Math.round((checklistScore / Object.keys(checklist).length) * 100);

  // Calculations for Broadcast Simulator
  const estOpenRate = channel === 'whatsapp' ? 98 : 84;
  const estClickRate = channel === 'whatsapp' ? 42 : 28;
  const expectedOpens = Math.round((recipients * estOpenRate) / 100);
  const expectedClicks = Math.round((recipients * estClickRate) / 100);
  const speedPerHour = tier === 1 ? 1000 : tier === 2 ? 10000 : tier === 3 ? 100000 : 500000;
  const estDispatchTimeMinutes = Math.max(1, Math.round((recipients / speedPerHour) * 60));

  return (
    <section id="meta-services" className="section-pad relative py-24 sm:py-28">
      <div ref={ref} className="reveal mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-widest text-brand-500">
            03 — META ECOSYSTEM & MESSAGING
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Meta Cloud WhatsApp, Instagram & <span className="gradient-text">Tech Provider</span> Setup
          </h2>
          <p className="mt-4 text-base leading-relaxed text-soft sm:text-lg">
            We provide end-to-end integration and consultancy for Meta APIs — setting up Meta Cloud WhatsApp for automated customer helpdesks, building high-throughput broadcasting engines, automating Instagram DMs & comment triggers, Facebook Login, and enabling your business to become an official Meta Tech Provider.
          </p>
        </div>

        {/* Quick Highlights Counter */}
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="card p-4">
            <div className="flex items-center gap-2 text-emerald-500">
              <MessageSquare className="h-5 w-5" />
              <span className="font-display text-2xl font-bold text-foreground">98%</span>
            </div>
            <p className="mt-1 text-xs text-soft">WhatsApp Open Rate</p>
          </div>
          <div className="card p-4">
            <div className="flex items-center gap-2 text-green-500">
              <Send className="h-5 w-5" />
              <span className="font-display text-2xl font-bold text-foreground">1M+</span>
            </div>
            <p className="mt-1 text-xs text-soft">Daily Broadcast Capacity</p>
          </div>
          <div className="card p-4">
            <div className="flex items-center gap-2 text-pink-500">
              <Instagram className="h-5 w-5" />
              <span className="font-display text-2xl font-bold text-foreground">3.1×</span>
            </div>
            <p className="mt-1 text-xs text-soft">IG DM Lead Growth</p>
          </div>
          <div className="card p-4">
            <div className="flex items-center gap-2 text-blue-500">
              <ShieldCheck className="h-5 w-5" />
              <span className="font-display text-2xl font-bold text-foreground">100%</span>
            </div>
            <p className="mt-1 text-xs text-soft">Meta App Review Pass Rate</p>
          </div>
        </div>

        {/* 5 Core Pillars Grid */}
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {metaServices.map((s) => (
            <div
              key={s.id}
              className={`card group relative flex flex-col justify-between p-6 transition-all duration-300 ${s.accent}`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="chip py-1 text-[10px] uppercase font-mono font-semibold tracking-wider text-brand-500">
                    {s.badge}
                  </span>
                  <s.icon className="h-6 w-6 text-brand-400 group-hover:scale-110 transition-transform duration-300" />
                </div>

                <h3 className="mt-4 font-display text-xl font-bold text-foreground">{s.title}</h3>
                <p className="mt-1 text-xs font-medium text-brand-400">{s.tagline}</p>
                <p className="mt-3 text-xs leading-relaxed text-soft">{s.description}</p>

                <div className="mt-5 space-y-2 border-t border-soft/60 pt-4">
                  <p className="text-[11px] font-mono font-semibold uppercase text-soft tracking-wider">Key Capabilities</p>
                  {s.highlights.map((h) => (
                    <div key={h} className="flex items-start gap-2 text-xs text-soft">
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-400 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 border-t border-soft/60 pt-4">
                <div className="flex flex-wrap gap-1.5">
                  {s.deliverables.map((d) => (
                    <span key={d} className="rounded bg-soft/40 px-2 py-0.5 text-[10px] font-mono text-soft">
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* Meta Tech Partner CTA Card */}
          <div className="card relative flex flex-col justify-between overflow-hidden p-6 bg-gradient-to-br from-brand-500/20 via-accent-500/10 to-transparent border-brand-500/40">
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand-500/20 blur-2xl" />
            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-brand-400" />
                <span className="font-mono text-xs uppercase font-bold text-brand-400">Meta Tech Partner</span>
              </div>

              <h3 className="mt-4 font-display text-2xl font-bold text-foreground">
                Want to become an official Meta Tech Provider?
              </h3>
              <p className="mt-3 text-xs leading-relaxed text-soft">
                Transform your agency or software app into an official Meta Tech Partner. Enable 1-click Meta Embedded Signup for your clients, build multi-tenant WhatsApp dashboards, and get 100% guidance through Meta App Review & Business Verification.
              </p>

              <div className="mt-6 space-y-2">
                <div className="flex items-center gap-2 text-xs text-brand-300">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" /> 1-Click Embedded Signup OAuth
                </div>
                <div className="flex items-center gap-2 text-xs text-brand-300">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Complete Meta App Review Assistance
                </div>
                <div className="flex items-center gap-2 text-xs text-brand-300">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Multi-Tenant Client WABA Dashboard
                </div>
              </div>
            </div>

            <div className="mt-8">
              <a href="#contact" className="btn-primary w-full text-center justify-center">
                Get Meta Tech Provider Guidance <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Interactive Meta Sandbox & Estimator Suite */}
        <div className="mt-16 card p-6 sm:p-8 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-soft pb-6">
            <div>
              <div className="inline-flex items-center gap-2 font-mono text-xs uppercase text-brand-500 font-semibold">
                <Zap className="h-4 w-4 text-brand-500" /> Live Meta Interactive Sandbox
              </div>
              <h3 className="mt-1 font-display text-2xl font-bold text-foreground">
                Test WhatsApp & Instagram Integration Tools
              </h3>
            </div>

            {/* Tab Switches */}
            <div className="flex flex-wrap gap-2 rounded-xl bg-soft/30 p-1.5 border border-soft">
              <button
                onClick={() => setActiveTab('calculator')}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                  activeTab === 'calculator' ? 'bg-brand-500 text-white shadow' : 'text-soft hover:text-foreground'
                }`}
              >
                Campaign Simulator
              </button>
              <button
                onClick={() => setActiveTab('sandbox')}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                  activeTab === 'sandbox' ? 'bg-brand-500 text-white shadow' : 'text-soft hover:text-foreground'
                }`}
              >
                HSM & DM Sandbox
              </button>
              <button
                onClick={() => setActiveTab('readiness')}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                  activeTab === 'readiness' ? 'bg-brand-500 text-white shadow' : 'text-soft hover:text-foreground'
                }`}
              >
                Tech Provider Readiness
              </button>
            </div>
          </div>

          {/* TAB 1: Campaign Simulator */}
          {activeTab === 'calculator' && (
            <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:items-center">
              <div className="space-y-6">
                <div>
                  <label className="mb-2 flex items-center justify-between text-xs font-medium text-soft">
                    <span>Target Audience Size (Recipients)</span>
                    <span className="font-mono text-sm font-bold text-brand-400">
                      {recipients.toLocaleString()} users
                    </span>
                  </label>
                  <input
                    type="range"
                    min="1000"
                    max="200000"
                    step="1000"
                    value={recipients}
                    onChange={(e) => setRecipients(Number(e.target.value))}
                    className="w-full accent-brand-500 cursor-pointer"
                  />
                  <div className="flex justify-between font-mono text-[10px] text-soft mt-1">
                    <span>1,000</span>
                    <span>50,000</span>
                    <span>100,000</span>
                    <span>200,000+</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-soft">Broadcast Channel</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setChannel('whatsapp')}
                        className={`flex items-center justify-center gap-1.5 rounded-xl border p-2 text-xs font-semibold transition-all ${
                          channel === 'whatsapp'
                            ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
                            : 'border-soft text-soft hover:bg-soft/30'
                        }`}
                      >
                        <MessageSquare className="h-3.5 w-3.5" /> WhatsApp
                      </button>
                      <button
                        onClick={() => setChannel('instagram')}
                        className={`flex items-center justify-center gap-1.5 rounded-xl border p-2 text-xs font-semibold transition-all ${
                          channel === 'instagram'
                            ? 'border-pink-500 bg-pink-500/10 text-pink-400'
                            : 'border-soft text-soft hover:bg-soft/30'
                        }`}
                      >
                        <Instagram className="h-3.5 w-3.5" /> Instagram
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-soft">Meta Throughput Tier</label>
                    <select
                      value={tier}
                      onChange={(e) => setTier(Number(e.target.value))}
                      className="w-full rounded-xl border border-soft bg-soft/20 px-3 py-2 text-xs text-foreground outline-none font-mono"
                    >
                      <option value={1}>Tier 1 (1k msg/day)</option>
                      <option value={2}>Tier 2 (10k msg/day)</option>
                      <option value={3}>Tier 3 (100k msg/day)</option>
                      <option value={4}>Tier 4 (Unlimited)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Live Output Simulation Card */}
              <div className="card p-6 bg-ink-950/60 border-brand-500/30">
                <div className="flex items-center justify-between border-b border-soft/50 pb-4">
                  <span className="font-mono text-xs font-bold text-brand-400 uppercase flex items-center gap-2">
                    <BarChart2 className="h-4 w-4" /> Live Broadcast Simulation Result
                  </span>
                  <span className="chip py-0.5 text-[10px] font-mono text-emerald-400 border-emerald-500/40">
                    Meta Cloud Synced
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="rounded-xl border border-soft bg-soft/10 p-3">
                    <p className="text-[11px] text-soft">Estimated Message Opens</p>
                    <p className="mt-1 font-display text-2xl font-bold text-emerald-400">
                      {expectedOpens.toLocaleString()}
                    </p>
                    <p className="text-[10px] text-soft font-mono">({estOpenRate}% Open Rate)</p>
                  </div>
                  <div className="rounded-xl border border-soft bg-soft/10 p-3">
                    <p className="text-[11px] text-soft">Estimated Clicks / Replies</p>
                    <p className="mt-1 font-display text-2xl font-bold text-brand-400">
                      {expectedClicks.toLocaleString()}
                    </p>
                    <p className="text-[10px] text-soft font-mono">({estClickRate}% Engagement)</p>
                  </div>
                </div>

                <div className="mt-4 space-y-2 text-xs text-soft font-mono">
                  <div className="flex justify-between py-1 border-b border-soft/30">
                    <span>Dispatch Speed:</span>
                    <span className="text-foreground">{speedPerHour.toLocaleString()} msgs / hr</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-soft/30">
                    <span>Est. Broadcast Dispatch Time:</span>
                    <span className="text-foreground font-bold">{estDispatchTimeMinutes} minutes</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>Meta Rate Limit Status:</span>
                    <span className="text-emerald-400 font-bold">100% Compliant (Redis Token Bucket)</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: HSM & Comment-to-DM Sandbox */}
          {activeTab === 'sandbox' && (
            <div className="mt-6 grid gap-8 lg:grid-cols-2">
              {/* Controls */}
              <div className="space-y-4">
                <p className="text-xs font-mono text-brand-500 uppercase font-semibold">Interactive Template & DM Tester</p>
                <div>
                  <label className="mb-1 block text-xs font-medium text-soft">HSM Message Template</label>
                  <select
                    value={templateName}
                    onChange={(e) => setTemplateName(e.target.value)}
                    className="w-full rounded-xl border border-soft bg-soft/20 px-3 py-2 text-xs text-foreground outline-none font-mono"
                  >
                    <option value="order_update_v1">order_update_v1 (Approved)</option>
                    <option value="promo_broadcast_v2">promo_broadcast_v2 (Approved)</option>
                    <option value="support_handoff_v1">support_handoff_v1 (Approved)</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-soft">Customer Name Variable (&#123;&#123;1&#125;&#125;)</label>
                  <input
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    className="w-full rounded-xl border border-soft bg-soft/20 px-3 py-2 text-xs text-foreground outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-soft">Promo Code Variable (&#123;&#123;2&#125;&#125;)</label>
                  <input
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    className="w-full rounded-xl border border-soft bg-soft/20 px-3 py-2 text-xs text-foreground outline-none font-mono"
                  />
                </div>

                <div className="card p-3 bg-soft/10 text-xs text-soft space-y-1">
                  <p className="font-semibold text-foreground flex items-center gap-1.5">
                    <Radio className="h-3.5 w-3.5 text-pink-500" /> Instagram Comment Auto-DM Trigger
                  </p>
                  <p>When a user comments <span className="font-mono text-pink-400 font-bold">"INFO"</span> on your Instagram post, our webhook fires and sends this exact rich message to their DMs instantly!</p>
                </div>
              </div>

              {/* WhatsApp / Instagram Mobile Preview Mockup */}
              <div className="mx-auto w-full max-w-sm rounded-3xl border-4 border-ink-800 bg-ink-950 p-4 shadow-2xl">
                {/* Phone Header */}
                <div className="flex items-center justify-between border-b border-ink-800 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="grid h-8 w-8 place-items-center rounded-full bg-emerald-500 text-white font-bold text-xs">
                      WA
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">Your Business (Verified)</p>
                      <p className="text-[10px] text-emerald-400 font-mono">Official WhatsApp Business</p>
                    </div>
                  </div>
                  <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-[9px] font-mono text-emerald-400">
                    {templateName}
                  </span>
                </div>

                {/* Chat Bubble */}
                <div className="mt-4 space-y-3">
                  <div className="rounded-2xl rounded-tl-none bg-ink-900 p-3 text-xs text-ink-100 shadow border border-ink-800">
                    <p className="font-bold text-emerald-400 mb-1">🎉 Special Offer Update</p>
                    <p>
                      Hi <span className="font-bold text-amber-300">{customName || 'Customer'}</span>! Thanks for reaching out. Use code <span className="font-mono font-bold text-emerald-400 bg-emerald-950 px-1 rounded">{discountCode || 'PROMO'}</span> for 20% off your next order.
                    </p>
                    <div className="mt-3 space-y-1.5">
                      <button className="w-full rounded-lg bg-emerald-600/30 border border-emerald-500/40 py-1.5 text-center text-[11px] font-semibold text-emerald-300 hover:bg-emerald-600/50">
                        🛒 Claim Promo Code
                      </button>
                      <button className="w-full rounded-lg bg-ink-800 py-1.5 text-center text-[11px] font-semibold text-ink-300 hover:bg-ink-700">
                        💬 Speak to Live Support Rep
                      </button>
                    </div>
                    <p className="mt-2 text-[9px] text-ink-400 text-right font-mono">12:12 PM ✓✓</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Tech Provider Readiness Checklist */}
          {activeTab === 'readiness' && (
            <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:items-center">
              <div className="space-y-3">
                <p className="text-xs font-mono text-brand-500 uppercase font-semibold">Meta Tech Provider Readiness Assessment</p>
                
                <div className="space-y-2">
                  <label className="flex items-center justify-between card p-3 cursor-pointer hover:border-brand-400/50">
                    <span className="text-xs font-medium text-foreground">1. Meta Developer & Business Manager Account Created</span>
                    <input
                      type="checkbox"
                      checked={checklist.devAccount}
                      onChange={() => toggleChecklist('devAccount')}
                      className="h-4 w-4 accent-brand-500 rounded"
                    />
                  </label>

                  <label className="flex items-center justify-between card p-3 cursor-pointer hover:border-brand-400/50">
                    <span className="text-xs font-medium text-foreground">2. Meta Business Verification Completed</span>
                    <input
                      type="checkbox"
                      checked={checklist.bizVerification}
                      onChange={() => toggleChecklist('bizVerification')}
                      className="h-4 w-4 accent-brand-500 rounded"
                    />
                  </label>

                  <label className="flex items-center justify-between card p-3 cursor-pointer hover:border-brand-400/50">
                    <span className="text-xs font-medium text-foreground">3. Meta Embedded Signup OAuth Flow Configured</span>
                    <input
                      type="checkbox"
                      checked={checklist.embeddedSignup}
                      onChange={() => toggleChecklist('embeddedSignup')}
                      className="h-4 w-4 accent-brand-500 rounded"
                    />
                  </label>

                  <label className="flex items-center justify-between card p-3 cursor-pointer hover:border-brand-400/50">
                    <span className="text-xs font-medium text-foreground">4. Meta App Review Submission & Video Screencasts Prepared</span>
                    <input
                      type="checkbox"
                      checked={checklist.appReviewDocs}
                      onChange={() => toggleChecklist('appReviewDocs')}
                      className="h-4 w-4 accent-brand-500 rounded"
                    />
                  </label>

                  <label className="flex items-center justify-between card p-3 cursor-pointer hover:border-brand-400/50">
                    <span className="text-xs font-medium text-foreground">5. Secure Webhook Server & Signature Verification (SHA256)</span>
                    <input
                      type="checkbox"
                      checked={checklist.webhookSecurity}
                      onChange={() => toggleChecklist('webhookSecurity')}
                      className="h-4 w-4 accent-brand-500 rounded"
                    />
                  </label>
                </div>
              </div>

              <div className="card p-6 bg-ink-950/70 border-brand-500/40 text-center">
                <ShieldCheck className="mx-auto h-12 w-12 text-brand-400" />
                <h4 className="mt-3 font-display text-2xl font-bold text-foreground">
                  Readiness Score: {readinessPct}%
                </h4>
                
                <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-soft/20">
                  <div
                    className="h-full bg-gradient-to-r from-brand-500 to-emerald-500 transition-all duration-500"
                    style={{ width: `${readinessPct}%` }}
                  />
                </div>

                <p className="mt-4 text-xs text-soft leading-relaxed">
                  {readinessPct >= 80
                    ? '🎉 Excellent! Your business is fully prepared to become an official Meta Tech Provider. Let us complete your Meta App Review submission!'
                    : '💡 You are almost there! We can help you complete your Embedded Signup flow and Meta App Review compliance in under 5 days.'}
                </p>

                <div className="mt-6">
                  <a href="#contact" className="btn-primary w-full text-center justify-center">
                    Schedule Meta Tech Provider Call <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Legal & Meta App Review Compliance Banner */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-3 rounded-2xl border border-soft bg-soft/20 px-6 py-4 text-xs text-soft">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>Full compliance with Meta Developer Policies, Data Privacy & WhatsApp Messaging Guidelines.</span>
          </div>
          <div className="flex items-center gap-3 font-mono text-[11px]">
            <button onClick={onOpenPrivacy} className="text-brand-400 hover:underline">
              Privacy Policy
            </button>
            <span>•</span>
            <button onClick={onOpenTerms} className="text-brand-400 hover:underline">
              Terms & Conditions
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
