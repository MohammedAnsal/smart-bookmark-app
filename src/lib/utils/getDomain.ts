/**
 * Extracts the hostname from a URL, stripping the "www." prefix.
 * Falls back to the raw URL string if parsing fails.
 */
export function getDomain(url: string): string {
  try {
    return new URL(
      url.startsWith("http") ? url : `https://${url}`,
    ).hostname.replace("www.", "");
  } catch {
    return url;
  }
}

/**
 * Returns Google's favicon CDN URL for the given site URL.
 */
export function getFaviconUrl(url: string): string {
  return `https://www.google.com/s2/favicons?domain=${getDomain(url)}&sz=32`;
}
