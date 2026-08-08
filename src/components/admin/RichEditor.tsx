import { useEffect, useRef, useState, useCallback } from 'react';
import {
  Bold, Italic, Underline, Strikethrough,
  Heading1, Heading2, Heading3,
  List, ListOrdered, Quote, Code, Minus,
  Link, Image, AlignLeft, AlignCenter, AlignRight,
  Undo, Redo, Eye, EyeOff, Type,
} from 'lucide-react';

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
  const [showPreview, setShowPreview] = useState(false);
  const [showHTML, setShowHTML] = useState(false);
  const [htmlSource, setHtmlSource] = useState(value);
  const isInternalUpdate = useRef(false);

  // Sync external value → editor (only on mount or when editId changes)
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

  function exec(command: string, value?: string) {
    document.execCommand(command, false, value ?? undefined);
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
    insertHTML(`<a href="${url}" target="_blank" rel="noopener">${text}</a>`);
  }

  function handleInsertImage() {
    const url = prompt('Image URL:');
    if (!url) return;
    const alt = prompt('Alt text:', '') || '';
    insertHTML(`<img src="${url}" alt="${alt}" style="max-width:100%;border-radius:0.5rem;margin:1rem 0;" />`);
  }

  function handleFontSize(size: string) {
    exec('fontSize', size);
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
    { icon: <Image className="h-3.5 w-3.5" />, title: 'Insert Image', action: handleInsertImage },
  ];

  // HTML source mode apply
  function applyHTMLSource() {
    if (!editorRef.current) return;
    editorRef.current.innerHTML = htmlSource;
    onChange(htmlSource);
    setShowHTML(false);
  }

  return (
    <div className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg-soft)]">
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
    </div>
  );
}
