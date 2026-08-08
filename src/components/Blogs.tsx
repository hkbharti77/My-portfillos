import { useEffect, useState } from 'react';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { db } from '../lib/firebase';
import { ArrowUpRight, Clock, Loader2 } from 'lucide-react';
import { useReveal } from '../hooks';
import type { FirestoreBlog } from '../lib/blogTypes';

export default function Blogs() {
  const ref = useReveal<HTMLDivElement>();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<FirestoreBlog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        let snap;
        try {
          // Composite query — needs Firestore index
          snap = await getDocs(query(
            collection(db, 'blogs'),
            where('published', '==', true),
            orderBy('createdAt', 'desc'),
          ));
        } catch {
          // Index not ready yet — fetch all and sort client-side
          snap = await getDocs(query(collection(db, 'blogs')));
        }
        if (cancelled) return;
        const all = snap.docs.map(d => ({ id: d.id, ...d.data() } as FirestoreBlog));
        setPosts(
          all
            .filter(p => p.published === true)
            .sort((a, b) => (b.createdAt?.seconds ?? 0) - (a.createdAt?.seconds ?? 0))
        );
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

  return (
    <section id="blogs" className="section-pad relative py-24 sm:py-28" aria-label="Technical Blog Posts — AI, RAG, Backend and Meta API articles">
      <div ref={ref} className="reveal mx-auto max-w-7xl">
        <p className="font-mono text-xs uppercase tracking-widest text-brand-500">06 — Writing</p>
        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Technical notes
        </h2>
        <p className="mt-3 max-w-xl text-sm text-soft">
          Deep dives on RAG, vector search, agent architecture, and backend performance.
        </p>

        {loading ? (
          <div className="mt-12 flex items-center justify-center py-12">
            <Loader2 className="h-6 w-6 animate-spin text-brand-500" />
          </div>
        ) : posts.length === 0 ? (
          <div className="mt-12 flex items-center justify-center py-16">
            <p className="text-sm text-soft">No posts published yet. Check back soon.</p>
          </div>
        ) : (
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {posts.map((b, i) => (
              <button
                key={b.id}
                onClick={() => navigate(`/blog/${b.slug}`)}
                className="card group flex flex-col p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-brand-400/40"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <div className="flex items-center justify-between">
                  <span className="chip text-brand-500">{b.tag}</span>
                  <ArrowUpRight className="h-4 w-4 text-soft transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-500" />
                </div>
                <h3 className="mt-4 font-display text-base font-semibold leading-snug">{b.title}</h3>
                <p className="mt-2 flex-1 text-xs leading-relaxed text-soft">{b.excerpt}</p>
                <div className="mt-4 flex items-center gap-1.5 text-[11px] text-soft">
                  <Clock className="h-3 w-3" /> {b.readTime} read
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
