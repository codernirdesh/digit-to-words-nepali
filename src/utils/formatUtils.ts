
import { Language } from '../types/converterTypes';

/**
 * Joins an array of words into a single string, removing extra spaces.
 */
export function formatWords(words: string[]): string {
  return words
    .filter(Boolean)
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Pads a decimal string to at least 2 digits (e.g., '5' -> '05').
 */
export function padDecimal(decimal: string): string {
  return decimal.padStart(2, '0');
}

/**
 * Formats a currency amount with the currency name, language-aware.
 */
export function formatCurrencyAmount(
  amount: string,
  currency: string,
  lang: Language
): string {
  return lang === 'ne'
    ? `${currency} ${amount}`
    : `${amount} ${currency}`;
}
