import { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  collection, addDoc, getDocs, doc, query,
  serverTimestamp, updateDoc,
} from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useAuth } from '../../lib/AuthContext';
import RichEditor from '../../components/admin/RichEditor';
import type { FirestoreBlog } from '../../lib/blogTypes';
import { uploadToCloudinary, getOptimizedImageUrl, getOptimizedPdfUrl } from '../../lib/cloudinary';
import {
  ArrowLeft, Save, ChevronDown, ChevronUp,
  Clock, Calendar, Loader2,
  FileText, UploadCloud, Trash2, ExternalLink, Sparkles
} from 'lucide-react';

const TAGS = ['AI / ML', 'Backend', 'Meta API', 'Frontend', 'DevOps', 'Database', 'Architecture', 'Career'];
const READ_TIMES = ['2 min', '3 min', '4 min', '5 min', '6 min', '8 min', '10 min', '12 min', '15 min'];

function emptyForm() {
  return {
    title: '',
    slug: '',
    excerpt: '',
    tag: TAGS[0],
    readTime: READ_TIMES[2],
    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    content: '',
    coverImage: '',
    coverImageAlt: '',
    pdfUrl: '',
    pdfName: '',
    ogImage: '',
    seoTitle: '',
    seoDescription: '',
    seoKeywords: '',
    canonicalUrl: '',
    published: true,
  };
}

function slugify(t: string) {
  return t.toLowerCase().trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function inp() {
  return 'w-full rounded-xl border border-[var(--border)] bg-[var(--bg-soft)] px-3.5 py-2.5 text-sm text-[var(--text)] outline-none transition focus:border-brand-500/60 focus:ring-2 focus:ring-brand-500/20';
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <label className="text-xs font-medium text-soft">{label}</label>
        {hint && <span className="font-mono text-[10px] text-soft">{hint}</span>}
      </div>
      {children}
    </div>
  );
}

