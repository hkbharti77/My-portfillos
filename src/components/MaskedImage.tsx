import { useEffect, useState, type ImgHTMLAttributes } from 'react';

const blobCache = new Map<string, string>();

interface MaskedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
  fallbackSrc?: string;
}

/**
 * MaskedImage component.
 * Converts external media URLs (e.g. Cloudinary) into local browser blob: URLs
 * in DOM element inspection, masking external cloud storage endpoints.
 */
export default function MaskedImage({
  src,
  fallbackSrc,
  alt = '',
  className = '',
  loading = 'lazy',
  ...rest
}: MaskedImageProps) {
  const [blobSrc, setBlobSrc] = useState<string>(() => {
    if (!src) return fallbackSrc || '';
    if (blobCache.has(src)) return blobCache.get(src)!;
    return src.startsWith('http') ? '' : src;
  });

  useEffect(() => {
    if (!src) {
      setBlobSrc(fallbackSrc || '');
      return;
    }

    // If already a local path or data URL, use directly
    if (!src.startsWith('http://') && !src.startsWith('https://')) {
      setBlobSrc(src);
      return;
    }

    // Check in-memory cache
    if (blobCache.has(src)) {
      setBlobSrc(blobCache.get(src)!);
      return;
    }

    let isCancelled = false;

    fetch(src)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.blob();
      })
      .then((blob) => {
        if (!isCancelled) {
          const objectUrl = URL.createObjectURL(blob);
          blobCache.set(src, objectUrl);
          setBlobSrc(objectUrl);
        }
      })
      .catch(() => {
        // Fallback to original URL or fallbackSrc if fetch fails (e.g. CORS)
        if (!isCancelled) {
          setBlobSrc(fallbackSrc || src);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [src, fallbackSrc]);

  return (
    <img
      src={blobSrc || fallbackSrc || src}
      alt={alt}
      loading={loading}
      className={className}
      onError={(e) => {
        if (fallbackSrc && (e.currentTarget.src !== fallbackSrc)) {
          e.currentTarget.src = fallbackSrc;
        }
      }}
      {...rest}
    />
  );
}
