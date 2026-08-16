import { useEffect, useRef, useState, useCallback } from 'react';
import {
  Bold, Italic, Underline, Strikethrough,
  Heading1, Heading2, Heading3,
  List, ListOrdered, Quote, Code, Minus,
  Link, Image as ImageIcon, FileText, AlignLeft, AlignCenter, AlignRight,
  Undo, Redo, Eye, EyeOff, Type, UploadCloud, Loader2, X, Check
} from 'lucide-react';
import { uploadToCloudinary, getOptimizedImageUrl, getImageSrcSet } from '../../lib/cloudinary';

interface RichEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

type ToolbarBtn = {
  icon: React.ReactNode;
  title: string;
  action: () => void;
  cmd?: string;
};

export default function RichEditor({ value, onChange, placeholder = 'Write your article here…' }: RichEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);

  const [showPreview, setShowPreview] = useState(false);
  const [showHTML, setShowHTML] = useState(false);
  const [htmlSource, setHtmlSource] = useState(value);
  const isInternalUpdate = useRef(false);

  // Media Modal state
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [imageTab, setImageTab] = useState<'upload' | 'url'>('upload');
  const [imageUrl, setImageUrl] = useState('');
  const [imageAlt, setImageAlt] = useState('');
  const [imageCaption, setImageCaption] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState('');

  // PDF modal state
  const [pdfModalOpen, setPdfModalOpen] = useState(false);
  const [pdfTab, setPdfTab] = useState<'upload' | 'url'>('upload');
  const [pdfUrl, setPdfUrl] = useState('');
  const [pdfTitle, setPdfTitle] = useState('');
  const [uploadingPdf, setUploadingPdf] = useState(false);
  const [pdfProgress, setPdfProgress] = useState(0);
  const [pdfError, setPdfError] = useState('');

  // Sync external value → editor (only on mount or external reset)
  useEffect(() => {
    if (!editorRef.current) return;
    if (editorRef.current.innerHTML !== value) {
      isInternalUpdate.current = true;
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  const emit = useCallback(() => {
    if (!editorRef.current) return;
    const html = editorRef.current.innerHTML;
    setHtmlSource(html);
    onChange(html);
  }, [onChange]);

  function exec(command: string, val?: string) {
    document.execCommand(command, false, val ?? undefined);
    editorRef.current?.focus();
    emit();
  }

  function insertHTML(html: string) {
    editorRef.current?.focus();
    document.execCommand('insertHTML', false, html);
    emit();
  }

  function handleInsertLink() {
    const url = prompt('Enter URL:', 'https://');
    if (!url) return;
    const text = window.getSelection()?.toString() || url;
    insertHTML(`<a href="${url}" target="_blank" rel="noopener noreferrer">${text}</a>`);
  }

  function handleFontSize(size: string) {
    exec('fontSize', size);
  }

  // Handle direct image file upload to Cloudinary
  async function handleImageFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingImage(true);
    setUploadError('');
    setUploadProgress(0);

    try {
      const res = await uploadToCloudinary(file, {
        folder: 'portfolio_blogs/images',
        onProgress: (p) => setUploadProgress(p),
      });
      setImageUrl(res.secure_url);
      if (!imageAlt) setImageAlt(file.name.replace(/\.[^.]+$/, ''));
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setUploadError(`Upload failed: ${msg}`);
    } finally {
      setUploadingImage(false);
    }
  }

  // Insert configured image into editor
  function confirmInsertImage() {
    if (!imageUrl.trim()) {
      setUploadError('Please provide or upload an image.');
      return;
    }

    const optimizedSrc = getOptimizedImageUrl(imageUrl, { width: 1200, quality: 'auto', format: 'auto' });
    const srcSet = getImageSrcSet(imageUrl, [400, 800, 1200]);
    const altText = imageAlt.trim() || 'Blog illustration';
    
    let html = `<figure class="blog-media my-6"><img src="${optimizedSrc}" srcset="${srcSet}" sizes="(max-width: 768px) 100vw, 800px" alt="${altText}" loading="lazy" class="rounded-xl w-full max-h-[520px] object-cover border border-[var(--border)] shadow-md" />`;
    if (imageCaption.trim()) {
      html += `<figcaption class="text-xs text-center text-soft mt-2 italic">${imageCaption.trim()}</figcaption>`;
    }
    html += `</figure><p></p>`;

    insertHTML(html);
    setImageModalOpen(false);
    setImageUrl('');
    setImageAlt('');
    setImageCaption('');
    setUploadError('');
    setUploadProgress(0);
  }

  // Handle direct PDF upload to Cloudinary
  async function handlePdfFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingPdf(true);
    setPdfError('');
    setPdfProgress(0);

    try {
      const res = await uploadToCloudinary(file, {
        folder: 'portfolio_blogs/documents',
        onProgress: (p) => setPdfProgress(p),
      });
      setPdfUrl(res.secure_url);
      if (!pdfTitle) setPdfTitle(file.name.replace(/\.[^.]+$/, ''));
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setPdfError(`PDF Upload failed: ${msg}`);
    } finally {
      setUploadingPdf(false);
    }
  }

  // Insert styled PDF download card
  function confirmInsertPdf() {
    if (!pdfUrl.trim()) {
      setPdfError('Please provide or upload a PDF document.');
      return;
    }
    const title = pdfTitle.trim() || 'Download Document (PDF)';
    const cardHtml = `<div class="blog-attachment-card my-6 p-4 rounded-xl border border-brand-500/30 bg-brand-500/5 flex items-center justify-between gap-4"><div class="flex items-center gap-3"><span class="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-500/15 text-brand-500 font-bold text-xs">PDF</span><div><h4 class="text-sm font-semibold text-[var(--text)] m-0 leading-snug">${title}</h4><p class="text-xs text-soft m-0">Cloudinary Protected Document</p></div></div><a href="${pdfUrl}" target="_blank" rel="noopener noreferrer" download class="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-brand-500 hover:bg-brand-400 rounded-full transition shadow-sm no-underline">Download PDF</a></div><p></p>`;

    insertHTML(cardHtml);
    setPdfModalOpen(false);
    setPdfUrl('');
    setPdfTitle('');
    setPdfError('');
    setPdfProgress(0);
  }

  // Toolbar groups
  const toolbar: (ToolbarBtn | 'sep')[] = [
    { icon: <Undo className="h-3.5 w-3.5" />, title: 'Undo', action: () => exec('undo') },
    { icon: <Redo className="h-3.5 w-3.5" />, title: 'Redo', action: () => exec('redo') },
    'sep',
    { icon: <Heading1 className="h-3.5 w-3.5" />, title: 'Heading 1', action: () => exec('formatBlock', '<h1>') },
    { icon: <Heading2 className="h-3.5 w-3.5" />, title: 'Heading 2', action: () => exec('formatBlock', '<h2>') },
    { icon: <Heading3 className="h-3.5 w-3.5" />, title: 'Heading 3', action: () => exec('formatBlock', '<h3>') },
    { icon: <Type className="h-3.5 w-3.5" />, title: 'Paragraph', action: () => exec('formatBlock', '<p>') },
    'sep',
    { icon: <Bold className="h-3.5 w-3.5" />, title: 'Bold', action: () => exec('bold') },
    { icon: <Italic className="h-3.5 w-3.5" />, title: 'Italic', action: () => exec('italic') },
    { icon: <Underline className="h-3.5 w-3.5" />, title: 'Underline', action: () => exec('underline') },
    { icon: <Strikethrough className="h-3.5 w-3.5" />, title: 'Strikethrough', action: () => exec('strikeThrough') },
    { icon: <Code className="h-3.5 w-3.5" />, title: 'Inline Code', action: () => insertHTML('<code>code</code>') },
    'sep',
    { icon: <List className="h-3.5 w-3.5" />, title: 'Bullet List', action: () => exec('insertUnorderedList') },
    { icon: <ListOrdered className="h-3.5 w-3.5" />, title: 'Numbered List', action: () => exec('insertOrderedList') },
    { icon: <Quote className="h-3.5 w-3.5" />, title: 'Blockquote', action: () => exec('formatBlock', '<blockquote>') },
    { icon: <Minus className="h-3.5 w-3.5" />, title: 'Divider', action: () => insertHTML('<hr/>') },
    'sep',
    { icon: <AlignLeft className="h-3.5 w-3.5" />, title: 'Align Left', action: () => exec('justifyLeft') },
    { icon: <AlignCenter className="h-3.5 w-3.5" />, title: 'Align Center', action: () => exec('justifyCenter') },
    { icon: <AlignRight className="h-3.5 w-3.5" />, title: 'Align Right', action: () => exec('justifyRight') },
    'sep',
    { icon: <Link className="h-3.5 w-3.5" />, title: 'Insert Link', action: handleInsertLink },
    { icon: <ImageIcon className="h-3.5 w-3.5 text-brand-500" />, title: 'Insert Image (Cloudinary)', action: () => setImageModalOpen(true) },
    { icon: <FileText className="h-3.5 w-3.5 text-accent-400" />, title: 'Insert PDF / Document', action: () => setPdfModalOpen(true) },
  ];

  // HTML source mode apply
  function applyHTMLSource() {
    if (!editorRef.current) return;
    editorRef.current.innerHTML = htmlSource;
    onChange(htmlSource);
    setShowHTML(false);
  }

  return (
    <div className="relative overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg-soft)]">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 border-b border-[var(--border)] bg-[var(--bg)] px-2 py-1.5">
        {toolbar.map((item, i) =>
          item === 'sep' ? (
            <span key={i} className="mx-1 h-4 w-px bg-[var(--border)]" />
          ) : (
            <button
              key={i}
              type="button"
              title={item.title}
              onMouseDown={e => { e.preventDefault(); item.action(); }}
              className="flex h-7 w-7 items-center justify-center rounded text-soft transition hover:bg-brand-500/10 hover:text-brand-500"
            >
              {item.icon}
            </button>
          )
        )}

        {/* Font size */}
        <span className="mx-1 h-4 w-px bg-[var(--border)]" />
        <select
          title="Font size"
          onChange={e => handleFontSize(e.target.value)}
          defaultValue=""
          className="h-7 rounded border border-[var(--border)] bg-[var(--bg-soft)] px-1 text-[11px] text-soft outline-none hover:border-brand-500/40"
        >
          <option value="" disabled>Size</option>
          {['1','2','3','4','5','6','7'].map(s => (
            <option key={s} value={s}>{['10','13','16','18','24','32','48'][+s-1]}px</option>
          ))}
        </select>

        {/* Right side: HTML / Preview toggles */}
        <div className="ml-auto flex items-center gap-1">
          <button
            type="button"
            title="Toggle HTML source"
            onMouseDown={e => e.preventDefault()}
            onClick={() => { setShowHTML(h => !h); setShowPreview(false); }}
            className={`flex h-7 items-center gap-1 rounded px-2 text-[11px] font-mono transition ${showHTML ? 'bg-brand-500/15 text-brand-500' : 'text-soft hover:bg-brand-500/10 hover:text-brand-500'}`}
          >
            <Code className="h-3 w-3" /> HTML
          </button>
          <button
            type="button"
            title="Toggle preview"
            onMouseDown={e => e.preventDefault()}
            onClick={() => { setShowPreview(p => !p); setShowHTML(false); }}
            className={`flex h-7 items-center gap-1 rounded px-2 text-[11px] transition ${showPreview ? 'bg-brand-500/15 text-brand-500' : 'text-soft hover:bg-brand-500/10 hover:text-brand-500'}`}
          >
            {showPreview ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
            {showPreview ? 'Edit' : 'Preview'}
          </button>
        </div>
      </div>

      {/* HTML source editor */}
      {showHTML && (
        <div className="flex flex-col">
          <textarea
            value={htmlSource}
            onChange={e => setHtmlSource(e.target.value)}
            className="min-h-[280px] w-full resize-y bg-[var(--bg-soft)] px-4 py-3 font-mono text-xs leading-relaxed text-[var(--text)] outline-none"
            spellCheck={false}
          />
          <div className="flex justify-end gap-2 border-t border-[var(--border)] p-2">
            <button type="button" onClick={() => setShowHTML(false)} className="btn-ghost !px-3 !py-1.5 !text-xs">Cancel</button>
            <button type="button" onClick={applyHTMLSource} className="btn-primary !px-3 !py-1.5 !text-xs">Apply HTML</button>
          </div>
        </div>
      )}

      {/* Preview */}
      {showPreview && (
        <div
          className="blog-prose min-h-[280px] px-5 py-4 text-sm"
          dangerouslySetInnerHTML={{ __html: value }}
        />
      )}

      {/* WYSIWYG editor */}
      {!showHTML && !showPreview && (
        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          onInput={emit}
          onBlur={emit}
          data-placeholder={placeholder}
          className="blog-prose rich-editor-body min-h-[280px] px-5 py-4 text-sm outline-none"
        />
      )}

      {/* ── Image Upload / Insert Modal ── */}
      {imageModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
              <div className="flex items-center gap-2">
                <ImageIcon className="h-5 w-5 text-brand-500" />
                <h3 className="font-display text-base font-semibold text-[var(--text)]">Insert Cloudinary Image</h3>
              </div>
              <button
                type="button"
                onClick={() => setImageModalOpen(false)}
                className="rounded-lg p-1 text-soft hover:bg-[var(--bg-soft)] hover:text-[var(--text)]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4 flex rounded-lg bg-[var(--bg-soft)] p-1">
              <button
                type="button"
                onClick={() => setImageTab('upload')}
                className={`flex-1 rounded-md py-1.5 text-xs font-medium transition ${imageTab === 'upload' ? 'bg-brand-500 text-white shadow' : 'text-soft hover:text-[var(--text)]'}`}
              >
                Upload File
              </button>
              <button
                type="button"
                onClick={() => setImageTab('url')}
                className={`flex-1 rounded-md py-1.5 text-xs font-medium transition ${imageTab === 'url' ? 'bg-brand-500 text-white shadow' : 'text-soft hover:text-[var(--text)]'}`}
              >
                Image URL
              </button>
            </div>

            <div className="mt-4 space-y-3">
              {imageTab === 'upload' ? (
                <div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageFileUpload}
                  />
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-[var(--border)] bg-[var(--bg-soft)] p-6 text-center transition hover:border-brand-500/50 hover:bg-brand-500/5"
                  >
                    {uploadingImage ? (
                      <div className="flex flex-col items-center gap-2">
                        <Loader2 className="h-6 w-6 animate-spin text-brand-500" />
                        <p className="text-xs font-medium text-brand-500">Uploading to Cloudinary ({uploadProgress}%)</p>
                      </div>
                    ) : imageUrl ? (
                      <div className="flex flex-col items-center gap-2">
                        <Check className="h-6 w-6 text-emerald-400" />
                        <p className="text-xs font-medium text-emerald-400">Image uploaded successfully!</p>
                        <p className="text-[10px] text-soft truncate max-w-xs">{imageUrl}</p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2">
                        <UploadCloud className="h-7 w-7 text-brand-500" />
                        <p className="text-xs font-semibold text-[var(--text)]">Click to upload image to Cloudinary</p>
                        <p className="text-[11px] text-soft">Supports PNG, JPG, WEBP, GIF</p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div>
                  <label className="text-xs font-medium text-soft">Cloudinary or Web Image URL</label>
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://res.cloudinary.com/..."
                    className="mt-1 w-full rounded-xl border border-[var(--border)] bg-[var(--bg-soft)] px-3.5 py-2 text-xs text-[var(--text)] outline-none focus:border-brand-500/60"
                  />
                </div>
              )}

              <div>
                <label className="text-xs font-medium text-soft">Alt Text (Accessibility & SEO)</label>
                <input
                  type="text"
                  value={imageAlt}
                  onChange={(e) => setImageAlt(e.target.value)}
                  placeholder="e.g. Architecture diagram of RAG vector search"
                  className="mt-1 w-full rounded-xl border border-[var(--border)] bg-[var(--bg-soft)] px-3.5 py-2 text-xs text-[var(--text)] outline-none focus:border-brand-500/60"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-soft">Optional Caption</label>
                <input
                  type="text"
                  value={imageCaption}
                  onChange={(e) => setImageCaption(e.target.value)}
                  placeholder="Figure 1: High-level system architecture"
                  className="mt-1 w-full rounded-xl border border-[var(--border)] bg-[var(--bg-soft)] px-3.5 py-2 text-xs text-[var(--text)] outline-none focus:border-brand-500/60"
                />
              </div>

              {uploadError && (
                <p className="rounded-lg bg-red-500/10 p-2 text-xs text-red-400">{uploadError}</p>
              )}
            </div>

            <div className="mt-6 flex justify-end gap-2 border-t border-[var(--border)] pt-3">
              <button
                type="button"
                onClick={() => setImageModalOpen(false)}
                className="btn-ghost !px-4 !py-2 !text-xs"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmInsertImage}
                disabled={uploadingImage || !imageUrl}
                className="btn-primary !px-4 !py-2 !text-xs disabled:opacity-50"
              >
                Insert Image
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── PDF Upload / Insert Modal ── */}
      {pdfModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-accent-400" />
                <h3 className="font-display text-base font-semibold text-[var(--text)]">Insert PDF Document</h3>
              </div>
              <button
                type="button"
                onClick={() => setPdfModalOpen(false)}
                className="rounded-lg p-1 text-soft hover:bg-[var(--bg-soft)] hover:text-[var(--text)]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4 flex rounded-lg bg-[var(--bg-soft)] p-1">
              <button
                type="button"
                onClick={() => setPdfTab('upload')}
                className={`flex-1 rounded-md py-1.5 text-xs font-medium transition ${pdfTab === 'upload' ? 'bg-brand-500 text-white shadow' : 'text-soft hover:text-[var(--text)]'}`}
              >
                Upload PDF
              </button>
              <button
                type="button"
                onClick={() => setPdfTab('url')}
                className={`flex-1 rounded-md py-1.5 text-xs font-medium transition ${pdfTab === 'url' ? 'bg-brand-500 text-white shadow' : 'text-soft hover:text-[var(--text)]'}`}
              >
                PDF URL
              </button>
            </div>

            <div className="mt-4 space-y-3">
              {pdfTab === 'upload' ? (
                <div>
                  <input
                    ref={pdfInputRef}
                    type="file"
                    accept="application/pdf"
                    className="hidden"
                    onChange={handlePdfFileUpload}
                  />
                  <div
                    onClick={() => pdfInputRef.current?.click()}
                    className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-[var(--border)] bg-[var(--bg-soft)] p-6 text-center transition hover:border-brand-500/50 hover:bg-brand-500/5"
                  >
                    {uploadingPdf ? (
                      <div className="flex flex-col items-center gap-2">
                        <Loader2 className="h-6 w-6 animate-spin text-brand-500" />
                        <p className="text-xs font-medium text-brand-500">Uploading PDF ({pdfProgress}%)</p>
                      </div>
                    ) : pdfUrl ? (
                      <div className="flex flex-col items-center gap-2">
                        <Check className="h-6 w-6 text-emerald-400" />
                        <p className="text-xs font-medium text-emerald-400">PDF uploaded successfully!</p>
                        <p className="text-[10px] text-soft truncate max-w-xs">{pdfUrl}</p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2">
                        <UploadCloud className="h-7 w-7 text-accent-400" />
                        <p className="text-xs font-semibold text-[var(--text)]">Click to upload PDF to Cloudinary</p>
                        <p className="text-[11px] text-soft">Supports PDF documents & whitepapers</p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div>
                  <label className="text-xs font-medium text-soft">Cloudinary or Web PDF URL</label>
                  <input
                    type="url"
                    value={pdfUrl}
                    onChange={(e) => setPdfUrl(e.target.value)}
                    placeholder="https://res.cloudinary.com/.../whitepaper.pdf"
                    className="mt-1 w-full rounded-xl border border-[var(--border)] bg-[var(--bg-soft)] px-3.5 py-2 text-xs text-[var(--text)] outline-none focus:border-brand-500/60"
                  />
                </div>
              )}

              <div>
                <label className="text-xs font-medium text-soft">Document Title / Label</label>
                <input
                  type="text"
                  value={pdfTitle}
                  onChange={(e) => setPdfTitle(e.target.value)}
                  placeholder="e.g. Enterprise RAG Architecture Whitepaper (PDF)"
                  className="mt-1 w-full rounded-xl border border-[var(--border)] bg-[var(--bg-soft)] px-3.5 py-2 text-xs text-[var(--text)] outline-none focus:border-brand-500/60"
                />
              </div>

              {pdfError && (
                <p className="rounded-lg bg-red-500/10 p-2 text-xs text-red-400">{pdfError}</p>
              )}
            </div>

            <div className="mt-6 flex justify-end gap-2 border-t border-[var(--border)] pt-3">
              <button
                type="button"
                onClick={() => setPdfModalOpen(false)}
                className="btn-ghost !px-4 !py-2 !text-xs"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmInsertPdf}
                disabled={uploadingPdf || !pdfUrl}
                className="btn-primary !px-4 !py-2 !text-xs disabled:opacity-50"
              >
                Insert PDF Badge
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
