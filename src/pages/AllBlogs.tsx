import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchPublicBlogs } from '../services/blogApi';
import {
  Clock, FileText, Search, X,
  ArrowUpRight, BookOpen, Sparkles, Calendar, User, ChevronRight
} from 'lucide-react';
import type { FirestoreBlog } from '../lib/blogTypes';
import { getOptimizedImageUrl } from '../lib/cloudinary';
import MaskedImage from '../components/MaskedImage';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CommandPalette from '../components/CommandPalette';

export default function AllBlogs() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<FirestoreBlog[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [paletteOpen, setPaletteOpen] = useState(false);

  const handleNavigate = (id: string) => {
    if (id === 'home') {
      navigate('/');
    } else if (id === 'blogs') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate(`/#${id}`);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = 'Technical Blog & Engineering Notes — Himanshu Bharti';
    let cancelled = false;
    async function load() {
      try {
        const res = await fetchPublicBlogs({ channel: 'portfolio' });
        if (cancelled) return;
        setPosts(res.posts);
      } catch (err) {
        console.error('AllBlogs fetch error:', err);
        if (!cancelled) setPosts([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    posts.forEach(p => { if (p.tag) tags.add(p.tag); });
    return Array.from(tags).sort();
  }, [posts]);

  const filtered = useMemo(() => {
    let result = posts;
    if (activeTag) result = result.filter(p => p.tag === activeTag);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        p =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt?.toLowerCase().includes(q) ||
          p.tag?.toLowerCase().includes(q)
      );
    }
    return result;
  }, [posts, activeTag, search]);

  const isFiltering = search.trim() !== '' || activeTag !== null;
  const featuredPost = !isFiltering && filtered.length > 0 ? filtered[0] : null;
  const remainingPosts = !isFiltering && filtered.length > 0 ? filtered.slice(1) : filtered;

  return (
    <div className="min-h-screen bg-[var(--bg)] flex flex-col justify-between selection:bg-brand-500/30">
      <Navbar active="blogs" onNavigate={handleNavigate} onOpenPalette={() => setPaletteOpen(true)} />
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} onNavigate={handleNavigate} />

      <main className="flex-1 pt-20">
        {/* ─── Hero Section ─── */}
        <div className="relative overflow-hidden border-b border-[var(--border)] bg-gradient-to-b from-brand-950/20 via-transparent to-transparent py-16 sm:py-24">
          <div className="pointer-events-none absolute inset-0 grid-bg opacity-30" />
          <div
            className="pointer-events-none absolute -top-44 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full opacity-25 blur-[120px]"
            style={{ background: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)' }}
          />

          <div className="section-pad relative mx-auto max-w-7xl">
            {/* Breadcrumb Nav */}
            <div className="mb-6 flex items-center gap-2 text-xs font-mono text-soft">
              <button
                onClick={() => navigate('/')}
                className="transition-colors hover:text-brand-400"
              >
                Portfolio
              </button>
              <ChevronRight className="h-3 w-3 opacity-40" />
              <span className="text-brand-500 font-semibold">Technical Blog</span>
            </div>

            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-3.5 py-1 text-xs font-semibold text-brand-400 backdrop-blur-md">
                  <Sparkles className="h-3.5 w-3.5 text-brand-400" />
                  <span>Engineering &amp; Architecture Insights</span>
                </div>
                <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-[var(--text)] sm:text-5xl lg:text-6xl">
                  Technical <span className="gradient-text">Notes</span> &amp; Guides
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-soft sm:text-lg">
                  Deep dives on RAG systems, vector databases, autonomous agent architecture, Meta Cloud WhatsApp APIs, and high-performance backend engineering.
                </p>
              </div>

              {!loading && (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 rounded-2xl border border-[var(--border)] bg-[var(--card)]/80 px-5 py-3 shadow-lg backdrop-blur-md">
                    <BookOpen className="h-5 w-5 text-brand-500" />
                    <div>
                      <div className="font-display text-lg font-bold text-[var(--text)]">{posts.length}</div>
                      <div className="text-[11px] font-mono text-soft uppercase tracking-wider">Published Articles</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* ─── Search & Tag Filter Bar ─── */}
            <div className="mt-10 flex flex-col gap-4 rounded-2xl border border-[var(--border)] bg-[var(--card)]/60 p-4 backdrop-blur-xl shadow-xl lg:flex-row lg:items-center lg:justify-between">
              {/* Search Box */}
              <div className="relative flex-1 max-w-md">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-soft" />
                <input
                  type="text"
                  placeholder="Search by topic, keyword, or title..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg-soft)] py-2.5 pl-10 pr-10 text-sm text-[var(--text)] outline-none transition focus:border-brand-500/60 focus:ring-2 focus:ring-brand-500/20"
                />
                {search && (
                  <button
                    onClick={() => setSearch('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-soft hover:text-brand-500"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              {/* Tags */}
              {allTags.length > 0 && (
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs text-soft mr-1 hidden sm:inline">Filter:</span>
                  <button
                    onClick={() => setActiveTag(null)}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all duration-200 ${
                      activeTag === null
                        ? 'bg-brand-500 text-white shadow-md shadow-brand-500/30'
                        : 'border border-[var(--border)] bg-[var(--bg-soft)] text-soft hover:border-brand-500/40 hover:text-brand-400'
                    }`}
                  >
                    All Topics
                  </button>
                  {allTags.map(tag => (
                    <button
                      key={tag}
                      onClick={() => setActiveTag(tag === activeTag ? null : tag)}
                      className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all duration-200 ${
                        activeTag === tag
                          ? 'bg-brand-500 text-white shadow-md shadow-brand-500/30'
                          : 'border border-[var(--border)] bg-[var(--bg-soft)] text-soft hover:border-brand-500/40 hover:text-brand-400'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ─── Articles Content Area ─── */}
        <div className="section-pad mx-auto max-w-7xl py-12 pb-28">
          {loading ? (
            /* Skeleton Loading Grid */
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map(n => (
                <div key={n} className="card animate-pulse overflow-hidden">
                  <div className="h-48 bg-soft/20" />
                  <div className="p-6 space-y-3">
                    <div className="h-4 w-20 rounded bg-soft/30" />
                    <div className="h-6 w-3/4 rounded bg-soft/30" />
                    <div className="h-4 w-full rounded bg-soft/20" />
                    <div className="h-4 w-2/3 rounded bg-soft/20" />
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            /* Empty State */
            <div className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-[var(--border)] bg-[var(--card)]/40 py-24 text-center backdrop-blur-md">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-500/10 border border-brand-500/20 text-brand-500">
                <BookOpen className="h-8 w-8" />
              </div>
              <h3 className="font-display text-xl font-bold text-[var(--text)]">No Articles Found</h3>
              <p className="max-w-md text-sm text-soft">
                {search || activeTag
                  ? `No matching articles found for your criteria. Try searching for another topic.`
                  : `No technical articles published yet. Check back soon for new guides!`}
              </p>
              {(search || activeTag) && (
                <button
                  onClick={() => { setSearch(''); setActiveTag(null); }}
                  className="btn-ghost mt-2 !py-2 !px-5 !text-xs font-semibold"
                >
                  <X className="h-3.5 w-3.5" /> Reset Filters
                </button>
              )}
            </div>
          ) : (
            <>
              {/* Filter Indicator Bar */}
              {isFiltering && (
                <div className="mb-8 flex items-center justify-between border-b border-[var(--border)] pb-4">
                  <p className="text-xs text-soft font-mono">
                    Found <span className="text-brand-500 font-bold">{filtered.length}</span> article{filtered.length !== 1 ? 's' : ''}
                    {activeTag && <> in <span className="text-brand-400 font-semibold">#{activeTag}</span></>}
                    {search && <> matching &quot;<span className="text-brand-400 font-semibold">{search}</span>&quot;</>}
                  </p>
                  <button
                    onClick={() => { setSearch(''); setActiveTag(null); }}
                    className="text-xs text-brand-400 hover:underline font-mono flex items-center gap-1"
                  >
                    <X className="h-3 w-3" /> Clear filter
                  </button>
                </div>
              )}

              {/* ─── Featured Post Spotlight (When not filtering) ─── */}
              {featuredPost && (
                <div className="mb-14">
                  <div className="mb-4 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-brand-500 animate-ping" />
                    <span className="font-mono text-xs uppercase tracking-widest text-brand-500 font-semibold">Featured Publication</span>
                  </div>

                  <div
                    onClick={() => navigate(`/blog/${featuredPost.slug}`)}
                    className="group relative cursor-pointer overflow-hidden rounded-3xl border border-brand-500/30 bg-gradient-to-br from-[var(--card)] via-[var(--card)] to-brand-950/20 p-6 shadow-2xl transition-all duration-500 hover:border-brand-500/70 hover:shadow-brand-500/10 sm:p-8 lg:grid lg:grid-cols-12 lg:gap-8 lg:items-center"
                  >
                    {/* Media Thumbnail Column */}
                    <div className="relative h-64 sm:h-80 lg:h-full lg:min-h-[320px] lg:col-span-6 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-soft)]">
                      {featuredPost.coverImage ? (
                        <MaskedImage
                          src={getOptimizedImageUrl(featuredPost.coverImage, { width: 900, height: 500, crop: 'fill', quality: 'auto' })}
                          alt={featuredPost.coverImageAlt || featuredPost.title}
                          loading="eager"
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand-500/20 to-accent-500/20">
                          <BookOpen className="h-16 w-16 text-brand-400/60" />
                        </div>
                      )}
                      <div className="absolute left-4 top-4">
                        <span className="chip !bg-black/70 !text-brand-300 backdrop-blur-md border-white/10 text-xs font-semibold">
                          {featuredPost.tag}
                        </span>
                      </div>
                      {featuredPost.pdfUrl && (
                        <div className="absolute right-4 top-4">
                          <span className="flex items-center gap-1.5 rounded-full bg-brand-500 px-3 py-1 text-xs font-bold text-white shadow-lg backdrop-blur-md">
                            <FileText className="h-3.5 w-3.5" /> PDF Paper Included
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Article Details Column */}
                    <div className="mt-6 flex flex-col justify-between lg:mt-0 lg:col-span-6 lg:py-2">
                      <div>
                        <div className="flex items-center gap-4 text-xs text-soft font-mono">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5 text-brand-500" /> {featuredPost.date}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1.5">
                            <Clock className="h-3.5 w-3.5 text-brand-500" /> {featuredPost.readTime} read
                          </span>
                        </div>

                        <h2 className="mt-3 font-display text-2xl font-bold leading-snug text-[var(--text)] group-hover:text-brand-400 transition-colors sm:text-3xl lg:text-3xl">
                          {featuredPost.title}
                        </h2>

                        <p className="mt-3 text-sm leading-relaxed text-soft line-clamp-3">
                          {featuredPost.excerpt}
                        </p>
                      </div>

                      <div className="mt-6 flex items-center justify-between border-t border-[var(--border)] pt-4">
                        <span className="flex items-center gap-1.5 text-xs text-soft font-mono">
                          <User className="h-3.5 w-3.5 text-brand-500" /> Himanshu Bharti
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-400 group-hover:translate-x-1 transition-transform">
                          Read Article <ArrowUpRight className="h-4 w-4" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── Main Article Cards Grid ─── */}
              {remainingPosts.length > 0 && (
                <div>
                  {!isFiltering && (
                    <h3 className="mb-6 font-display text-xl font-bold tracking-tight text-[var(--text)]">
                      Latest Articles &amp; Technical Notes
                    </h3>
                  )}

                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {remainingPosts.map((b, i) => {
                      const coverThumb = b.coverImage
                        ? getOptimizedImageUrl(b.coverImage, { width: 600, height: 360, crop: 'fill', quality: 'auto' })
                        : '';

                      return (
                        <button
                          key={b.id}
                          onClick={() => navigate(`/blog/${b.slug}`)}
                          className="card group flex flex-col overflow-hidden text-left transition-all duration-300 hover:-translate-y-2 hover:border-brand-500/50 hover:shadow-2xl hover:shadow-brand-500/10"
                          style={{ animationDelay: `${i * 40}ms` }}
                        >
                          {/* Card Thumbnail */}
                          {coverThumb ? (
                            <div className="relative h-48 w-full overflow-hidden bg-[var(--bg-soft)] border-b border-[var(--border)]">
                              <MaskedImage
                                src={coverThumb}
                                alt={b.coverImageAlt || b.title}
                                loading="lazy"
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                              <div className="absolute left-3 top-3">
                                <span className="chip !bg-black/70 !text-brand-300 backdrop-blur-md border-white/10 text-[11px]">
                                  {b.tag}
                                </span>
                              </div>
                              {b.pdfUrl && (
                                <div className="absolute right-3 top-3">
                                  <span className="flex items-center gap-1 rounded-full bg-brand-500/90 px-2.5 py-0.5 text-[10px] font-semibold text-white backdrop-blur-md">
                                    <FileText className="h-3 w-3" /> PDF
                                  </span>
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="p-5 pb-0 flex items-center justify-between">
                              <span className="chip text-brand-500">{b.tag}</span>
                              {b.pdfUrl && (
                                <span className="flex items-center gap-1 text-[10px] font-semibold text-brand-400">
                                  <FileText className="h-3 w-3" /> PDF
                                </span>
                              )}
                            </div>
                          )}

                          {/* Card Content Body */}
                          <div className="flex flex-1 flex-col p-6">
                            <div className="flex items-start justify-between gap-2">
                              <h3 className="font-display text-lg font-bold leading-snug text-[var(--text)] group-hover:text-brand-400 transition-colors">
                                {b.title}
                              </h3>
                              {!coverThumb && (
                                <ArrowUpRight className="h-4 w-4 shrink-0 text-soft transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-500" />
                              )}
                            </div>

                            <p className="mt-2.5 flex-1 text-xs leading-relaxed text-soft line-clamp-3">
                              {b.excerpt}
                            </p>

                            <div className="mt-5 flex items-center justify-between border-t border-[var(--border)] pt-3 text-[11px] text-soft font-mono">
                              <span className="flex items-center gap-1.5">
                                <Clock className="h-3 w-3 text-brand-500" /> {b.readTime} read
                              </span>
                              <span className="flex items-center gap-1 text-brand-500 font-semibold group-hover:translate-x-0.5 transition-transform">
                                Read <ArrowUpRight className="h-3 w-3" />
                              </span>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
