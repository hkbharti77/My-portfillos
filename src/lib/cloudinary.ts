/**
 * Cloudinary Media & Document Optimization Service
 * Supports responsive image delivery, auto format/quality, PDF storage/download,
 * and direct browser upload.
 */

export const CLOUDINARY_CLOUD_NAME =
  import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'vnwxervq';

export const CLOUDINARY_API_KEY =
  import.meta.env.VITE_CLOUDINARY_API_KEY || '425847111896498';

export const CLOUDINARY_UPLOAD_PRESET =
  import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'portfolio_uploads';

export const STORAGE_TYPE =
  import.meta.env.VITE_STORAGE_TYPE || 'CLOUDINARY';

export interface ImageTransformOptions {
  width?: number;
  height?: number;
  crop?: 'fill' | 'scale' | 'fit' | 'limit' | 'pad' | 'thumb' | string;
  quality?: 'auto' | 'auto:best' | 'auto:good' | 'auto:eco' | 'auto:low' | number;
  format?: 'auto' | 'webp' | 'avif' | 'png' | 'jpg';
  dpr?: 'auto' | number;
  gravity?: 'auto' | 'center' | 'face' | 'north' | string;
  aspectRatio?: string;
}

/**
 * Checks if a given string is a Cloudinary URL.
 */
export function isCloudinaryUrl(url: string): boolean {
  if (!url) return false;
  return url.includes('cloudinary.com') || url.startsWith(`res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}`);
}

/**
 * Builds an ultra-crisp, optimized Cloudinary image delivery URL.
 * Automatically injects f_auto, q_auto, width, height, dpr, and crop options.
 */
export function getOptimizedImageUrl(
  src: string,
  options: ImageTransformOptions = {}
): string {
  if (!src) return '';

  const {
    width,
    height,
    crop = 'limit',
    quality = 'auto',
    format = 'auto',
    dpr = 'auto',
    gravity,
    aspectRatio,
  } = options;

  // Build transformation string tokens
  const transforms: string[] = [];
  if (format) transforms.push(`f_${format}`);
  if (quality) transforms.push(`q_${quality}`);
  if (dpr) transforms.push(`dpr_${dpr}`);
  if (width) transforms.push(`w_${width}`);
  if (height) transforms.push(`h_${height}`);
  if (aspectRatio) transforms.push(`ar_${aspectRatio}`);
  if (crop && (width || height || aspectRatio)) transforms.push(`c_${crop}`);
  if (gravity) transforms.push(`g_${gravity}`);

  const transformString = transforms.join(',');

  // Case 1: Already a Cloudinary URL
  if (src.includes('/upload/')) {
    // If it already has transformation segment right after /upload/, replace or insert
    const parts = src.split('/upload/');
    const prefix = parts[0] + '/upload/';
    let suffix = parts[1];

    // If suffix starts with existing transformations (e.g., f_auto,q_auto/...), strip leading transforms if needed
    // or simply prepend our clean transform string
    if (transformString) {
      // Remove previous automated transforms if present
      suffix = suffix.replace(/^(?:[a-z]_[a-zA-Z0-9.:_-]+,?)+\//, '');
      return `${prefix}${transformString}/${suffix}`;
    }
    return src;
  }

  // Case 2: Just a Cloudinary Public ID (e.g. "blogs/my-post-cover")
  if (!src.startsWith('http://') && !src.startsWith('https://') && !src.startsWith('/')) {
    const transformPart = transformString ? `${transformString}/` : '';
    return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${transformPart}${src}`;
  }

  // Case 3: External URL (can be fetched through Cloudinary fetch or returned as-is)
  if (src.startsWith('http://') || src.startsWith('https://')) {
    return src;
  }

  return src;
}

/**
 * Generates a responsive srcset string for high-DPI displays and varied viewport widths.
 */
export function getImageSrcSet(
  src: string,
  widths: number[] = [400, 600, 800, 1200, 1600],
  options: Omit<ImageTransformOptions, 'width'> = {}
): string {
  if (!src) return '';
  return widths
    .map((w) => `${getOptimizedImageUrl(src, { ...options, width: w })} ${w}w`)
    .join(', ');
}

/**
 * Builds an optimized Cloudinary PDF URL.
 * Supports in-browser viewing or attachment download with custom file name.
/**
 * Generate a clean direct PDF URL for viewing and downloading.
 * Strips any restrictive or invalid transformation parameters.
 */
export function getOptimizedPdfUrl(
  src: string,
  _options: { downloadName?: string; forceDownload?: boolean } = {}
): string {
  if (!src) return '';

  // Clean any invalid fl_attachment transformation segments that cause 400 errors
  let cleaned = src;
  if (cleaned.includes('/upload/')) {
    cleaned = cleaned.replace(/\/upload\/(?:fl_attachment[^/]*\/)?/, '/upload/');
  }

  return cleaned;
}

/**
 * Direct file uploader to Cloudinary (Images and PDFs/Raw documents).
 */
export interface CloudinaryUploadResponse {
  url: string;
  secure_url: string;
  public_id: string;
  format: string;
  resource_type: string;
  bytes: number;
  original_filename: string;
}

export async function uploadToCloudinary(
  file: File,
  options: {
    folder?: string;
    preset?: string;
    resourceType?: 'image' | 'raw' | 'video' | 'auto';
    onProgress?: (percent: number) => void;
  } = {}
): Promise<CloudinaryUploadResponse> {
  const { preset = CLOUDINARY_UPLOAD_PRESET, onProgress } = options;

  let resourceType = options.resourceType;
  if (!resourceType || resourceType === 'auto' || resourceType === 'raw') {
    if (file.type.startsWith('video/') || file.name.match(/\.(mp4|webm|mov|avi|mkv)$/i)) {
      resourceType = 'video';
    } else {
      // Cloudinary handles PDFs as 'image' resource type, enabling PDF delivery and transformations
      resourceType = 'image';
    }
  }

  const uploadUrl = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/${resourceType}/upload`;

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', preset);

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', uploadUrl);

    if (xhr.upload && onProgress) {
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percent = Math.round((event.loaded / event.total) * 100);
          onProgress(percent);
        }
      };
    }

    xhr.onload = () => {
      let json: any = null;
      try {
        json = JSON.parse(xhr.responseText);
      } catch {
        // non-json response
      }

      if (xhr.status >= 200 && xhr.status < 300 && json) {
        resolve(json as CloudinaryUploadResponse);
      } else {
        const errorMsg = json?.error?.message || `HTTP ${xhr.status}`;
        if (errorMsg.toLowerCase().includes('upload preset') || errorMsg.toLowerCase().includes('unsigned')) {
          reject(new Error(`Cloudinary Error: Preset "${preset}" was rejected (${errorMsg}). Verify that "portfolio_uploads" is set to Unsigned in Cloudinary Settings > Upload > Upload Presets.`));
        } else {
          reject(new Error(`Cloudinary error (${xhr.status}): ${errorMsg}`));
        }
      }
    };

    xhr.onerror = () => {
      reject(new Error('Network error connecting to Cloudinary. Check internet connection.'));
    };

    xhr.send(formData);
  });
}

/**
 * Generate Open Graph / Twitter dynamic social card image URL with high-contrast formatting.
 */
export function getBlogSocialOgImage(coverUrl?: string): string {
  if (coverUrl) {
    return getOptimizedImageUrl(coverUrl, {
      width: 1200,
      height: 630,
      crop: 'fill',
      gravity: 'center',
      quality: 'auto:best',
      format: 'jpg',
    });
  }
  return 'https://hkbharti77.github.io/My-portfillos/og-cover.jpg';
}
