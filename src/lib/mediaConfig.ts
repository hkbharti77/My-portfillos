import { useEffect, useState } from 'react';
import { doc, getDoc, setDoc, serverTimestamp, type Timestamp } from 'firebase/firestore';
import { db } from './firebase';
import { getOptimizedPdfUrl } from './cloudinary';

export interface SiteMediaConfig {
  resumeUrl: string;
  resumeFileName?: string;
  resumeUpdatedAt?: Timestamp | string;
  introVideoUrl: string;
  introVideoPosterUrl?: string;
  introVideoUpdatedAt?: Timestamp | string;
}

export const DEFAULT_SITE_MEDIA: SiteMediaConfig = {
  resumeUrl: 'https://res.cloudinary.com/vnwxervq/image/upload/v1786893340/tnp13v5ins7v33n0j4sn.pdf',
  resumeFileName: 'Himanshu_Bharti_Resume.pdf',
  introVideoUrl: '/intro.mp4',
};

/**
 * Hook to retrieve live site media (Resume PDF, Intro Video) from Firestore
 * with automatic fallback to local bundled assets.
 */
export function useSiteMedia() {
  const [media, setMedia] = useState<SiteMediaConfig>(DEFAULT_SITE_MEDIA);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const snap = await getDoc(doc(db, 'site_config', 'media'));
        if (snap.exists() && !cancelled) {
          const data = snap.data() as Partial<SiteMediaConfig>;
          setMedia({
            resumeUrl: data.resumeUrl || DEFAULT_SITE_MEDIA.resumeUrl,
            resumeFileName: data.resumeFileName || DEFAULT_SITE_MEDIA.resumeFileName,
            resumeUpdatedAt: data.resumeUpdatedAt,
            introVideoUrl: data.introVideoUrl || DEFAULT_SITE_MEDIA.introVideoUrl,
            introVideoPosterUrl: data.introVideoPosterUrl,
            introVideoUpdatedAt: data.introVideoUpdatedAt,
          });
        }
      } catch (err) {
        console.warn('Could not fetch site media config from Firestore, using local defaults:', err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
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

/**
 * Update the site media configuration in Firestore (called from Admin Dashboard).
 */
export async function updateSiteMedia(data: Partial<SiteMediaConfig>): Promise<void> {
  const payload: Record<string, unknown> = {
    updatedAt: serverTimestamp(),
  };

  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined) {
      payload[key] = value;
    }
  }

  await setDoc(doc(db, 'site_config', 'media'), payload, { merge: true });
}
