import { useState } from 'react';
import { Award, Briefcase, Calendar, Cloud, Code2, Download, GraduationCap, MapPin, Sparkles, Zap, Loader2 } from 'lucide-react';
import { useReveal } from '../hooks';
import { useSiteMedia } from '../lib/mediaConfig';
import { downloadFileFromUrl } from '../lib/downloadHelper';

const timeline = [
  {
    period: 'May 2025 — Present',
    role: 'Software Development Engineer (Full Stack & AI)',
    company: 'Mobiloitte Technologies',
    location: 'New Delhi, India',
    geoRegion: 'IN-DL',
    highlights: [
      {
        text: 'Engineered and deployed cross-platform conversational AI bots across 5 channels (WhatsApp, Telegram, Instagram, Slack, Web Chat) using FastAPI and Hybrid RAG, achieving 90%+ retrieval accuracy and reducing query latency by 30%.',
        badge: '90%+ Accuracy · 30% Lower Latency',
      },
      {
        text: 'Built an enterprise Omnichannel Live Agent Handoff Product across 4 messaging platforms with full text and rich media support (images, audio, PDFs, video), cutting average customer ticket resolution time by 25%.',
        badge: 'Omnichannel Rich Media · 25% Faster Resolution',
      },
      {
        text: 'Integrated an automated Slack Bot Lead & Ticketing Engine parsing incoming queries and dispatching real-time ticket assignments with < 3s notification latency, boosting lead response rate by 35%.',
        badge: '< 3s Latency · +35% Lead Conversion',
      },
      {
        text: 'Architected real-time AI Voice Calling Agents and IVR Systems integrating Deepgram (STT) and ElevenLabs (TTS) over WebSockets, delivering natural human-toned voice interactions with < 600ms turnaround and 95%+ call completion rate.',
        badge: '< 600ms Voice Turnaround · 95%+ Completion',
      },
      {
        text: 'Engineered automated outbound calling and broadcast campaign engines handling 10k+ automated interactions with automated scheduling, intent detection, and dynamic conversation branching.',
        badge: '10k+ Broadcast Volume · Intent Routing',
      },
      {
        text: 'Implemented Meta WhatsApp Cloud API and Meta Embedded Signup workflows, automating WABA onboarding for 10+ enterprise client accounts and processing webhook event payloads reliably.',
        badge: 'Meta Embedded Signup · 10+ WABA Accounts',
      },
      {
        text: 'Designed tenant-isolated data architectures across PostgreSQL, MongoDB, and Redis distributed caching, containerizing microservices via Docker to support 15k+ daily requests with 99.5% uptime.',
        badge: '15k+ Daily Req · 99.5% Uptime',
      },
    ],
    icon: Briefcase,
  },
  {
    period: 'Aug 2024 — Apr 2025',
    role: 'Full Stack Developer Intern',
    company: 'QSpiders',
    location: 'Noida, India',
    geoRegion: 'IN-UP',
    highlights: [
      {
        text: 'Developed 8+ backend RESTful APIs using Java and Spring Boot, implementing layered MVC architecture, data validation, and exception handling, reducing API response times by 20%.',
        badge: 'Java Spring Boot · 20% Faster APIs',
      },
      {
        text: 'Designed and optimized normalized relational database schemas across 12+ tables in MySQL, improving complex join query execution speed by 25% through strategic indexing.',
        badge: 'MySQL Indexing · 25% Query Speedup',
      },
      {
        text: 'Built 8+ reusable UI components and client interfaces using React and Vite, integrating backend REST APIs for asynchronous data retrieval with < 2s page load times.',
        badge: 'React & Vite · < 2s Page Load',
      },
      {
        text: 'Authored 30+ unit and integration test cases in JUnit and automated Postman test suites, achieving 80%+ test coverage and minimizing regression defects.',
        badge: 'JUnit & Postman · 80%+ Test Coverage',
      },
    ],
    icon: Code2,
  },
];