export default function BlogEditor() {
  const { id } = useParams<{ id?: string }>();
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const coverInputRef = useRef<HTMLInputElement>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState(emptyForm());
  const [formKey, setFormKey] = useState(0);
  const [saving, setSaving] = useState(false);
  const [loadingPost, setLoadingPost] = useState(!!id);
  const [seoOpen, setSeoOpen] = useState(false);
  const [mediaOpen, setMediaOpen] = useState(true);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);

  // Upload states
  const [uploadingCover, setUploadingCover] = useState(false);
  const [coverProgress, setCoverProgress] = useState(0);
  const [uploadingPdf, setUploadingPdf] = useState(false);
  const [pdfProgress, setPdfProgress] = useState(0);

  // Redirect if not authed
  useEffect(() => {
    if (!authLoading && !user) navigate('/admin/login');
  }, [user, authLoading, navigate]);

  // Load existing post when editing
  useEffect(() => {
    if (!id) return;
    async function load() {
      try {
        const snap = await getDocs(query(collection(db, 'blogs')));
        const found = snap.docs.find(d => d.id === id);
        if (found) {
          const p = found.data() as FirestoreBlog;
          setForm({
            title: p.title || '',
            slug: p.slug || '',
            excerpt: p.excerpt || '',
            tag: p.tag || TAGS[0],
            readTime: p.readTime || READ_TIMES[2],
            date: p.date || '',
            content: p.content || '',
            coverImage: p.coverImage || '',
            coverImageAlt: p.coverImageAlt || '',
            pdfUrl: p.pdfUrl || '',
            pdfName: p.pdfName || '',
            ogImage: p.ogImage || '',
            seoTitle: p.seoTitle || '',
            seoDescription: p.seoDescription || '',
            seoKeywords: p.seoKeywords || '',
            canonicalUrl: p.canonicalUrl || '',
            published: p.published ?? true,
          });
          setFormKey(k => k + 1);
        }
      } finally {
        setLoadingPost(false);
      }
    }
    load();
  }, [id]);

  function setTitle(val: string) {
    setForm(f => ({
      ...f,
      title: val,
      slug: f.slug || slugify(val),
      seoTitle: f.seoTitle || val,
    }));
  }

  function setExcerpt(val: string) {
    setForm(f => ({
      ...f,
      excerpt: val,
      seoDescription: f.seoDescription || val,
    }));
  }

  // Cover image upload directly to Cloudinary
  async function handleCoverUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingCover(true);
    setCoverProgress(0);
    setError('');

    try {
      const res = await uploadToCloudinary(file, {
        folder: 'portfolio_blogs/covers',
        onProgress: (pct) => setCoverProgress(pct),
      });
      setForm(f => ({
        ...f,
        coverImage: res.secure_url,
        coverImageAlt: f.coverImageAlt || f.title || file.name.replace(/\.[^.]+$/, ''),
        ogImage: f.ogImage || res.secure_url,
      }));
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(`Cover image upload failed: ${msg}`);
    } finally {
      setUploadingCover(false);
    }
  }

  // PDF whitepaper upload directly to Cloudinary
  async function handlePdfUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingPdf(true);
    setPdfProgress(0);
    setError('');

    try {
      const res = await uploadToCloudinary(file, {
        folder: 'portfolio_blogs/whitepapers',
        onProgress: (pct) => setPdfProgress(pct),
      });
      setForm(f => ({
        ...f,
        pdfUrl: res.secure_url,
        pdfName: f.pdfName || file.name,
      }));
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(`PDF upload failed: ${msg}`);
    } finally {
      setUploadingPdf(false);
    }
  }

  async function handleSave() {
    if (!form.title.trim() || !form.excerpt.trim() || !form.content.trim()) {
      setError('Title, excerpt, and content are required.');
      return;
    }
    setError('');
    setSaving(true);
    const raw = {
      ...form,
      slug: form.slug || slugify(form.title),
      seoTitle: form.seoTitle || form.title,
      seoDescription: form.seoDescription || form.excerpt,
      ogImage: form.ogImage || form.coverImage || '',
      updatedAt: serverTimestamp(),
    };
    const payload = Object.fromEntries(Object.entries(raw).filter(([, v]) => v !== undefined));
    try {
      if (id) {
        await updateDoc(doc(db, 'blogs', id), payload);
      } else {
        await addDoc(collection(db, 'blogs'), { ...payload, createdAt: serverTimestamp() });
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(`Save failed: ${msg}`);
    } finally {
      setSaving(false);
    }
  }

  if (authLoading || loadingPost) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--bg)]">
        <Loader2 className="h-7 w-7 animate-spin text-brand-500" />
      </div>
    );
  }

  const isHTML = /<[a-z][\s\S]*>/i.test(form.content);
  const previewCover = form.coverImage ? getOptimizedImageUrl(form.coverImage, { width: 900, quality: 'auto', format: 'auto' }) : '';

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[var(--bg)]">

      {/* ── Top bar ── */}
      <header className="flex shrink-0 items-center justify-between border-b border-[var(--border)] bg-[var(--bg-soft)] px-5 py-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/admin/dashboard')}
            className="flex items-center gap-1.5 text-sm text-soft transition hover:text-brand-500"
          >
            <ArrowLeft className="h-4 w-4" /> Dashboard
          </button>
          <span className="text-soft opacity-30">/</span>
          <span className="text-sm font-medium">{id ? 'Edit Post' : 'New Post'}</span>
        </div>

        <div className="flex items-center gap-3">
          {saved && (
            <span className="text-xs text-accent-400 transition-opacity">✓ Saved</span>
          )}
          {error && (
            <span className="max-w-xs truncate text-xs text-red-400">{error}</span>
          )}
          {/* Published toggle */}
          <button
            type="button"
            onClick={() => setForm(f => ({ ...f, published: !f.published }))}
            className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition ${
              form.published
                ? 'border-brand-500/40 bg-brand-500/10 text-brand-500'
                : 'border-[var(--border)] text-soft'
            }`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${form.published ? 'bg-brand-500' : 'bg-[var(--text-soft)]'}`} />
            {form.published ? 'Published' : 'Draft'}
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="btn-primary !py-2 disabled:opacity-60"
          >
            {saving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <><Save className="h-4 w-4" /> {id ? 'Update' : 'Publish'}</>
            )}
          </button>
        </div>
      </header>

      {/* ── Split screen ── */}
      <div className="flex min-h-0 flex-1 overflow-hidden">

        {/* LEFT — Editor */}
        <div className="flex w-1/2 flex-col overflow-y-auto border-r border-[var(--border)] px-6 py-6">
          <p className="mb-4 font-mono text-[10px] uppercase tracking-widest text-brand-500">Editor</p>

          <div className="space-y-5">
            <Field label="Title *">
              <input
                value={form.title} onChange={e => setTitle(e.target.value)}
                className={inp()} placeholder="Why RAG beats fine-tuning for most use cases"
              />
            </Field>

            <Field label="URL Slug">
              <div className="flex items-center overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg-soft)] focus-within:border-brand-500/60 focus-within:ring-2 focus-within:ring-brand-500/20">
                <span className="border-r border-[var(--border)] px-3 py-2.5 font-mono text-xs text-soft">/blog/</span>
                <input
                  value={form.slug}
                  onChange={e => setForm(f => ({ ...f, slug: slugify(e.target.value) }))}
                  className="flex-1 bg-transparent px-3 py-2.5 font-mono text-sm text-[var(--text)] outline-none"
                  placeholder="why-rag-beats-fine-tuning"
                />
              </div>
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Tag">
                <select value={form.tag} onChange={e => setForm(f => ({ ...f, tag: e.target.value }))} className={inp()}>
                  {TAGS.map(t => <option key={t}>{t}</option>)}
                </select>
              </Field>
              <Field label="Read Time">
                <select value={form.readTime} onChange={e => setForm(f => ({ ...f, readTime: e.target.value }))} className={inp()}>
                  {READ_TIMES.map(t => <option key={t}>{t}</option>)}
                </select>
              </Field>
            </div>

            <Field label="Date">
              <input value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} className={inp()} />
            </Field>

            <Field label="Excerpt *">
              <textarea
                value={form.excerpt} onChange={e => setExcerpt(e.target.value)}
                className={`${inp()} resize-none`} rows={2}
                placeholder="Short summary shown on the blog card…"
              />
            </Field>

            {/* ── Cloudinary Media & Document Section ── */}
            <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-soft)]">
              <button
                type="button"
                onClick={() => setMediaOpen(o => !o)}
                className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium hover:text-brand-500"
              >
                <span className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-brand-500" />
                  <span>Cloudinary Media & Attachments</span>
                </span>
                {mediaOpen ? <ChevronUp className="h-4 w-4 text-soft" /> : <ChevronDown className="h-4 w-4 text-soft" />}
              </button>

              {mediaOpen && (
                <div className="space-y-4 border-t border-[var(--border)] p-4">
                  {/* Cover Image */}
                  <div>
                    <label className="mb-1.5 flex items-center justify-between text-xs font-medium text-soft">
                      <span>Cover Image (Cloudinary Optimized)</span>
                      {form.coverImage && <span className="text-[10px] text-emerald-400">✓ Ready</span>}
                    </label>

                    {form.coverImage ? (
                      <div className="relative overflow-hidden rounded-xl border border-[var(--border)]">
                        <img
                          src={getOptimizedImageUrl(form.coverImage, { width: 500, height: 200, crop: 'fill' })}
                          alt="Cover preview"
                          className="h-36 w-full object-cover"
                        />
                        <div className="absolute right-2 top-2 flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => setForm(f => ({ ...f, coverImage: '', coverImageAlt: '' }))}
                            className="rounded-lg bg-black/70 p-1.5 text-white hover:bg-red-600 transition"
                            title="Remove cover image"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <input
                          ref={coverInputRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleCoverUpload}
                        />
                        <div
                          onClick={() => coverInputRef.current?.click()}
                          className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-[var(--border)] bg-[var(--bg)] p-4 text-center transition hover:border-brand-500/50 hover:bg-brand-500/5"
                        >
                          {uploadingCover ? (
                            <div className="flex items-center gap-2 text-xs font-medium text-brand-500">
                              <Loader2 className="h-4 w-4 animate-spin" />
                              <span>Uploading to Cloudinary ({coverProgress}%)…</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 text-xs text-soft">
                              <UploadCloud className="h-4 w-4 text-brand-500" />
                              <span>Click to upload Cover Banner to Cloudinary</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    <input
                      type="url"
                      value={form.coverImage}
                      onChange={e => setForm(f => ({ ...f, coverImage: e.target.value }))}
                      placeholder="Or paste Cloudinary image URL: https://res.cloudinary.com/..."
                      className={`mt-2 ${inp()} !text-xs !py-2 font-mono`}
                    />
                  </div>

                  {/* PDF Whitepaper Attachment */}
                  <div className="border-t border-[var(--border)] pt-3">
                    <label className="mb-1.5 flex items-center justify-between text-xs font-medium text-soft">
                      <span>Downloadable PDF / Whitepaper Attachment</span>
                      {form.pdfUrl && <span className="text-[10px] text-accent-400">✓ PDF Attached</span>}
                    </label>

                    {form.pdfUrl ? (
                      <div className="flex items-center justify-between rounded-xl border border-brand-500/30 bg-brand-500/5 p-3">
                        <div className="flex items-center gap-2.5">
                          <FileText className="h-4 w-4 text-brand-500" />
                          <div>
                            <p className="text-xs font-medium text-[var(--text)]">{form.pdfName || 'Document.pdf'}</p>
                            <a
                              href={getOptimizedPdfUrl(form.pdfUrl)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[10px] text-brand-500 hover:underline flex items-center gap-1 mt-0.5"
                            >
                              Test PDF Link <ExternalLink className="h-2.5 w-2.5" />
                            </a>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setForm(f => ({ ...f, pdfUrl: '', pdfName: '' }))}
                          className="rounded-lg p-1 text-soft hover:bg-red-500/10 hover:text-red-400 transition"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ) : (
                      <div>
                        <input
                          ref={pdfInputRef}
                          type="file"
                          accept="application/pdf"
                          className="hidden"
                          onChange={handlePdfUpload}
                        />
                        <div
                          onClick={() => pdfInputRef.current?.click()}
                          className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-[var(--border)] bg-[var(--bg)] p-3 text-center transition hover:border-brand-500/50 hover:bg-brand-500/5"
                        >
                          {uploadingPdf ? (
                            <div className="flex items-center gap-2 text-xs font-medium text-brand-500">
                              <Loader2 className="h-4 w-4 animate-spin" />
                              <span>Uploading PDF ({pdfProgress}%)…</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 text-xs text-soft">
                              <FileText className="h-4 w-4 text-accent-400" />
                              <span>Click to upload PDF Document to Cloudinary</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="mt-2 grid grid-cols-2 gap-2">
                      <input
                        type="url"
                        value={form.pdfUrl}
                        onChange={e => setForm(f => ({ ...f, pdfUrl: e.target.value }))}
                        placeholder="Or PDF URL: https://..."
                        className={`${inp()} !text-xs !py-2 font-mono`}
                      />
                      <input
                        type="text"
                        value={form.pdfName}
                        onChange={e => setForm(f => ({ ...f, pdfName: e.target.value }))}
                        placeholder="Document label (e.g. Architecture Guide)"
                        className={`${inp()} !text-xs !py-2`}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Field label="Content *">
              <RichEditor
                key={formKey}
                value={form.content}
                onChange={val => setForm(f => ({ ...f, content: val }))}
                placeholder="Write your article here…"
              />
            </Field>

            {/* SEO */}
            <div className="rounded-xl border border-[var(--border)]">
              <button
                type="button"
                onClick={() => setSeoOpen(o => !o)}
                className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium hover:text-brand-500"
              >
                <span className="flex items-center gap-2">
                  <span className="font-mono text-xs text-brand-500">SEO</span> Search Engine Optimization
                </span>
                {seoOpen ? <ChevronUp className="h-4 w-4 text-soft" /> : <ChevronDown className="h-4 w-4 text-soft" />}
              </button>
              {seoOpen && (
                <div className="space-y-4 border-t border-[var(--border)] px-4 pb-4 pt-4">
                  <Field label="SEO Title" hint={`${form.seoTitle.length}/60`}>
                    <input value={form.seoTitle} onChange={e => setForm(f => ({ ...f, seoTitle: e.target.value }))} className={inp()} maxLength={70} />
                  </Field>
                  <Field label="Meta Description" hint={`${form.seoDescription.length}/160`}>
                    <textarea value={form.seoDescription} onChange={e => setForm(f => ({ ...f, seoDescription: e.target.value }))} className={`${inp()} resize-none`} rows={2} maxLength={200} />
                  </Field>
                  <Field label="Social Preview Image (OG Image)">
                    <input value={form.ogImage} onChange={e => setForm(f => ({ ...f, ogImage: e.target.value }))} className={inp()} placeholder="Defaults to Cover Image" />
                  </Field>
                  <Field label="Keywords (comma-separated)">
                    <input value={form.seoKeywords} onChange={e => setForm(f => ({ ...f, seoKeywords: e.target.value }))} className={inp()} placeholder="RAG, LangChain, Python" />
                  </Field>
                  <Field label="Canonical URL">
                    <input value={form.canonicalUrl} onChange={e => setForm(f => ({ ...f, canonicalUrl: e.target.value }))} className={inp()} placeholder="https://…" />
                  </Field>
                </div>
              )}
            </div>

            {error && (
              <p className="rounded-lg bg-red-500/10 px-4 py-2.5 text-xs text-red-400">{error}</p>
            )}
          </div>
        </div>

        {/* RIGHT — Live Preview */}
        <div className="flex w-1/2 flex-col overflow-y-auto bg-[var(--bg)]">
          <div className="shrink-0 border-b border-[var(--border)] px-6 py-3">
            <p className="font-mono text-[10px] uppercase tracking-widest text-brand-500">Live Preview</p>
          </div>
          <article className="px-8 py-8">
            {/* Article header preview */}
            <div className="mb-8">
              {form.tag && (
                <span className="chip text-brand-500">{form.tag}</span>
              )}
              <h1 className="mt-4 font-display text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
                {form.title || <span className="opacity-30">Your title will appear here…</span>}
              </h1>
              {form.excerpt && (
                <p className="mt-3 text-base leading-relaxed text-soft">{form.excerpt}</p>
              )}
              <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-[var(--border)] pt-4 text-xs text-soft">
                <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />{form.date}</span>
                <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{form.readTime} read</span>
                <span className="ml-auto font-mono text-[11px] opacity-40">by Himanshu Bharti</span>
              </div>
            </div>

            {/* Cover Image in Live Preview */}
            {previewCover && (
              <div className="mb-8 overflow-hidden rounded-2xl border border-[var(--border)] shadow-lg">
                <img
                  src={previewCover}
                  alt={form.coverImageAlt || form.title || 'Post Cover'}
                  className="h-64 w-full object-cover"
                />
              </div>
            )}

            {/* Attached PDF Banner in Live Preview */}
            {form.pdfUrl && (
              <div className="mb-8 flex items-center justify-between rounded-2xl border border-brand-500/30 bg-brand-500/10 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/20 text-brand-500 font-bold text-xs">
                    PDF
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[var(--text)] m-0">{form.pdfName || 'Attached Document (PDF)'}</h4>
                    <p className="text-xs text-soft m-0">Cloudinary Protected Download</p>
                  </div>
                </div>
                <a
                  href={getOptimizedPdfUrl(form.pdfUrl, { forceDownload: true, downloadName: form.pdfName })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary !px-4 !py-1.5 !text-xs"
                >
                  Download PDF
                </a>
              </div>
            )}

            {/* Article body preview */}
            {form.content ? (
              isHTML ? (
                <div className="blog-prose" dangerouslySetInnerHTML={{ __html: form.content }} />
              ) : (
                <div className="space-y-4">
                  {form.content.split(/\n\n+/).map((p, i) => (
                    <p key={i} className={`leading-relaxed text-soft ${i === 0 ? 'text-base font-medium text-[var(--text)]' : 'text-sm'}`}>
                      {p.trim()}
                    </p>
                  ))}
                </div>
              )
            ) : (
              <p className="text-sm text-soft opacity-30">Your article content will appear here as you type…</p>
            )}
          </article>
        </div>

      </div>
    </div>
  );
}
