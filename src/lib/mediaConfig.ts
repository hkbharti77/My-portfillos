import { useEffect, useState } from 'react';
import { getOptimizedPdfUrl } from './cloudinary';
import { fetchPublicSiteMedia } from '../services/blogApi';

export interface SiteMediaConfig {
  resumeUrl: string;
  resumeFileName?: string;
  resumeUpdatedAt?: string;
  resumeFileSize?: number;
  introVideoUrl: string;
  introVideoPosterUrl?: string;
  introVideoTitle?: string;
  introVideoUpdatedAt?: string;
}

export const DEFAULT_SITE_MEDIA: SiteMediaConfig = {
  resumeUrl: 'https://res.cloudinary.com/vnwxervq/image/upload/v1786893340/tnp13v5ins7v33n0j4sn.pdf',
  resumeFileName: 'Himanshu_Bharti_Resume.pdf',
  introVideoUrl: '/intro.mp4',
  introVideoPosterUrl: '/portfolio_crm.webp',
  introVideoTitle: 'Himanshu Bharti - AI & Full Stack Engineer Introduction',
};

const STORAGE_KEY = 'site_media_config';

/**
 * Hook to retrieve live site media (Resume PDF, Intro Video)
 * dynamically from MongoDB backend API with localStorage caching and local asset fallbacks.
 */
export function useSiteMedia() {
  const [media, setMedia] = useState<SiteMediaConfig>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          return { ...DEFAULT_SITE_MEDIA, ...JSON.parse(saved) };
        } catch {
          // ignore
        }
      }
    }
    return DEFAULT_SITE_MEDIA;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadLiveMedia() {
      try {
        const live = await fetchPublicSiteMedia();
        if (isMounted && live) {
          const merged: SiteMediaConfig = {
            resumeUrl: live.resumeUrl || DEFAULT_SITE_MEDIA.resumeUrl,
            resumeFileName: live.resumeFileName || DEFAULT_SITE_MEDIA.resumeFileName,
            resumeUpdatedAt: live.resumeUpdatedAt,
            resumeFileSize: live.resumeFileSize,
            introVideoUrl: live.introVideoUrl || DEFAULT_SITE_MEDIA.introVideoUrl,
            introVideoPosterUrl: live.introVideoPosterUrl || DEFAULT_SITE_MEDIA.introVideoPosterUrl,
            introVideoTitle: live.introVideoTitle || DEFAULT_SITE_MEDIA.introVideoTitle,
            introVideoUpdatedAt: live.introVideoUpdatedAt,
          };
          setMedia(merged);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
        }
      } catch (err) {
        console.warn('Failed to load live site media from backend:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadLiveMedia();

    return () => {
      isMounted = false;
    };
  }, []);

  const resumeDownloadUrl = media.resumeUrl.includes('cloudinary.com')
    ? getOptimizedPdfUrl(media.resumeUrl, { forceDownload: true, downloadName: media.resumeFileName || 'Himanshu_Bharti_Resume.pdf' })
    : media.resumeUrl;

  return {
    ...media,
    resumeDownloadUrl,
    loading,
  };
}


