import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchPublicBlogs } from '../services/blogApi';
import { ArrowUpRight, Clock, Loader2, FileText } from 'lucide-react';
import { useReveal } from '../hooks';
import type { FirestoreBlog } from '../lib/blogTypes';
import { getOptimizedImageUrl } from '../lib/cloudinary';
import MaskedImage from './MaskedImage';

export default function Blogs() {
  const ref = useReveal<HTMLDivElement>();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<FirestoreBlog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetchPublicBlogs({ channel: 'portfolio', limit: 6 });
        if (cancelled) return;
        setPosts(res.posts);
      } catch (err) {
        console.error('Blogs fetch error:', err);
        if (!cancelled) setPosts([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  const recentPosts = posts.slice(0, 4);

  return (
    <section id="blogs" className="section-pad relative py-24 sm:py-28" aria-label="Technical Blog Posts — AI, RAG, Backend and Meta API articles">
      <div ref={ref} className="reveal mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-brand-500">06 — Writing</p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Technical notes
            </h2>
            <p className="mt-3 max-w-xl text-sm text-soft">
              Deep dives on RAG, vector search, agent architecture, and backend performance.
            </p>
          </div>
          {posts.length > 0 && (
            <button
              onClick={() => navigate('/blogs')}
              className="btn-ghost text-xs self-start sm:self-auto group"
            >
              View all articles ({posts.length}) <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          )}
        </div>

        {loading ? (
          <div className="mt-12 flex items-center justify-center py-12">
            <Loader2 className="h-6 w-6 animate-spin text-brand-500" />
          </div>
        ) : posts.length === 0 ? (
          <div className="mt-12 flex items-center justify-center py-16">
            <p className="text-sm text-soft">No posts published yet. Check back soon.</p>
          </div>
        ) : (
          <>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {recentPosts.map((b, i) => {
                const coverThumb = b.coverImage
                  ? getOptimizedImageUrl(b.coverImage, { width: 600, height: 340, crop: 'fill', quality: 'auto' })
                  : '';

                return (
                  <button
                    key={b.id}
                    onClick={() => navigate(`/blog/${b.slug}`)}
                    className="card group flex flex-col overflow-hidden text-left transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-400/40 hover:shadow-xl hover:shadow-brand-500/5"
                    style={{ animationDelay: `${i * 40}ms` }}
                  >
                    {/* Card Media Thumbnail */}
                    {coverThumb ? (
                      <div className="relative h-44 w-full overflow-hidden bg-[var(--bg-soft)] border-b border-[var(--border)]">
                        <MaskedImage
                          src={coverThumb}
                          alt={b.coverImageAlt || b.title}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute left-3 top-3">
                          <span className="chip !bg-black/60 !text-brand-300 backdrop-blur-md border-white/10">
                            {b.tag}
                          </span>
                        </div>
                        {b.pdfUrl && (
                          <div className="absolute right-3 top-3">
                            <span className="flex items-center gap-1 rounded-full bg-brand-500/80 px-2 py-0.5 text-[10px] font-semibold text-white backdrop-blur-md">
                              <FileText className="h-3 w-3" /> PDF
                            </span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="p-5 pb-0 flex items-center justify-between">
                        <span className="chip text-brand-500">{b.tag}</span>
                        {b.pdfUrl && (
                          <span className="flex items-center gap-1 text-[10px] font-medium text-brand-400">
                            <FileText className="h-3 w-3" /> PDF
                          </span>
                        )}
                      </div>
                    )}

                    <div className="flex flex-1 flex-col p-5">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-display text-base font-semibold leading-snug text-[var(--text)] group-hover:text-brand-500 transition-colors">
                          {b.title}
                        </h3>
                        {!coverThumb && (
                          <ArrowUpRight className="h-4 w-4 shrink-0 text-soft transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-500" />
                        )}
                      </div>

                      <p className="mt-2 flex-1 text-xs leading-relaxed text-soft line-clamp-3">
                        {b.excerpt}
                      </p>

                      <div className="mt-4 flex items-center justify-between border-t border-[var(--border)] pt-3 text-[11px] text-soft">
                        <span className="flex items-center gap-1.5">
                          <Clock className="h-3 w-3" /> {b.readTime} read
                        </span>
                        {coverThumb && (
                          <span className="flex items-center gap-1 text-brand-500 font-medium group-hover:translate-x-0.5 transition-transform">
                            Read <ArrowUpRight className="h-3 w-3" />
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {posts.length > 4 && (
              <div className="mt-10 text-center">
                <button
                  onClick={() => navigate('/blogs')}
                  className="btn-primary text-xs font-medium"
                >
                  View all {posts.length} articles →
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
