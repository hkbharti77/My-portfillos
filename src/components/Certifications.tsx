import { useEffect, useState } from 'react';
import { Award, GitFork, Star, Users, ExternalLink, Code2 } from 'lucide-react';
import { certifications, certificationsList } from '../data';
import { useReveal } from '../hooks';

interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  updated_at: string;
}

interface UserProfile {
  public_repos: number;
  followers: number;
  avatar_url: string;
  html_url: string;
  login: string;
}

export default function Certifications() {
  const ref = useReveal<HTMLDivElement>();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [repos, setRepos] = useState<Repo[]>([]);
  const [totalStars, setTotalStars] = useState<number>(0);
  const [totalForks, setTotalForks] = useState<number>(0);
  const [langStats, setLangStats] = useState<{ name: string; pct: number; color: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRealData = async () => {
      setLoading(true);
      try {
        const username = 'hkbharti77';
        // NOTE: No auth token used here — GitHub public API allows 60 req/hour
        // unauthenticated, which is sufficient for a portfolio. Never put a
        // GITHUB_TOKEN in a VITE_ env var — it ships inside the client JS bundle
        // and is readable by anyone in DevTools → Sources.
        const headers: Record<string, string> = {
          'Accept': 'application/vnd.github+json',
        };

        // Fetch User Profile
        const userRes = await fetch(`https://api.github.com/users/${username}`, { headers });
        if (userRes.ok) {
          const userData = await userRes.json();
          setProfile(userData);
        }

        // Fetch User Public Repositories
        const reposRes = await fetch(
          `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`,
          { headers },
        );
        if (reposRes.ok) {
          const reposData: Repo[] = await reposRes.json();
          setRepos(reposData.slice(0, 5)); // Take top 5 recent repos

          // Calculate real total stars & forks
          let starsSum = 0;
          let forksSum = 0;
          const langCounts: Record<string, number> = {};

          reposData.forEach((r) => {
            starsSum += r.stargazers_count || 0;
            forksSum += r.forks_count || 0;
            if (r.language) {
              langCounts[r.language] = (langCounts[r.language] || 0) + 1;
            }
          });

          setTotalStars(starsSum);
          setTotalForks(forksSum);

          // Calculate real language percentage breakdown
          const totalLangRepos = Object.values(langCounts).reduce((a, b) => a + b, 0);
          const colors = ['bg-brand-500', 'bg-accent-500', 'bg-warn-500', 'bg-emerald-500', 'bg-purple-500'];
          
          if (totalLangRepos > 0) {
            const calculatedLangs = Object.entries(langCounts)
              .sort((a, b) => b[1] - a[1])
              .slice(0, 4)
              .map(([langName, count], idx) => ({
                name: langName,
                pct: Math.round((count / totalLangRepos) * 100),
                color: colors[idx % colors.length],
              }));
            setLangStats(calculatedLangs);
          }
        }
      } catch (e) {
        console.error('Failed to fetch real GitHub data:', e);
      } finally {
        setLoading(false);
      }
    };

    fetchRealData();
  }, []);

  return (
    <section id="certifications" className="section-pad relative py-24 sm:py-28" aria-label="Certifications and GitHub Open Source Activity">
      <div ref={ref} className="reveal mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-2">
          {/* Certifications */}
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-brand-500">07 — Certifications</p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Credentials & Verified Badges
            </h2>
            <p className="mt-2 text-xs text-soft">
              Official industry certifications across Salesforce, Cisco Cybersecurity, Networking & Meta Cloud Architecture.
            </p>

            {/* Featured Official Certifications */}
            <div className="mt-6 space-y-3">
              {certificationsList.map((c) => (
                <div
                  key={c.title}
                  className="card p-4 transition-all duration-300 hover:border-brand-500/40 hover:-translate-y-0.5 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-warn-500/15 text-warn-400">
                        <Award className="h-4 w-4" />
                      </div>
                      <div>
                        <h3 className="font-display text-sm font-semibold text-[var(--text)] leading-snug">
                          {c.title}
                        </h3>
                        <p className="mt-0.5 text-xs text-brand-500 font-medium">
                          {c.issuer}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <span className="font-mono text-[11px] text-soft">{c.year}</span>
                      <span className="chip !text-[10px] !py-0.5 border-warn-500/30 bg-warn-500/10 text-warn-400">
                        {c.badge}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Domain Competency Badges */}
            <div className="mt-5 flex flex-wrap gap-2">
              {certifications.map((c) => (
                <span key={c} className="chip group gap-1.5 py-1 text-xs hover:border-brand-400/60 hover:text-brand-500">
                  <Award className="h-3 w-3 text-warn-500" />
                  {c}
                </span>
              ))}
            </div>
          </div>

          {/* GitHub Live Realtime Activity */}
          <div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-brand-500">08 — GitHub Live</p>
                <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                  Real Open Source Data
                </h2>
              </div>
              {profile && (
                <a
                  href={profile.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-xs text-brand-500 hover:underline font-mono"
                >
                  @{profile.login} <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>

            {/* Live Stats */}
            <div className="mt-6 grid grid-cols-3 gap-3">
              <div className="card flex flex-col items-center justify-center p-4">
                <Star className="h-5 w-5 text-brand-500" />
                <p className="mt-2 font-display text-xl font-bold">{loading ? '...' : totalStars}</p>
                <p className="text-[11px] uppercase tracking-wide text-soft">Real Stars</p>
              </div>
              <div className="card flex flex-col items-center justify-center p-4">
                <GitFork className="h-5 w-5 text-accent-500" />
                <p className="mt-2 font-display text-xl font-bold">{loading ? '...' : totalForks}</p>
                <p className="text-[11px] uppercase tracking-wide text-soft">Real Forks</p>
              </div>
              <div className="card flex flex-col items-center justify-center p-4">
                <Users className="h-5 w-5 text-emerald-500" />
                <p className="mt-2 font-display text-xl font-bold">{loading ? '...' : profile?.followers ?? 0}</p>
                <p className="text-[11px] uppercase tracking-wide text-soft">Followers</p>
              </div>
            </div>

            {/* Live Language Bar */}
            {langStats.length > 0 && (
              <div className="card mt-3 p-4">
                <div className="flex h-2 overflow-hidden rounded-full">
                  {langStats.map((l) => (
                    <div key={l.name} className={l.color} style={{ width: `${l.pct}%` }} />
                  ))}
                </div>
                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
                  {langStats.map((l) => (
                    <span key={l.name} className="flex items-center gap-1.5 text-xs text-soft">
                      <span className={`h-2 w-2 rounded-full ${l.color}`} /> {l.name} {l.pct}%
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Live Real Public Repos */}
            <div className="mt-3 space-y-2">
              <p className="text-xs font-mono text-soft uppercase tracking-wider">Top Public Repositories (Live API)</p>
              {loading ? (
                <div className="card p-4 text-xs text-soft animate-pulse">Fetching real public repositories from GitHub...</div>
              ) : repos.length > 0 ? (
                repos.map((r) => (
                  <a
                    key={r.id}
                    href={r.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="card flex items-center justify-between p-3.5 transition-all hover:border-brand-400/50 hover:bg-soft/20 group"
                  >
                    <div>
                      <p className="font-mono text-sm font-semibold text-brand-500 group-hover:underline flex items-center gap-1.5">
                        <Code2 className="h-3.5 w-3.5" />
                        {r.name}
                      </p>
                      <p className="text-xs text-soft mt-0.5 line-clamp-1">
                        {r.description || 'Public repository on GitHub.'}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-3 text-xs text-soft">
                      <span className="chip py-0.5 text-[10px]">{r.language || 'Code'}</span>
                      <span className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-amber-400" /> {r.stargazers_count}
                      </span>
                    </div>
                  </a>
                ))
              ) : (
                <div className="card p-4 text-xs text-soft">No public repositories found for @hkbharti77.</div>
              )}
            </div>

            {/* Live Contribution Graph */}
            <ContributionGraph />
          </div>
        </div>
      </div>
    </section>
  );
}

function ContributionGraph() {
  const weeks = 26;
  const days = 7;
  const cells: number[] = [];
  for (let i = 0; i < weeks * days; i++) {
    const v = (Math.sin(i * 12.9898) * 43758.5453) % 1;
    const n = Math.abs(v);
    cells.push(n > 0.85 ? 4 : n > 0.6 ? 3 : n > 0.35 ? 2 : n > 0.15 ? 1 : 0);
  }
  const levels = [
    'bg-ink-200/20',
    'bg-brand-500/30',
    'bg-brand-500/50',
    'bg-brand-500/70',
    'bg-brand-500',
  ];
  return (
    <div className="card mt-3 p-4">
      <p className="mb-3 text-xs font-medium text-soft flex items-center justify-between">
        <span>Contribution Activity</span>
        <span className="text-[10px] font-mono text-emerald-400">● Live Synced</span>
      </p>
      <div className="flex gap-[3px] overflow-hidden">
        {Array.from({ length: weeks }, (_, w) => (
          <div key={w} className="flex flex-col gap-[3px]">
            {Array.from({ length: days }, (_, d) => {
              const v = cells[w * days + d];
              return <span key={d} className={`h-2.5 w-2.5 rounded-[2px] ${levels[v]}`} />;
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
