import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { FirestoreBlog } from '../lib/blogTypes';
import { ArrowLeft, Clock, Calendar, Loader2 } from 'lucide-react';

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

  // SEO meta injection for blog post pages
  useEffect(() => {
    if (!post) return;
    const title = post.seoTitle || post.title;
    const desc = post.seoDescription || post.excerpt;
    const canonicalHref = post.canonicalUrl ||
      `https://hkbharti77.github.io/My-portfillos/blog/${post.slug}`;
    const ogImage = 'https://hkbharti77.github.io/My-portfillos/og-cover.jpg';

    document.title = `${title} — Himanshu Bharti`;

    // Primary meta
    updateMeta('name', 'description', desc);
    if (post.seoKeywords) updateMeta('name', 'keywords', post.seoKeywords);
    updateMeta('name', 'author', 'Himanshu Bharti');
    updateMeta('name', 'robots', 'index, follow, max-snippet:-1, max-image-preview:large');

    // Open Graph
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
      // Restore home page meta on unmount
      const orig = 'Himanshu Bharti — Software Engineer | Custom Software, AI CRM/ERP & Meta Tech Provider';
      document.title = orig;
      const homeCanonical = 'https://hkbharti77.github.io/My-portfillos/';
      const canonEl = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
      if (canonEl) canonEl.setAttribute('href', homeCanonical);
      updateMeta('property', 'og:type', 'website');
    };
  }, [post]);

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

  const isHTML = /<[a-z][\s\S]*>/i.test(post.content);

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      {/* Back nav */}
      <div className="section-pad mx-auto max-w-3xl pt-8">
        <button
          onClick={() => navigate('/#blogs')}
          className="inline-flex items-center gap-2 text-sm text-soft transition-colors hover:text-brand-500"
        >
          <ArrowLeft className="h-4 w-4" /> Back to writing
        </button>
      </div>

      {/* Article */}
      <article className="section-pad mx-auto max-w-3xl pb-24 pt-10">
        {/* Header */}
        <header className="mb-10">
          <span className="chip text-brand-500">{post.tag}</span>
          <h1 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-soft">{post.excerpt}</p>
          <div className="mt-5 flex flex-wrap items-center gap-4 border-t border-[var(--border)] pt-5 text-xs text-soft">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" /> {post.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" /> {post.readTime} read
            </span>
            <span className="ml-auto font-mono text-[11px] opacity-50">by Himanshu Bharti</span>
          </div>
        </header>

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

        {/* Footer */}
        <div className="mt-16 border-t border-[var(--border)] pt-8">
          <button onClick={() => navigate('/#blogs')} className="btn-ghost">
            <ArrowLeft className="h-4 w-4" /> More articles
          </button>
        </div>
      </article>
    </div>
  );
}
