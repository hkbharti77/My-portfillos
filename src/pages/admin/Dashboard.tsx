import { useEffect, useState } from 'react';
import { signOut } from 'firebase/auth';
import { collection, getDocs, deleteDoc, doc, orderBy, query } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../lib/firebase';
import { useAuth } from '../../lib/AuthContext';
import {
  PlusCircle, Trash2, LogOut, FileText,
  Edit3, Terminal, Loader2, ExternalLink,
} from 'lucide-react';
import type { FirestoreBlog } from '../../lib/blogTypes';

export default function AdminDashboard() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<FirestoreBlog[]>([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!loading && !user) navigate('/admin/login');
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) fetchPosts();
  }, [user]);

  async function fetchPosts() {
    setFetching(true);
    try {
      const q = query(collection(db, 'blogs'), orderBy('createdAt', 'desc'));
      const snap = await getDocs(q);
      setPosts(snap.docs.map(d => ({ id: d.id, ...d.data() } as FirestoreBlog)));
    } catch (err) {
      console.error('Fetch posts failed:', err);
    } finally {
      setFetching(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this blog post? This cannot be undone.')) return;
    try {
      await deleteDoc(doc(db, 'blogs', id));
      await fetchPosts();
    } catch (err) {
      console.error('Delete failed:', err);
      alert('Delete failed. Check console for details.');
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--bg)]">
        <Loader2 className="h-8 w-8 animate-spin text-brand-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500/10 ring-1 ring-brand-500/30">
              <Terminal className="h-4 w-4 text-brand-500" />
            </div>
            <div>
              <h1 className="font-display text-xl font-bold">Blog Dashboard</h1>
              <p className="text-xs text-soft">{user?.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/admin/new')}
              className="btn-primary"
            >
              <PlusCircle className="h-4 w-4" /> New Post
            </button>
            <button
              onClick={() => signOut(auth).then(() => navigate('/admin/login'))}
              className="btn-ghost"
            >
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          </div>
        </div>

        {/* Posts list */}
        {fetching ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="h-6 w-6 animate-spin text-brand-500" />
          </div>
        ) : posts.length === 0 ? (
          <div className="card flex flex-col items-center justify-center gap-3 py-24 text-center">
            <FileText className="h-10 w-10 text-soft opacity-40" />
            <p className="text-soft">No blog posts yet.</p>
            <button onClick={() => navigate('/admin/new')} className="btn-primary mt-1">
              <PlusCircle className="h-4 w-4" /> Create your first post
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {posts.map(p => (
              <div key={p.id} className="card flex items-start justify-between gap-4 p-5">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="chip text-brand-500">{p.tag}</span>
                    {!p.published && (
                      <span className="chip border-warn-400/40 text-warn-400">Draft</span>
                    )}
                  </div>
                  <h3 className="mt-2 font-display text-base font-semibold leading-snug">
                    {p.title}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-xs text-soft">{p.excerpt}</p>
                  <p className="mt-2 font-mono text-[10px] text-soft">
                    {p.date} · {p.readTime} read · /blog/{p.slug}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <button
                    onClick={() => window.open(`/blog/${p.slug}`, '_blank')}
                    className="btn-ghost !px-3 !py-2"
                    title="View live"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => navigate(`/admin/edit/${p.id}`)}
                    className="btn-ghost !px-3 !py-2"
                    title="Edit"
                  >
                    <Edit3 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="btn-ghost !px-3 !py-2 hover:!border-red-500/40 hover:!text-red-400"
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
