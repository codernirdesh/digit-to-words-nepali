/**
 * Joins words into a single string, dropping empties and collapsing whitespace.
 * Empty entries occur when a caller supplies an empty currency or decimal suffix.
 */
export function formatWords(words: string[]): string {
  return words
    .filter(Boolean)
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
}
