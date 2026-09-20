import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight, Check, ChevronDown, Info, PhoneIncoming, PhoneOutgoing,
  Zap,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CommandPalette from '../components/CommandPalette';
import { pricingConfig, type PricingPlan } from '../data/pricing';

const fmtINR = (n: number) => `₹${n.toLocaleString('en-IN')}`;

export default function Pricing() {
  const navigate = useNavigate();
  const [yearly, setYearly] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleNavigate = (id: string) => {
    if (id === 'home') {
      navigate('/');
    } else if (id === 'pricing') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate(`/#${id}`);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = 'Gyan VaniAi Pricing — Plans, Add-ons & FAQ | Himanshu Bharti';

    const setMeta = (attr: string, key: string, value: string) => {
      let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
      if (!el) { el = document.createElement('meta'); el.setAttribute(attr, key); document.head.appendChild(el); }
      el.setAttribute('content', value);
    };
    const canonicalUrl = 'https://hkbharti77.github.io/My-portfillos/pricing';
    const desc = 'Gyan VaniAi pricing — Starter ₹1,999, Growth ₹4,999, Scale ₹9,999 and Enterprise plans with CRM, WhatsApp, AI RAG, Voice Bot Assistant and AI Calling Agent. Save 20% with annual billing.';

    setMeta('name', 'description', desc);
    setMeta('property', 'og:title', 'Gyan VaniAi Pricing — Plans & Add-ons');
    setMeta('property', 'og:description', desc);
    setMeta('property', 'og:url', canonicalUrl);
    setMeta('property', 'og:type', 'website');

    let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) { link = document.createElement('link'); link.setAttribute('rel', 'canonical'); document.head.appendChild(link); }
    link.setAttribute('href', canonicalUrl);

    return () => {
      document.title = 'Himanshu Bharti — Software Engineer | Custom Software, AI CRM/ERP & Meta Tech Provider';
    };
  }, []);

  const discount = pricingConfig.annualDiscount;
  const monthlyFor = (plan: PricingPlan) =>
    plan.priceMonthly == null ? null : yearly ? Math.round(plan.priceMonthly * (1 - discount)) : plan.priceMonthly;
  const annualTotalFor = (plan: PricingPlan) =>
    plan.priceMonthly == null ? null : Math.round(plan.priceMonthly * (1 - discount)) * 12;

  const limitRows = pricingConfig.plans[0].limits.map((l, i) => ({
    label: l.label,
    values: pricingConfig.plans.map(p => p.limits[i]?.value ?? '—'),
  }));

  const goContact = () => navigate('/#contact');

  return (
    <div className="min-h-screen bg-[var(--bg)] flex flex-col justify-between selection:bg-brand-500/30">
      <Navbar active="pricing" onNavigate={handleNavigate} onOpenPalette={() => setPaletteOpen(true)} />
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} onNavigate={handleNavigate} />

      <main className="flex-1 pt-20">
        {/* ─── Hero ─── */}
        <div className="relative overflow-hidden border-b border-[var(--border)] bg-gradient-to-b from-brand-950/20 via-transparent to-transparent py-16 sm:py-20">
          <div className="pointer-events-none absolute inset-0 grid-bg opacity-30" />
          <div
            className="pointer-events-none absolute -top-44 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full opacity-25 blur-[120px]"
            style={{ background: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)' }}
          />

          <div className="section-pad relative mx-auto max-w-7xl text-center">
            <h1 className="font-display text-4xl font-extrabold tracking-tight text-[var(--text)] sm:text-5xl lg:text-6xl">
              Simple, transparent <span className="gradient-text">pricing</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-soft sm:text-lg">
              Start affordably with CRM, WhatsApp and AI — upgrade as you grow. Every plan includes generous usage allowances, and annual billing saves {Math.round(discount * 100)}%.
            </p>

            {/* Billing toggle */}
            <div className="mt-8 inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--card)]/80 p-1 shadow-lg backdrop-blur-md">
              <button
                onClick={() => setYearly(false)}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200 ${
                  !yearly ? 'bg-brand-500 text-white shadow-md shadow-brand-500/30' : 'text-soft hover:text-brand-400'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setYearly(true)}
                className={`flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200 ${
                  yearly ? 'bg-brand-500 text-white shadow-md shadow-brand-500/30' : 'text-soft hover:text-brand-400'
                }`}
              >
                Yearly
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${yearly ? 'bg-white/20 text-white' : 'bg-accent-500/15 text-accent-500'}`}>
                  −{Math.round(discount * 100)}%
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* ─── Plan Cards ─── */}
        <div className="section-pad mx-auto max-w-7xl py-14 pb-8">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {pricingConfig.plans.map((plan, i) => {
              const monthly = monthlyFor(plan);
              const annualTotal = annualTotalFor(plan);
              return (
                <div
                  key={plan.id}
                  className={`card relative flex animate-fade-up flex-col p-6 transition-all duration-300 ${
                    plan.popular
                      ? 'border-brand-500/60 shadow-2xl shadow-brand-500/10 ring-1 ring-brand-500/30 xl:-translate-y-3'
                      : 'hover:border-brand-500/40'
                  }`}
                  style={{ animationDelay: `${i * 70}ms` }}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-500 px-3.5 py-1 text-xs font-bold text-white shadow-lg shadow-brand-500/40">
                      Most Popular
                    </div>
                  )}

                  <h3 className="font-display text-xl font-bold text-[var(--text)]">{plan.name}</h3>
                  <p className="mt-1 min-h-[2.5rem] text-xs leading-relaxed text-soft">{plan.tagline}</p>

                  {/* Price */}
                  <div className="mt-4 flex items-end gap-2">
                    {monthly == null ? (
                      <>
                        <span className="font-display text-4xl font-extrabold tracking-tight text-[var(--text)]">Custom</span>
                      </>
                    ) : (
                      <>
                        <span className="font-display text-4xl font-extrabold tracking-tight text-[var(--text)]">{fmtINR(monthly)}</span>
                        <span className="pb-1 text-sm font-medium text-soft">/month</span>
                        {yearly && (
                          <span className="pb-1.5 text-xs text-soft line-through">{fmtINR(plan.priceMonthly!)}</span>
                        )}
                      </>
                    )}
                  </div>
                  <p className="mt-1 h-4 text-[11px] font-mono text-soft">
                    {monthly == null ? 'Tailored to your volume' : yearly ? `Billed annually (${fmtINR(annualTotal!)}/yr)` : 'Billed monthly'}
                  </p>

                  {/* Usage limits */}
                  <div className="mt-5 grid grid-cols-2 gap-x-3 gap-y-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg-soft)]/60 p-4">
                    {plan.limits.map(l => (
                      <div key={l.label}>
                        <div className="text-[9px] font-semibold uppercase tracking-wider text-soft">{l.label}</div>
                        <div className={`text-xs font-semibold ${l.value === 'Not included' ? 'italic text-soft' : 'text-[var(--text)]'}`}>
                          {l.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Features */}
                  <div className="mt-5 flex-1">
                    {plan.includesFrom && (
                      <p className="mb-3 text-xs font-semibold text-brand-400">
                        Everything in {plan.includesFrom}, plus:
                      </p>
                    )}
                    <div className="space-y-3.5">
                      {plan.featureGroups.map(g => (
                        <div key={g.category}>
                          <div className="mb-1.5 font-mono text-[10px] font-semibold uppercase tracking-widest text-soft">
                            {g.category}
                          </div>
                          <ul className="space-y-1.5">
                            {g.items.map(f => (
                              <li key={f} className="flex items-start gap-2 text-xs leading-snug text-soft">
                                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent-500" />
                                <span>{f}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <button
                    onClick={goContact}
                    className={`mt-6 w-full ${plan.popular ? 'btn-primary' : 'btn-ghost'}`}
                  >
                    {plan.ctaLabel} <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Transparent usage disclaimer */}
          <div className="mx-auto mt-10 max-w-3xl space-y-3">
            <div className="flex gap-3 rounded-xl border border-[var(--border)] bg-[var(--card)]/50 p-4">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
              <p className="text-xs leading-relaxed text-soft">{pricingConfig.usageDisclaimer}</p>
            </div>
            <p className="text-center text-[11px] text-soft">
              <span className="font-semibold">*</span> {pricingConfig.unlimitedCampaignsNote}
            </p>
          </div>
        </div>

        {/* ─── Usage Comparison ─── */}
        <section className="border-t border-[var(--border)] bg-[var(--bg-soft)]/40">
          <div className="section-pad mx-auto max-w-7xl py-14">
            <div className="mb-8 text-center">
              <h2 className="font-display text-2xl font-bold tracking-tight text-[var(--text)] sm:text-3xl">
                Compare usage allowances
              </h2>
              <p className="mx-auto mt-2 max-w-xl text-sm text-soft">
                Every plan includes clear monthly allowances. Additional usage is billed transparently — never as a surprise.
              </p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-[var(--border)] shadow-lg">
              <table className="w-full min-w-[760px] border-collapse text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)] bg-[var(--bg-soft)]">
                    <th className="px-5 py-4 text-left font-mono text-[11px] font-semibold uppercase tracking-widest text-soft">
                      Allowance
                    </th>
                    {pricingConfig.plans.map(p => (
                      <th
                        key={p.id}
                        className={`px-5 py-4 text-center font-display text-sm font-bold ${
                          p.popular ? 'bg-brand-500/10 text-brand-400' : 'text-[var(--text)]'
                        }`}
                      >
                        {p.name}
                        {p.popular && <span className="ml-1.5 align-middle text-[9px] font-bold uppercase tracking-wide">Popular</span>}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {limitRows.map(row => (
                    <tr key={row.label} className="border-b border-[var(--border)] last:border-0">
                      <td className="px-5 py-3.5 text-xs font-medium text-[var(--text)]">{row.label}</td>
                      {row.values.map((v, vi) => (
                        <td
                          key={`${row.label}-${vi}`}
                          className={`px-5 py-3.5 text-center text-xs font-semibold ${
                            pricingConfig.plans[vi].popular ? 'bg-brand-500/5 text-[var(--text)]' : 'text-soft'
                          } ${v === 'Not included' ? 'italic font-normal text-soft' : ''}`}
                        >
                          {v}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ─── Add-ons ─── */}
        <section className="section-pad mx-auto max-w-7xl py-14">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent-500/30 bg-accent-500/10 px-3.5 py-1 text-xs font-semibold text-accent-500">
              <Zap className="h-3.5 w-3.5" /> Optional Add-ons
            </div>
            <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-[var(--text)] sm:text-3xl">
              Need just one more feature?
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-soft">
              Add-ons let you extend your current plan without a full upgrade.
            </p>
          </div>

          <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">
            {pricingConfig.addons.map(addon => (
              <div key={addon.id} className="card flex animate-fade-up flex-col p-6 transition-all duration-300 hover:border-accent-500/40">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-lg font-bold text-[var(--text)]">{addon.name}</h3>
                  <div className="shrink-0 text-right">
                    <div className="font-display text-2xl font-extrabold text-[var(--text)]">{fmtINR(addon.priceMonthly)}</div>
                    <div className="text-[10px] font-mono uppercase tracking-wide text-soft">/month</div>
                  </div>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-soft">{addon.description}</p>
                <ul className="mt-4 flex-1 space-y-2">
                  {addon.features.map(f => (
                    <li key={f} className="flex items-start gap-2 text-xs leading-snug text-soft">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent-500" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 border-t border-[var(--border)] pt-3 text-[11px] italic text-soft">{addon.note}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Voice Bot vs Calling Agent ─── */}
        <section className="border-t border-[var(--border)] bg-[var(--bg-soft)]/40">
          <div className="section-pad mx-auto max-w-7xl py-14">
            <div className="mb-8 text-center">
              <h2 className="font-display text-2xl font-bold tracking-tight text-[var(--text)] sm:text-3xl">
                Voice Bot Assistant <span className="text-soft">vs</span> AI Calling Agent
              </h2>
              <p className="mx-auto mt-2 max-w-2xl text-sm text-soft">
                Two different products with separate usage counters, configuration, permissions and billing.
              </p>
            </div>

            <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
              {[
                { data: pricingConfig.voiceBot, icon: <PhoneIncoming className="h-6 w-6 text-brand-400" /> },
                { data: pricingConfig.callingAgent, icon: <PhoneOutgoing className="h-6 w-6 text-accent-500" /> },
              ].map(({ data, icon }) => (
                <div key={data.name} className="card animate-fade-up p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-500/10 ring-1 ring-brand-500/25">
                      {icon}
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold text-[var(--text)]">{data.name}</h3>
                      <span className="chip mt-1 !py-0.5 !text-[10px] !font-bold uppercase tracking-wider !text-brand-400">
                        {data.direction}
                      </span>
                    </div>
                  </div>
                  <p className="mt-4 text-xs leading-relaxed text-soft">{data.purpose}</p>
                  <ul className="mt-3 space-y-1.5">
                    {data.steps.map((s, si) => (
                      <li key={s} className="flex items-center gap-2.5 text-xs text-soft">
                        <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-500/10 font-mono text-[10px] font-bold text-brand-400">
                          {si + 1}
                        </span>
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── FAQ ─── */}
        <section className="section-pad mx-auto max-w-3xl py-14">
          <div className="mb-8 text-center">
            <h2 className="font-display text-2xl font-bold tracking-tight text-[var(--text)] sm:text-3xl">
              Pricing FAQ
            </h2>
            <p className="mt-2 text-sm text-soft">Straight answers about allowances, add-ons and billing.</p>
          </div>

          <div className="space-y-3">
            {pricingConfig.faq.map((item, i) => {
              const open = openFaq === i;
              return (
                <div key={item.question} className={`card overflow-hidden transition-colors ${open ? 'border-brand-500/40' : ''}`}>
                  <button
                    onClick={() => setOpenFaq(open ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                    aria-expanded={open}
                  >
                    <span className={`text-sm font-semibold ${open ? 'text-brand-400' : 'text-[var(--text)]'}`}>
                      {item.question}
                    </span>
                    <ChevronDown className={`h-4 w-4 shrink-0 text-soft transition-transform duration-300 ${open ? 'rotate-180 text-brand-500' : ''}`} />
                  </button>
                  {open && (
                    <p className="animate-fade-in border-t border-[var(--border)] px-5 py-4 text-sm leading-relaxed text-soft">
                      {item.answer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ─── Bottom CTA ─── */}
        <section className="section-pad pb-24">
          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-brand-500/30 bg-gradient-to-br from-brand-950/30 via-[var(--card)] to-accent-500/10 p-8 text-center shadow-2xl sm:p-12">
            <div className="pointer-events-none absolute inset-0 grid-bg opacity-20" />
            <h2 className="relative font-display text-2xl font-bold tracking-tight text-[var(--text)] sm:text-3xl">
              Not sure which plan fits your business?
            </h2>
            <p className="relative mx-auto mt-3 max-w-xl text-sm leading-relaxed text-soft">
              Tell us about your team size and messaging volume — we'll recommend the right plan and allowances.
            </p>
            <button onClick={goContact} className="btn-primary relative mt-6">
              Talk to Us <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