export default function Resume() {
  const ref = useReveal<HTMLDivElement>();
  const { resumeDownloadUrl, resumeFileName } = useSiteMedia();
  const [downloading, setDownloading] = useState(false);

  const handleDownload = () => {
    downloadFileFromUrl(
      resumeDownloadUrl,
      resumeFileName || 'Himanshu_Bharti_Resume.pdf',
      setDownloading
    );
  };

  return (
    <section
      id="resume"
      className="section-pad relative py-24 sm:py-28"
      aria-label="Interactive Resume — Himanshu Bharti Work Experience and Education (New Delhi & Noida, India)"
      itemScope
      itemType="https://schema.org/Person"
    >
      <meta itemProp="name" content="Himanshu Bharti" />
      <meta itemProp="jobTitle" content="Software Development Engineer (Full Stack & AI)" />
      <meta itemProp="address" content="New Delhi, India" />

      <div ref={ref} className="reveal mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-brand-500">09 — Resume & Experience</p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Professional experience & resume
            </h2>
            <p className="mt-2 text-sm text-soft">
              Track record of building enterprise AI CRM/ERP systems, Meta Cloud APIs, real-time Voice AI, and high-throughput microservices in India.
            </p>
          </div>
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="btn-primary disabled:opacity-70"
            title="Download Himanshu Bharti Resume PDF"
          >
            {downloading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Preparing PDF…
              </>
            ) : (
              <>
                <Download className="h-4 w-4" /> Download PDF
              </>
            )}
          </button>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {/* timeline */}
          <div className="lg:col-span-2">
            <div className="relative space-y-8 border-l border-soft pl-6">
              {timeline.map((t) => (
                <div
                  key={t.company}
                  className="relative"
                  itemScope
                  itemProp="hasOccupation"
                  itemType="https://schema.org/Role"
                >
                  <span className="absolute -left-[31px] grid h-6 w-6 place-items-center rounded-full border border-soft bg-soft">
                    <t.icon className="h-3 w-3 text-brand-500" />
                  </span>
                  <div className="card p-6 transition-all duration-300 hover:border-brand-500/30 shadow-sm">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="font-display text-lg font-bold text-[var(--text)]" itemProp="roleName">
                        {t.role}
                      </h3>
                      <span className="flex items-center gap-1.5 text-xs text-soft font-mono">
                        <Calendar className="h-3.5 w-3.5" /> {t.period}
                      </span>
                    </div>

                    <div
                      className="mt-1 flex flex-wrap items-center gap-2 text-sm font-semibold text-brand-500"
                      itemScope
                      itemProp="organization"
                      itemType="https://schema.org/Organization"
                    >
                      <span itemProp="name">{t.company}</span>
                      <span className="text-soft font-normal">·</span>
                      <span className="flex items-center gap-1 text-xs font-medium text-soft" itemProp="address">
                        <MapPin className="h-3 w-3 text-brand-500" /> {t.location}
                      </span>
                    </div>

                    <ul className="mt-4 space-y-3">
                      {t.highlights.map((h, idx) => (
                        <li key={idx} className="flex flex-col gap-1.5 sm:flex-row sm:items-start sm:justify-between text-sm leading-relaxed text-soft">
                          <div className="flex items-start gap-2.5">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                            <span>{h.text}</span>
                          </div>
                          {h.badge && (
                            <span className="chip !text-[10px] shrink-0 border-brand-500/20 bg-brand-500/5 text-brand-400 font-mono self-start sm:self-auto">
                              <Zap className="h-2.5 w-2.5 inline mr-1 text-brand-400" />
                              {h.badge}
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* sidebar */}
          <div className="space-y-4">
            {/* Education */}
            <div className="card p-5">
              <h3 className="flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-wide">
                <GraduationCap className="h-4 w-4 text-brand-500" /> Education
              </h3>

              <div className="mt-4 space-y-4">
                {/* Degree 1: B.Tech */}
                <div className="border-l-2 border-brand-500/40 pl-3">
                  <p className="text-xs font-bold text-brand-500">B.Tech – Electronics & Communication</p>
                  <p className="text-xs font-medium text-[var(--text)]">Bihar Engineering University</p>
                  <div className="mt-1 flex items-center justify-between text-[11px] text-soft font-mono">
                    <span>CGPA: 7.8 / 10</span>
                    <span>2020 – 2024</span>
                  </div>
                </div>

                {/* Degree 2: Class XII */}
                <div className="border-l-2 border-soft pl-3">
                  <p className="text-xs font-semibold text-[var(--text)]">Class XII – Science (PCM)</p>
                  <p className="text-xs text-soft">R.M. College (BSEB) · Saharsa, Bihar</p>
                  <div className="mt-1 flex items-center justify-between text-[11px] text-soft font-mono">
                    <span>Percentage: 68%</span>
                    <span>2018 – 2020</span>
                  </div>
                </div>

                {/* Degree 3: Class X */}
                <div className="border-l-2 border-soft pl-3">
                  <p className="text-xs font-semibold text-[var(--text)]">Class X (Secondary School)</p>
                  <p className="text-xs text-soft">St. Xavier’s School · Saharsa, Bihar</p>
                  <div className="mt-1 flex items-center justify-between text-[11px] text-soft font-mono">
                    <span>CGPA: 9.4 / 10</span>
                    <span>2018</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 border-t border-[var(--border)] pt-2.5 text-xs text-soft flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-brand-500 shrink-0" />
                <span>New Delhi, India · Available Worldwide</span>
              </div>
            </div>

            {/* Certifications Card */}
            <div className="card p-5">
              <h3 className="flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-wide">
                <Award className="h-4 w-4 text-warn-500" /> Certifications
              </h3>
              <div className="mt-3 space-y-2.5 text-xs text-soft">
                <div className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-warn-400 mt-1.5 shrink-0" />
                  <div>
                    <p className="font-medium text-[var(--text)]">Salesforce Trailhead Superbadges</p>
                    <p className="text-[11px] text-soft">Apex Specialist & Process Automation (2024)</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-500 mt-1.5 shrink-0" />
                  <div>
                    <p className="font-medium text-[var(--text)]">Cisco CyberOps Associate</p>
                    <p className="text-[11px] text-soft">Cisco Networking Academy (2024)</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent-400 mt-1.5 shrink-0" />
                  <div>
                    <p className="font-medium text-[var(--text)]">Cisco CCNA: Intro to Networks</p>
                    <p className="text-[11px] text-soft">CCNAv7 · Cisco Academy (2023)</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card p-5">
              <h3 className="flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-wide">
                <Sparkles className="h-4 w-4 text-brand-500" /> AI & GenAI Systems
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {['Hybrid RAG', 'Deepgram STT', 'ElevenLabs TTS', 'Voice IVR', 'LangChain', 'LangGraph', 'FAISS', 'Pinecone', 'Cross-Encoders'].map((c) => (
                  <span key={c} className="chip">{c}</span>
                ))}
              </div>
            </div>

            <div className="card p-5">
              <h3 className="flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-wide">
                <Cloud className="h-4 w-4 text-brand-500" /> Meta APIs & Enterprise Tech
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {['WhatsApp Cloud API', 'Meta Embedded Signup', 'WABA Management', 'Instagram Graph API', 'Slack Bot Webhooks', 'Docker', 'Redis Caching', 'PostgreSQL', 'MongoDB'].map((c) => (
                  <span key={c} className="chip">{c}</span>
                ))}
              </div>
            </div>

            <div className="card p-5">
              <h3 className="flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-wide">
                <Code2 className="h-4 w-4 text-brand-500" /> Full Stack & Distributed Systems
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {['FastAPI', 'Java Spring Boot', 'MySQL Indexing', 'WebSockets', 'React & Vite', 'JUnit & Postman', 'RESTful APIs', 'JWT RBAC'].map((c) => (
                  <span key={c} className="chip">{c}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
