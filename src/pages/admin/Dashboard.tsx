import { useEffect, useState, useRef } from 'react';
import { signOut } from 'firebase/auth';
import { collection, getDocs, deleteDoc, doc, orderBy, query, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../lib/firebase';
import { useAuth } from '../../lib/AuthContext';
import { uploadToCloudinary, getOptimizedPdfUrl } from '../../lib/cloudinary';
import { updateSiteMedia, DEFAULT_SITE_MEDIA, type SiteMediaConfig } from '../../lib/mediaConfig';
import {
  PlusCircle, Trash2, LogOut, FileText,
  Edit3, Terminal, Loader2, ExternalLink,
  UploadCloud, Video, Download, Check, Sparkles, RefreshCw
} from 'lucide-react';
import type { FirestoreBlog } from '../../lib/blogTypes';

export default function AdminDashboard() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  // Blog posts state
  const [posts, setPosts] = useState<FirestoreBlog[]>([]);
  const [fetching, setFetching] = useState(true);

  // Active Tab
  const [activeTab, setActiveTab] = useState<'blogs' | 'media'>('blogs');

  // Site Media Config State
  const [siteMedia, setSiteMedia] = useState<SiteMediaConfig>(DEFAULT_SITE_MEDIA);
  const [loadingMedia, setLoadingMedia] = useState(true);
  const [mediaSaved, setMediaSaved] = useState(false);
  const [mediaError, setMediaError] = useState('');

  // Upload states
  const resumeFileRef = useRef<HTMLInputElement>(null);
  const videoFileRef = useRef<HTMLInputElement>(null);

  const [uploadingResume, setUploadingResume] = useState(false);
  const [resumeProgress, setResumeProgress] = useState(0);
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);

  useEffect(() => {
    if (!loading && !user) navigate('/admin/login');
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      fetchPosts();
      fetchMediaConfig();
    }
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

  async function fetchMediaConfig() {
    setLoadingMedia(true);
    try {
      const snap = await getDoc(doc(db, 'site_config', 'media'));
      if (snap.exists()) {
        const data = snap.data() as Partial<SiteMediaConfig>;
        setSiteMedia({
          resumeUrl: data.resumeUrl || DEFAULT_SITE_MEDIA.resumeUrl,
          resumeFileName: data.resumeFileName || DEFAULT_SITE_MEDIA.resumeFileName,
          introVideoUrl: data.introVideoUrl || DEFAULT_SITE_MEDIA.introVideoUrl,
          introVideoPosterUrl: data.introVideoPosterUrl,
        });
      }
    } catch (err) {
      console.error('Failed to fetch site media config:', err);
    } finally {
      setLoadingMedia(false);
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

  // Handle direct resume PDF upload to Cloudinary
  async function handleResumeUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingResume(true);
    setResumeProgress(0);
    setMediaError('');

    try {
      const res = await uploadToCloudinary(file, {
        folder: 'portfolio_media/resumes',
        resourceType: 'auto',
        onProgress: (p) => setResumeProgress(p),
      });

      const updated = {
        ...siteMedia,
        resumeUrl: res.secure_url,
        resumeFileName: file.name,
      };
      setSiteMedia(updated);
      await updateSiteMedia(updated);
      setMediaSaved(true);
      setTimeout(() => setMediaSaved(false), 3000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setMediaError(`Resume upload failed: ${msg}`);
    } finally {
      setUploadingResume(false);
    }
  }

  // Handle direct Developer Intro Video upload to Cloudinary
  async function handleVideoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingVideo(true);
    setVideoProgress(0);
    setMediaError('');

    try {
      const res = await uploadToCloudinary(file, {
        folder: 'portfolio_media/videos',
        resourceType: 'video',
        onProgress: (p) => setVideoProgress(p),
      });

      const updated = {
        ...siteMedia,
        introVideoUrl: res.secure_url,
      };
      setSiteMedia(updated);
      await updateSiteMedia(updated);
      setMediaSaved(true);
      setTimeout(() => setMediaSaved(false), 3000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setMediaError(`Video upload failed: ${msg}`);
    } finally {
      setUploadingVideo(false);
    }
  }

  // Manual save for media inputs
  async function handleSaveMedia() {
    setMediaError('');
    try {
      await updateSiteMedia(siteMedia);
      setMediaSaved(true);
      setTimeout(() => setMediaSaved(false), 3000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setMediaError(`Save failed: ${msg}`);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--bg)]">
        <Loader2 className="h-8 w-8 animate-spin text-brand-500" />
      </div>
    );
  }

  const activeResumeDownload = siteMedia.resumeUrl.includes('cloudinary.com')
    ? getOptimizedPdfUrl(siteMedia.resumeUrl, { forceDownload: true, downloadName: siteMedia.resumeFileName || 'Himanshu_Bharti_Resume.pdf' })
    : siteMedia.resumeUrl;

  return (
    <div className="min-h-screen bg-[var(--bg)] px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-5xl">

        {/* Top Header */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500/10 ring-1 ring-brand-500/30">
              <Terminal className="h-4 w-4 text-brand-500" />
            </div>
            <div>
              <h1 className="font-display text-xl font-bold">Admin Console</h1>
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

        {/* Navigation Tabs */}
        <div className="mb-6 flex gap-2 border-b border-[var(--border)] pb-2">
          <button
            onClick={() => setActiveTab('blogs')}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition ${activeTab === 'blogs' ? 'bg-brand-500/15 text-brand-500' : 'text-soft hover:text-[var(--text)]'}`}
          >
            <FileText className="h-4 w-4" /> Blog Articles ({posts.length})
          </button>
          <button
            onClick={() => setActiveTab('media')}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition ${activeTab === 'media' ? 'bg-brand-500/15 text-brand-500' : 'text-soft hover:text-[var(--text)]'}`}
          >
            <Sparkles className="h-4 w-4" /> Cloudinary Media (Resume & Intro Video)
          </button>
        </div>

        {/* ── TAB 1: Media Manager (Resume & Video) ── */}
        {activeTab === 'media' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display text-lg font-bold">Cloudinary Live Media Manager</h2>
                <p className="text-xs text-soft">
                  Upload or update your official Resume PDF and Developer Intro Video anytime without altering source code.
                </p>
              </div>
              {mediaSaved && (
                <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-medium text-emerald-400">
                  <Check className="h-3.5 w-3.5" /> Media Settings Saved!
                </span>
              )}
            </div>

            <div className="rounded-xl border border-brand-500/30 bg-brand-500/5 p-4 text-xs text-soft">
              <p className="font-semibold text-[var(--text)] flex items-center gap-1.5 text-brand-500">
                <Sparkles className="h-4 w-4" /> Cloudinary Configuration Quick Guide
              </p>
              <ul className="mt-2 space-y-1 text-[11px] list-disc list-inside text-soft">
                <li><strong>Direct Upload:</strong> Requires an <em>Unsigned Upload Preset</em> (e.g. <code className="text-brand-400">portfolio_uploads</code> or <code className="text-brand-400">ml_default</code>) created in your <a href="https://cloudinary.com/console" target="_blank" rel="noopener noreferrer" className="text-brand-400 underline">Cloudinary Console &gt; Settings &gt; Upload &gt; Upload presets</a> with Signing Mode set to <strong>Unsigned</strong>.</li>
                <li><strong>Instant URL Paste:</strong> You can also upload files directly in your Cloudinary Media Library and paste their <code className="text-brand-400">https://res.cloudinary.com/...</code> URLs below anytime!</li>
              </ul>
            </div>

            {mediaError && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-400">
                {mediaError}
              </div>
            )}

            {loadingMedia ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="h-6 w-6 animate-spin text-brand-500" />
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2">
                {/* Resume PDF Card */}
                <div className="card p-6 flex flex-col justify-between shadow-sm">
                  <div>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/15 text-brand-500">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-display text-base font-bold text-[var(--text)]">Official Resume PDF</h3>
                        <p className="text-xs text-soft">Powers all "Download PDF / Resume" buttons on the portfolio</p>
                      </div>
                    </div>

                    <div className="mt-5 space-y-3">
                      <input
                        ref={resumeFileRef}
                        type="file"
                        accept="application/pdf"
                        className="hidden"
                        onChange={handleResumeUpload}
                      />

                      <div
                        onClick={() => resumeFileRef.current?.click()}
                        className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-[var(--border)] bg-[var(--bg-soft)] p-6 text-center transition hover:border-brand-500/50 hover:bg-brand-500/5"
                      >
                        {uploadingResume ? (
                          <div className="flex flex-col items-center gap-2">
                            <Loader2 className="h-6 w-6 animate-spin text-brand-500" />
                            <p className="text-xs font-medium text-brand-500">Uploading PDF to Cloudinary ({resumeProgress}%)</p>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center gap-2">
                            <UploadCloud className="h-7 w-7 text-brand-500" />
                            <p className="text-xs font-semibold text-[var(--text)]">Click to upload new Resume PDF</p>
                            <p className="text-[11px] text-soft">Directly replaces portfolio resume with Cloudinary CDN</p>
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="text-xs font-medium text-soft">Active Resume URL</label>
                        <input
                          type="url"
                          value={siteMedia.resumeUrl}
                          onChange={e => setSiteMedia(m => ({ ...m, resumeUrl: e.target.value }))}
                          className="mt-1 w-full rounded-xl border border-[var(--border)] bg-[var(--bg-soft)] px-3 py-2 font-mono text-xs text-[var(--text)] outline-none focus:border-brand-500/60"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-medium text-soft">Download File Name</label>
                        <input
                          type="text"
                          value={siteMedia.resumeFileName || ''}
                          onChange={e => setSiteMedia(m => ({ ...m, resumeFileName: e.target.value }))}
                          placeholder="Himanshu_Bharti_Resume.pdf"
                          className="mt-1 w-full rounded-xl border border-[var(--border)] bg-[var(--bg-soft)] px-3 py-2 text-xs text-[var(--text)] outline-none focus:border-brand-500/60"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-[var(--border)] pt-4">
                    <a
                      href={activeResumeDownload}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                      className="btn-ghost !px-3 !py-1.5 !text-xs flex items-center gap-1.5"
                    >
                      <Download className="h-3.5 w-3.5" /> Test Live Download
                    </a>
                    <button
                      onClick={handleSaveMedia}
                      className="btn-primary !px-4 !py-1.5 !text-xs"
                    >
                      Save Resume Config
                    </button>
                  </div>
                </div>

                {/* Developer Intro Video Card */}
                <div className="card p-6 flex flex-col justify-between shadow-sm">
                  <div>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-500/15 text-accent-400">
                        <Video className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-display text-base font-bold text-[var(--text)]">Developer Intro Video</h3>
                        <p className="text-xs text-soft">Plays on the homepage hero / about section</p>
                      </div>
                    </div>

                    <div className="mt-5 space-y-3">
                      <input
                        ref={videoFileRef}
                        type="file"
                        accept="video/*"
                        className="hidden"
                        onChange={handleVideoUpload}
                      />

                      <div
                        onClick={() => videoFileRef.current?.click()}
                        className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-[var(--border)] bg-[var(--bg-soft)] p-6 text-center transition hover:border-accent-500/50 hover:bg-accent-500/5"
                      >
                        {uploadingVideo ? (
                          <div className="flex flex-col items-center gap-2">
                            <Loader2 className="h-6 w-6 animate-spin text-accent-400" />
                            <p className="text-xs font-medium text-accent-400">Uploading Video to Cloudinary ({videoProgress}%)</p>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center gap-2">
                            <UploadCloud className="h-7 w-7 text-accent-400" />
                            <p className="text-xs font-semibold text-[var(--text)]">Click to upload new Intro Video</p>
                            <p className="text-[11px] text-soft">Supports MP4, WEBM, MOV</p>
                          </div>
                        )}
                      </div>

                      {/* Video Player Preview */}
                      {siteMedia.introVideoUrl && (
                        <div className="overflow-hidden rounded-xl border border-[var(--border)] bg-black/60">
                          <video
                            key={siteMedia.introVideoUrl}
                            src={siteMedia.introVideoUrl}
                            controls
                            muted
                            className="h-32 w-full object-cover"
                          />
                        </div>
                      )}

                      <div>
                        <label className="text-xs font-medium text-soft">Active Video URL</label>
                        <input
                          type="url"
                          value={siteMedia.introVideoUrl}
                          onChange={e => setSiteMedia(m => ({ ...m, introVideoUrl: e.target.value }))}
                          className="mt-1 w-full rounded-xl border border-[var(--border)] bg-[var(--bg-soft)] px-3 py-2 font-mono text-xs text-[var(--text)] outline-none focus:border-brand-500/60"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-end border-t border-[var(--border)] pt-4">
                    <button
                      onClick={handleSaveMedia}
                      className="btn-primary !px-4 !py-1.5 !text-xs"
                    >
                      Save Video Config
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── TAB 2: Blog Posts Manager ── */}
        {activeTab === 'blogs' && (
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-lg font-bold">Published & Draft Articles</h2>
              <button
                onClick={fetchPosts}
                className="btn-ghost !px-3 !py-1.5 !text-xs flex items-center gap-1.5 text-soft"
              >
                <RefreshCw className="h-3.5 w-3.5" /> Refresh
              </button>
            </div>

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
                  <div key={p.id} className="card flex items-start justify-between gap-4 p-5 transition-all hover:border-brand-500/30 shadow-sm">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="chip text-brand-500">{p.tag}</span>
                        {!p.published && (
                          <span className="chip border-warn-400/40 text-warn-400">Draft</span>
                        )}
                        {p.pdfUrl && (
                          <span className="chip border-brand-500/30 text-brand-400">PDF Attached</span>
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
        )}
      </div>
    </div>
  );
}
