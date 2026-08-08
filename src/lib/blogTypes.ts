import type { Timestamp } from 'firebase/firestore';

export interface FirestoreBlog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  tag: string;
  readTime: string;
  date: string;
  /** Full article — paragraphs separated by blank lines */
  content: string;
  published: boolean;
  // SEO
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  canonicalUrl?: string;
  // Timestamps
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}
