export interface FirestoreBlog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  tag: string;
  readTime: string;
  date: string;
  /** Full article — paragraphs or HTML */
  content: string;
  published: boolean;
  channel?: 'portfolio' | 'crm' | 'all' | string;
  // Media & Cloudinary Assets
  coverImage?: string;
  coverImageAlt?: string;
  imageUrl?: string;
  pdfUrl?: string;
  pdfName?: string;
  ogImage?: string;
  ogImageUrl?: string;
  // SEO
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  canonicalUrl?: string;
  author?: any;
  views?: number;
  // Timestamps
  createdAt?: any;
  updatedAt?: any;
}
