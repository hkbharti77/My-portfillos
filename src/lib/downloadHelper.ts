/**
 * Secure, clean file download utility.
 * Fetches the media as a Blob and triggers an in-browser download
 * using temporary local blob: URLs, preventing external storage URLs
 * from being directly exposed in anchor DOM hrefs.
 */

export async function downloadFileFromUrl(
  url: string,
  filename: string = 'Himanshu_Bharti_Resume.pdf',
  onProgress?: (loading: boolean) => void,
  fallbackUrl: string = '/Himanshu_Bharti_Resume.pdf'
): Promise<void> {
  const targetUrl = url || fallbackUrl;

  try {
    if (onProgress) onProgress(true);

    let response = await fetch(targetUrl, { method: 'GET' });

    // If remote URL fails (e.g. 401 Unauthorized or 404 Not Found), seamlessly try fallback
    if (!response.ok && targetUrl !== fallbackUrl) {
      console.warn(`Remote PDF returned status ${response.status}. Falling back to bundled asset: ${fallbackUrl}`);
      response = await fetch(fallbackUrl, { method: 'GET' });
    }

    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${response.statusText}`);
    }

    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);

    const anchor = document.createElement('a');
    anchor.style.display = 'none';
    anchor.href = blobUrl;
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click();

    setTimeout(() => {
      document.body.removeChild(anchor);
      window.URL.revokeObjectURL(blobUrl);
      if (onProgress) onProgress(false);
    }, 150);
  } catch (error) {
    console.warn('Blob download encountered error, using direct anchor fallback:', error);
    if (onProgress) onProgress(false);

    const a = document.createElement('a');
    a.href = fallbackUrl || targetUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}
