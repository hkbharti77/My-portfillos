import type { FirestoreBlog } from '../lib/blogTypes';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

async function request(endpoint: string, options: RequestInit = {}) {
  const url = `${BACKEND_URL.replace(/\/+$/, '')}${endpoint}`;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };

  const response = await fetch(url, {
    ...options,
    headers,
    credentials: 'include',
  });

  const contentType = response.headers.get('content-type') || '';
  let data: any = null;
  if (contentType.includes('application/json')) {
    data = await response.json();
  } else {
    data = await response.text();
  }

  if (!response.ok) {
    const errorMsg = data?.error || (typeof data === 'string' ? data : 'Request failed');
    const err = new Error(errorMsg);
    (err as any).status = response.status;
    (err as any).data = data;
    throw err;
  }

  return data;
}

// ── PUBLIC BLOG API (Zero Auth Required) ──────────────────────────

export async function fetchPublicBlogs(params: {
  page?: number;
  limit?: number;
  search?: string;
  tag?: string;
  category?: string;
  channel?: string;
} = {}): Promise<{ posts: FirestoreBlog[]; total: number }> {
  const { page = 1, limit = 50, search, tag, category, channel = 'portfolio' } = params;
  const sp = new URLSearchParams();
  sp.set('page', String(page));
  sp.set('limit', String(limit));
  sp.set('channel', channel);
  if (search) sp.set('search', search);
  if (tag) sp.set('tag', tag);
  if (category) sp.set('category', category);

  const res = await request(`/api/public/posts?${sp.toString()}`);
  return {
    posts: (res.posts || []).map((p: any) => ({
      ...p,
      published: p.status === 'published' || p.published === true,
      coverImage: p.coverImage || p.imageUrl || '/portfolio_crm.webp',
      tag: p.tag || p.tags?.[0] || p.category || 'Tech',
      readTime: p.readTime || `${p.readingTimeMinutes || 3} min`,
    })),
    total: res.pagination?.total || 0,
  };
}

export async function fetchPublicBlogBySlug(slug: string, channel: string = 'portfolio'): Promise<FirestoreBlog> {
  const res = await request(`/api/public/posts/${encodeURIComponent(slug)}?channel=${channel}`);
  const post = res.post || res;
  return {
    ...post,
    published: post.status === 'published' || post.published === true,
    coverImage: post.coverImage || post.imageUrl || '/portfolio_crm.webp',
    tag: post.tag || post.tags?.[0] || post.category || 'Tech',
    readTime: post.readTime || `${post.readingTimeMinutes || 3} min`,
  };
}

export async function fetchPublicTags(channel: string = 'portfolio'): Promise<string[]> {
  try {
    const res = await request(`/api/public/tags?channel=${channel}`);
    return res.tags || [];
  } catch {
    return [];
  }
}



// ── SITE MEDIA ASSETS API (Resume & Video) ──────────────────────────

export async function fetchPublicSiteMedia(): Promise<{
  resumeUrl: string;
  resumeFileName?: string;
  resumeUpdatedAt?: string;
  resumeFileSize?: number;
  introVideoUrl: string;
  introVideoPosterUrl?: string;
  introVideoTitle?: string;
  introVideoUpdatedAt?: string;
}> {
  try {
    return await request('/api/public/media/portfolio');
  } catch (err) {
    console.warn('Failed to fetch public site media, fallback to local defaults:', err);
    return {
      resumeUrl: 'https://res.cloudinary.com/vnwxervq/image/upload/v1786893340/tnp13v5ins7v33n0j4sn.pdf',
      resumeFileName: 'Himanshu_Bharti_Resume.pdf',
      introVideoUrl: '/intro.mp4',
      introVideoPosterUrl: '/portfolio_crm.webp',
    };
  }
}


