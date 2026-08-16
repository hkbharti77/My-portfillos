import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { FirestoreBlog } from '../lib/blogTypes';
import {
  getOptimizedImageUrl,
  getImageSrcSet,
  getOptimizedPdfUrl,
  getBlogSocialOgImage
} from '../lib/cloudinary';
import {
  ArrowLeft, Clock, Calendar, Loader2, Download, FileText,
  ExternalLink, Share2, Check
} from 'lucide-react';
import { downloadFileFromUrl } from '../lib/downloadHelper';
import MaskedImage from '../components/MaskedImage';

function updateMeta(attr: 'name' | 'property', key: string, value: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', value);
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<FirestoreBlog | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [copied, setCopied] = useState(false);
  const [downloadingPdf, setDownloadingPdf] = useState(false);

  useEffect(() => {
    if (!slug) return;
    let cancelled = false;

    async function load() {
      try {
        const snap = await getDocs(query(collection(db, 'blogs')));
        if (cancelled) return;
        const found = snap.docs
          .map(d => ({ id: d.id, ...d.data() } as FirestoreBlog))
          .find(p => p.slug === slug && p.published);
        if (found) {
          setPost(found);
        } else {
          setNotFound(true);
        }
      } catch (err) {
        console.error('BlogPost fetch error:', err);
        setNotFound(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [slug]);

  // SEO meta injection for blog post pages with Cloudinary dynamic OG image
  useEffect(() => {
    if (!post) return;
    const title = post.seoTitle || post.title;
    const desc = post.seoDescription || post.excerpt;
    const canonicalHref = post.canonicalUrl ||
      `https://hkbharti77.github.io/My-portfillos/blog/${post.slug}`;
    const ogImage = getBlogSocialOgImage(post.ogImage || post.coverImage);

    document.title = `${title} — Himanshu Bharti`;

    // Primary meta
    updateMeta('name', 'description', desc);
    if (post.seoKeywords) updateMeta('name', 'keywords', post.seoKeywords);
    updateMeta('name', 'author', 'Himanshu Bharti');
    updateMeta('name', 'robots', 'index, follow, max-snippet:-1, max-image-preview:large');

    // Open Graph (Cloudinary Social Meta Image)
    updateMeta('property', 'og:type', 'article');
    updateMeta('property', 'og:title', title);
    updateMeta('property', 'og:description', desc);
    updateMeta('property', 'og:url', canonicalHref);
    updateMeta('property', 'og:image', ogImage);
    updateMeta('property', 'og:image:width', '1200');
    updateMeta('property', 'og:image:height', '630');
    updateMeta('property', 'og:site_name', 'Himanshu Bharti Portfolio');
    if (post.date) updateMeta('property', 'article:published_time', post.date);

    // Twitter / X
    updateMeta('name', 'twitter:card', 'summary_large_image');
    updateMeta('name', 'twitter:title', title);
    updateMeta('name', 'twitter:description', desc);
    updateMeta('name', 'twitter:image', ogImage);
    updateMeta('name', 'twitter:creator', '@hkbharti77');

    // Canonical
    let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', canonicalHref);

    // JSON-LD — Article structured data for rich results
    const existing = document.getElementById('blog-jsonld');
    if (existing) existing.remove();
    const script = document.createElement('script');
    script.id = 'blog-jsonld';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      '@id': canonicalHref,
      headline: post.title,
      description: post.excerpt,
      image: {
        '@type': 'ImageObject',
        url: ogImage,
        width: 1200,
        height: 630,
      },
      author: {
        '@type': 'Person',
        name: 'Himanshu Bharti',
        url: 'https://hkbharti77.github.io/My-portfillos/',
        sameAs: [
          'https://github.com/hkbharti77',
          'https://www.linkedin.com/in/himanshu-bharti-81a5a618a',
        ],
      },
      publisher: {
        '@type': 'Person',
        name: 'Himanshu Bharti',
        url: 'https://hkbharti77.github.io/My-portfillos/',
      },
      datePublished: post.date,
      dateModified: post.date,
      keywords: post.seoKeywords || post.tag,
      url: canonicalHref,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': canonicalHref,
      },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://hkbharti77.github.io/My-portfillos/',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Blog',
            item: 'https://hkbharti77.github.io/My-portfillos/',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: post.title,
            item: canonicalHref,
          },
        ],
      },
    });
    document.head.appendChild(script);

    return () => {
      document.getElementById('blog-jsonld')?.remove();
      const orig = 'Himanshu Bharti — Software Engineer | Custom Software, AI CRM/ERP & Meta Tech Provider';
      document.title = orig;
      const homeCanonical = 'https://hkbharti77.github.io/My-portfillos/';
      const canonEl = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
      if (canonEl) canonEl.setAttribute('href', homeCanonical);
      updateMeta('property', 'og:type', 'website');
    };
  }, [post]);

  function handleShare() {
    if (navigator.share) {
      navigator.share({
        title: post?.title,
        text: post?.excerpt,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--bg)]">
        <Loader2 className="h-7 w-7 animate-spin text-brand-500" />
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[var(--bg)] px-4 text-center">
        <p className="font-display text-2xl font-bold">Post not found</p>
        <p className="text-sm text-soft">This article doesn't exist or has been unpublished.</p>
        <button onClick={() => navigate('/')} className="btn-primary mt-2">
          <ArrowLeft className="h-4 w-4" /> Back to portfolio
        </button>
      </div>
    );
  }

  // Mask any inline HTML images inside blog post body into local blob URLs
  useEffect(() => {
    if (!post?.content || !isHTML) return;
    const timer = setTimeout(() => {
      const images = document.querySelectorAll<HTMLImageElement>('.blog-prose img');
      images.forEach((img) => {
        img.removeAttribute('srcset');
        const originalSrc = img.src;
        if (originalSrc.startsWith('http')) {
          fetch(originalSrc, { mode: 'cors' })
            .then((res) => res.blob())
            .then((blob) => {
              const blobUrl = URL.createObjectURL(blob);
              img.src = blobUrl;
            })
            .catch(() => {});
        }
      });
    }, 50);
    return () => clearTimeout(timer);
  }, [post?.content, isHTML]);

  const isHTML = /<[a-z][\s\S]*>/i.test(post.content);
  const coverSrc = post.coverImage ? getOptimizedImageUrl(post.coverImage, { width: 1200, quality: 'auto', format: 'auto' }) : '';
  const pdfDownloadUrl = post.pdfUrl ? getOptimizedPdfUrl(post.pdfUrl, { forceDownload: true, downloadName: post.pdfName || `${post.slug}-whitepaper.pdf` }) : '';
  const pdfViewUrl = post.pdfUrl ? getOptimizedPdfUrl(post.pdfUrl) : '';

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      {/* Back nav */}
      <div className="section-pad mx-auto max-w-4xl pt-8">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('/#blogs')}
            className="inline-flex items-center gap-2 text-sm text-soft transition-colors hover:text-brand-500"
          >
            <ArrowLeft className="h-4 w-4" /> Back to writing
          </button>
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--card)] px-3.5 py-1.5 text-xs font-medium text-soft transition hover:border-brand-500/40 hover:text-brand-500"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Share2 className="h-3.5 w-3.5" />}
            {copied ? 'Link Copied' : 'Share Article'}
          </button>
        </div>
      </div>

      {/* Article */}
      <article className="section-pad mx-auto max-w-4xl pb-24 pt-8">
        {/* Header */}
        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="chip text-brand-500">{post.tag}</span>
            {post.pdfUrl && (
              <span className="chip border-brand-500/40 bg-brand-500/10 text-brand-400">
                <FileText className="h-3 w-3" /> PDF Included
              </span>
            )}
          </div>

          <h1 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>

          <p className="mt-4 text-base leading-relaxed text-soft sm:text-lg">{post.excerpt}</p>

          <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-[var(--border)] pt-5 text-xs text-soft">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" /> {post.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" /> {post.readTime} read
            </span>
            <span className="ml-auto font-mono text-[11px] opacity-50">by Himanshu Bharti</span>
          </div>
        </header>

        {/* Cover Image Banner (Masked Blob URL) */}
        {coverSrc && (
          <div className="mb-10 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-soft)] shadow-xl">
            <MaskedImage
              src={coverSrc}
              alt={post.coverImageAlt || post.title}
              loading="eager"
              className="max-h-[500px] w-full object-cover"
            />
          </div>
        )}

        {/* Downloadable PDF Whitepaper / Guide Hero Box (if attached) */}
        {post.pdfUrl && (
          <div className="mb-10 rounded-2xl border border-brand-500/40 bg-gradient-to-br from-brand-500/10 via-brand-500/5 to-transparent p-6 backdrop-blur-sm shadow-lg">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-500/20 text-brand-500">
                  <FileText className="h-6 w-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-brand-500 font-semibold">Supplementary Resource</span>
                  </div>
                  <h3 className="mt-0.5 text-base font-semibold text-[var(--text)]">
                    {post.pdfName || `${post.title} — PDF Document`}
                  </h3>
                  <p className="mt-1 text-xs text-soft">
                    Download the high-resolution PDF paper, architecture reference, and diagrams.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-stretch sm:self-auto">
                <a
                  href={pdfViewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost !py-2 !px-4 !text-xs flex-1 sm:flex-initial"
                >
                  <ExternalLink className="h-3.5 w-3.5" /> View
                </a>
                <button
                  type="button"
                  onClick={() => downloadFileFromUrl(pdfDownloadUrl, post.pdfName || `${post.slug}-whitepaper.pdf`, setDownloadingPdf)}
                  disabled={downloadingPdf}
                  className="btn-primary !py-2 !px-4 !text-xs flex-1 sm:flex-initial disabled:opacity-70"
                >
                  {downloadingPdf ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin" /> Preparing PDF…
                    </>
                  ) : (
                    <>
                      <Download className="h-3.5 w-3.5" /> Download PDF
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Body */}
        {isHTML ? (
          <div
            className="blog-prose"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        ) : (
          <div className="space-y-5">
            {post.content.split(/\n\n+/).map((para, i) => (
              <p
                key={i}
                className={`leading-relaxed text-soft ${i === 0 ? 'text-base font-medium text-[var(--text)]' : 'text-sm'}`}
              >
                {para.trim()}
              </p>
            ))}
          </div>
        )}

        {/* Bottom PDF Download Card (if attached) */}
        {post.pdfUrl && (
          <div className="mt-14 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-md">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-brand-500" />
                <span className="text-sm font-medium text-[var(--text)]">
                  Save this article & attachments as PDF
                </span>
              </div>
              <button
                type="button"
                onClick={() => downloadFileFromUrl(pdfDownloadUrl, post.pdfName || `${post.slug}-whitepaper.pdf`, setDownloadingPdf)}
                disabled={downloadingPdf}
                className="btn-primary !py-2 !px-5 !text-xs disabled:opacity-70"
              >
                {downloadingPdf ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" /> Preparing PDF…
                  </>
                ) : (
                  <>
                    <Download className="h-3.5 w-3.5" /> Download PDF ({post.pdfName || 'Document'})
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-16 flex items-center justify-between border-t border-[var(--border)] pt-8">
          <button onClick={() => navigate('/#blogs')} className="btn-ghost">
            <ArrowLeft className="h-4 w-4" /> More articles
          </button>
          <button
            onClick={handleShare}
            className="btn-ghost !text-xs"
          >
            <Share2 className="h-3.5 w-3.5" /> Share
          </button>
        </div>
      </article>
    </div>
  );
}
