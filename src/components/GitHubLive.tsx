import { useEffect, useState } from 'react';
import { Github, Star, GitFork, ExternalLink, Activity, Code2, RefreshCw } from 'lucide-react';
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

export default function GitHubLive() {
  const ref = useReveal<HTMLDivElement>();
  const [username, setUsername] = useState('hkbharti77');
  const [repos, setRepos] = useState<Repo[]>([]);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchGitHubData = async (user: string) => {
    setLoading(true);
    setError('');
    try {
      const headers: Record<string, string> = {};
      const token = import.meta.env.VITE_GITHUB_TOKEN;
      if (token) {
        headers['Authorization'] = `token ${token}`;
      }

      // Fetch user profile
      const userRes = await fetch(`https://api.github.com/users/${user}`, { headers });
      if (!userRes.ok) {
        throw new Error('GitHub profile not found or API rate limit reached');
      }
      const userData = await userRes.json();
      setProfile(userData);

      // Fetch public repos sorted by updated date
      const reposRes = await fetch(`https://api.github.com/users/${user}/repos?sort=updated&per_page=6`, { headers });
      if (reposRes.ok) {
        const reposData = await reposRes.json();
        setRepos(reposData);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch GitHub profile');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGitHubData(username);
  }, []);

  return (
    <section id="github" className="section-pad relative py-24 sm:py-28 bg-soft/10">
      <div ref={ref} className="reveal mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-brand-500">06 — Realtime Activity</p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Live GitHub Integration
            </h2>
            <p className="mt-2 text-sm text-soft">
              Realtime feed of public repositories, code contributions, and live stars via the GitHub REST API.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter GitHub handle..."
              className="rounded-lg border border-soft bg-soft/50 px-3 py-1.5 text-xs font-mono text-foreground focus:border-brand-500 focus:outline-none"
            />
            <button
              onClick={() => fetchGitHubData(username)}
              className="btn-primary py-1.5 text-xs"
              title="Sync Live GitHub Stats"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} /> Sync Live
            </button>
          </div>
        </div>

        {error && (
          <div className="mt-6 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-xs text-red-400">
            {error}. Verify the GitHub username or API rate limits.
          </div>
        )}

        {/* Profile Header Card */}
        {profile && (
          <div className="mt-8 card p-6 flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <img
                src={profile.avatar_url}
                alt={profile.login}
                className="h-14 w-14 rounded-full border-2 border-brand-500/50"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-display text-lg font-semibold">@{profile.login}</h3>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-medium text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live Status
                  </span>
                </div>
                <p className="text-xs text-soft mt-0.5">Real-time public profile & repositories</p>
              </div>
            </div>

            <div className="flex items-center gap-6 text-sm">
              <div className="text-center">
                <p className="font-display text-xl font-bold text-brand-500">{profile.public_repos}</p>
                <p className="text-xs text-soft uppercase tracking-wider">Public Repos</p>
              </div>
              <div className="text-center">
                <p className="font-display text-xl font-bold text-accent-500">{profile.followers}</p>
                <p className="text-xs text-soft uppercase tracking-wider">Followers</p>
              </div>
              <a
                href={profile.html_url}
                target="_blank"
                rel="noreferrer"
                className="btn-primary text-xs flex items-center gap-1.5"
              >
                <Github className="h-4 w-4" /> View GitHub Profile
              </a>
            </div>
          </div>
        )}

        {/* Public Repos Grid */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="card p-5 animate-pulse space-y-3">
                <div className="h-4 w-3/4 rounded bg-soft/50" />
                <div className="h-3 w-full rounded bg-soft/30" />
                <div className="h-3 w-1/2 rounded bg-soft/30" />
              </div>
            ))
          ) : repos.length > 0 ? (
            repos.map((repo) => (
              <div
                key={repo.id}
                className="card group p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-brand-400/50"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-display text-base font-semibold text-foreground group-hover:text-brand-500 transition-colors flex items-center gap-1.5">
                      <Code2 className="h-4 w-4 text-brand-500 shrink-0" />
                      <span className="truncate">{repo.name}</span>
                    </h4>
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-soft hover:text-brand-500"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>

                  <p className="mt-2 text-xs text-soft line-clamp-2">
                    {repo.description || 'Public repository with live code updates and implementations.'}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-soft/50 flex items-center justify-between text-xs text-soft">
                  <span className="chip text-[11px] font-mono">{repo.language || 'Code'}</span>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 hover:text-amber-400">
                      <Star className="h-3 w-3 text-amber-400" /> {repo.stargazers_count}
                    </span>
                    <span className="flex items-center gap-1 hover:text-brand-400">
                      <GitFork className="h-3 w-3 text-brand-400" /> {repo.forks_count}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-8 text-xs text-soft">
              No public repositories found for @{username}.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
