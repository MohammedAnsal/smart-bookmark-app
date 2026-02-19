/**
 * Formats a date string to a short human-readable form, e.g. "Feb 19".
 */
export function formatDate(d: string): string {
  return new Date(d).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}
