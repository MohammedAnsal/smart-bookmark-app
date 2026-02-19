/**
 * Shared URL validation utilities.
 *
 * Used by:
 *  - src/components/dashboard/AddBookmarkModal.tsx  (client-side, real-time feedback)
 *  - src/lib/services/bookmarkService.ts            (server-side guard before DB write)
 */

/**
 * Known valid top-level domains (common ones).
 * Any TLD not in this list is rejected.
 */
const KNOWN_TLDS = new Set([
  "com", "org", "net", "edu", "gov", "io", "co", "app", "dev", "ai",
  "uk", "us", "ca", "au", "de", "fr", "jp", "in", "br", "cn", "ru",
  "it", "es", "nl", "se", "no", "fi", "dk", "pl", "ch", "at", "be",
  "nz", "sg", "hk", "kr", "mx", "ar", "za", "ng", "ke", "eg",
  "info", "biz", "me", "tv", "fm", "pm", "re", "tf", "wf", "yt",
  "tech", "online", "store", "shop", "blog", "site", "web", "xyz",
  "club", "live", "news", "media", "studio", "agency", "design",
  "cloud", "digital", "solutions", "services", "systems", "network",
  "academy", "education", "health", "finance", "legal", "travel",
]);

/**
 * Checks if a hostname's second-level domain (SLD) looks plausible.
 *
 * Rejects pure random consonant strings like "rjhgfhj" or "xkzqwvb".
 * A label is considered plausible if it:
 *   - contains at least one vowel (e.g. "google", "github")
 *   - contains a digit (e.g. "web3", "mp4")
 *   - is hyphenated (e.g. "my-site")
 *   - is short ≤4 chars — could be an abbreviation like "bbc", "cnn"
 */
function isSldPlausible(hostname: string): boolean {
  const host = hostname.replace(/^www\./, "").toLowerCase();
  const parts = host.split(".");
  const sld = parts[parts.length - 2] ?? "";

  if (sld.length === 0) return false;
  if (/[aeiou]/.test(sld)) return true;
  if (/\d/.test(sld)) return true;
  if (sld.includes("-")) return true;
  if (sld.length <= 4) return true;

  return false;
}

/**
 * Returns `true` if the given string is a properly valid bookmark URL.
 *
 * Rules enforced:
 *  - No whitespace
 *  - Protocol must be http or https (auto-prepended if missing)
 *  - Hostname must not be a bare IP address
 *  - TLD must be in the known-TLD allowlist
 *  - Second-level domain must look plausible (not pure gibberish)
 *  - `localhost` is always allowed
 */
export function isValidUrl(raw: string): boolean {
  const trimmed = raw.trim();
  if (!trimmed) return false;

  // Reject if it contains spaces
  if (/\s/.test(trimmed)) return false;

  // Auto-prepend protocol so URL constructor can parse bare domains
  const withProtocol = /^https?:\/\//i.test(trimmed)
    ? trimmed
    : `https://${trimmed}`;

  let u: URL;
  try {
    u = new URL(withProtocol);
  } catch {
    return false;
  }

  // Only allow http and https
  if (u.protocol !== "http:" && u.protocol !== "https:") return false;

  const hostname = u.hostname.toLowerCase();

  // localhost is always valid
  if (hostname === "localhost") return true;

  // Must contain at least one dot
  if (!hostname.includes(".")) return false;

  // Reject bare IPv4 addresses
  if (/^\d{1,3}(\.\d{1,3}){3}$/.test(hostname)) return false;

  // Validate TLD
  const parts = hostname.split(".");
  const tld = parts[parts.length - 1];
  if (!tld || tld.length < 2 || !/^[a-z]+$/.test(tld)) return false;
  if (!KNOWN_TLDS.has(tld)) return false;

  // Validate SLD plausibility (blocks pure gibberish hostnames)
  if (!isSldPlausible(hostname)) return false;

  return true;
}

/**
 * Normalises a URL for duplicate-detection comparison.
 * Strips protocol, www prefix, and trailing slash.
 *
 * Example: "https://www.GitHub.com/" → "github.com"
 */
export function normaliseUrl(raw: string): string {
  return raw
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/$/, "");
}
